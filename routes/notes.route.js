const express = require('express');

const route = express.Router();

const { 
  welcome,
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote

} = require('../controllers/notes.controllers');

route.get('/', welcome);

route.get('/all/notes', getAllNotes);

route.get('/note/:id', getOneNote);

route.post('/create/note', createNote);

route.patch('/update/note/:id', updateNote);

route.delete('/delete/note/:id', deleteNote);

module.exports = route;