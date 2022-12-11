const express = require('express');

const route = express.Router();

const { 
  welcome,
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote,
  notesPage,
  getDashboard

} = require('../controllers/notes.controllers');
const { authUser } = require('../middlewares/authenticate.user');
const { checkUser } = require('../middlewares/check.user');

// get methods
// route.get("*", checkUser)
route.get('/', welcome);
route.get("/notes", notesPage);
route.get('/view-notes', authUser, getAllNotes);
route.get('/note/:id', getOneNote);
route.get("/dashboard", authUser, getDashboard);


// post method
route.post('/create/note', createNote);

// update method
route.patch('/update/note/:id', updateNote);

// delete method
route.delete('/delete/note/:id', deleteNote);

// exports
module.exports = route;