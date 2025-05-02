CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  key VARCHAR(255),
  value TEXT NOT NULL,
  partition INTEGER NOT NULL,
  offset BIGINT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_topic ON messages(topic);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);