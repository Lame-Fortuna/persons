const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  mobile: String
});

const Person = mongoose.model('Person', PersonSchema);

// List all people
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Specific Person 
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new person
router.post('/', async (req, res) => {
  const person = new Person({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    mobile: req.body.mobile
  });

  try {
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a person
router.put('/:id', async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPerson) return res.status(404).json({ message: 'Not found' });
    res.json(updatedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a person
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Person deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;