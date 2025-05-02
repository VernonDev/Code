const { Pool } = require("pg");
const config = require("../config");

const pool = new Pool({
  host: config.postgres.host,
  port: config.postgres.port,
  user: config.postgres.user,
  password: config.postgres.password,
  database: config.postgres.database,
  // Add connection resilience options
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 5000, // How long to wait for a connection
  maxUses: 7500, // Close & replace a connection after it has been used this many times
});

// Add error handling for the pool
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
});

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 100;

const query = async (text, params, attempt = 1) => {
  let client;
  try {
    // console.log(`Attempt ${attempt}: Connecting to DB...`); // Optional: verbose logging
    client = await pool.connect();
    // console.log(`Attempt ${attempt}: Connection acquired. Executing query: ${text.substring(0, 100)}...`); // Optional: verbose logging
    const result = await client.query(text, params);
    // console.log(`Attempt ${attempt}: Query successful.`); // Optional: verbose logging
    client.release();
    return result;
  } catch (err) {
    if (client) {
      // Ensure client is released even if query fails
      client.release(err); // Pass error to potentially remove bad connection from pool
    }

    // Check if the error is ECONNRESET and if we can retry
    if (err.code === "ECONNRESET" && attempt < MAX_RETRIES) {
      console.warn(
        `Attempt ${attempt}: DB query failed with ECONNRESET. Retrying in ${RETRY_DELAY_MS}ms...`,
        { query: text.substring(0, 100), params }
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return query(text, params, attempt + 1);
    } else {
      console.error(`DB query failed after ${attempt} attempt(s):`, {
        error: err,
        query: text.substring(0, 100),
        params,
      });
      throw err; // Re-throw the error if it's not ECONNRESET or retries are exhausted
    }
  }
};

const saveMessage = async (message) => {
  const { topic, partition, offset, key, value, timestamp } = message;

  const result = await query(
    "INSERT INTO messages (topic, key, value, partition, offset, timestamp) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
    [topic, key || null, value, partition, offset, new Date(timestamp)]
  );

  return result.rows[0].id;
};

const getMessages = async (limit = 100, offset = 0) => {
  const result = await query(
    "SELECT * FROM messages ORDER BY timestamp DESC LIMIT $1 OFFSET $2",
    [limit, offset]
  );

  return result.rows;
};

const getMessagesByTopic = async (topic, limit = 100, offset = 0) => {
  const result = await query(
    "SELECT * FROM messages WHERE topic = $1 ORDER BY timestamp DESC LIMIT $2 OFFSET $3",
    [topic, limit, offset]
  );

  return result.rows;
};

module.exports = {
  query,
  saveMessage,
  getMessages,
  getMessagesByTopic,
  pool,
};
