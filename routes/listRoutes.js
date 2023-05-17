// routes/listRoutes.js

const express = require('express');
const router = express.Router();
const List = require('../models/List');

// Create a List
router.post('/', async (req, res) => {
  const { name, userId } = req.body;

  try {
    const newList = await List.create({ name, userId });
    res.status(201).json({ message: 'List created', list: newList });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Retrieve Lists for a User
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const lists = await List.findAll({ where: { userId } });
    res.status(200).json({ lists });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a List
router.put('/:id', async (req, res) => {
  const listId = req.params.id;
  const { name } = req.body;

  try {
    const list = await List.findByPk(listId);

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    list.name = name;
    await list.save();

    res.status(200).json({ message: 'List updated', list });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
