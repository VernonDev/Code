import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./connectors/db.js"; // Import the database connection
import taskRoutes from "./routes/task.js"; // Import task routes

const app = express();
const port = process.env.PORT || 3000;

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use task routes
app.use("/", taskRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
