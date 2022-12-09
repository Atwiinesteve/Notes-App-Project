const express = require('express');

const route = express.Router();

const { 
  welcome,
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote,
  postsPage

} = require('../controllers/notes.controllers');
const { checkUser } = require('../middlewares/check.user');

// get methods
// route.get("*", checkUser)
route.get('/', welcome);
route.get("/posts", postsPage)
route.get('/all/notes', getAllNotes);
route.get('/note/:id', getOneNote);

// post method
route.post('/create/note', createNote);

// update method
route.patch('/update/note/:id', updateNote);

// delete method
route.delete('/delete/note/:id', deleteNote);

// exports
module.exports = route;