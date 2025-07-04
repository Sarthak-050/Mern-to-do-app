
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET all todos
router.get("/", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// POST new todo
router.post("/", async (req, res) => {
    const { title } = req.body;
    const newTodo = new Todo({ title });
    await newTodo.save();
    res.json(newTodo);
});

// DELETE todo
router.delete("/:id", async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: !!result });
});

module.exports = router;
