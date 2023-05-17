// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a Task
router.post('/', async (req, res) => {
  const { name, listId } = req.body;

  try {
    const newTask = await Task.create({ name, listId });
    res.status(201).json({ message: 'Task created', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a Task
router.put('/:id', async (req, res) => {
  const taskId = req.params.id;
  const { name, completed } = req.body;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.name = name;
    task.completed = completed;
    await task.save();

    res.status(200).json({ message: 'Task updated', task });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a Task
router.delete('/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
