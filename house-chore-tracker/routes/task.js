import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// Home route - Show tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render("index", { tasks });
  } catch (err) {
    res.status(500).send("Error retrieving tasks");
  }
});

// Add task
router.post("/add", async (req, res) => {
  try {
    const { task, assignedTo } = req.body;
    await Task.create({ task, assignedTo });
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error adding task");
  }
});

// Toggle task completion
router.post("/toggle/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      task.completed = !task.completed;
      await task.save();
    }
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error toggling task status");
  }
});

export default router;
