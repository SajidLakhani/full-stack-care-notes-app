const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataFilePath = path.join(__dirname, '../data.json'); // Path to mock database

// Function to read data from JSON file
const readData = () => {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

// Function to write data to JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// GET /care-notes (List all notes)
router.get('/care-notes', (req, res) => {
  try {
    const notes = readData().sort((a, b) => b.timestamp - a.timestamp);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

//  POST /care-notes (Create a new note)
router.post('/care-notes', (req, res) => {
  try {
    const { residentName, content , authorName } = req.body;

    if (!residentName || !content || !authorName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const notes = readData(); // Get current notes
    const newNote = { id: Date.now().toString(), residentName, authorName ,  content, timestamp: Date.now() };

    notes.push(newNote);
    writeData(notes); // Save updated data

    res.status(201).json({ message: 'Note created', note: newNote });
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error });
  }
});

module.exports = router;
