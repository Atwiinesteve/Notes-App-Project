// import schemas
const Notes = require('../models/notes.model');
const User = require('../models/user.model');

// welcome
const welcome = (request, response) => {
  response.status(200).render('index', { title: 'Diary App', message: 'Welcome to the Diary App..' })
  // response.status(200).json({ message: 'Welcome to the Diary App..' });
};

// create note form
const createNoteForm = (request, response) => {
  try {
    return response.status(200).render("create-note", { title: "Create Note.." })
  } catch (error) {
    console.log({
      name: error.name,
      message: error.message,
      stack: error.stack
    })
  }
}

// all posts page
const notesPage = async(request, response) => {
  try {
    // const user = await User.find({ email: request.body.email }); I will star tfrom here tomorrow.
    let notes = await Notes.find();
    if(notes) {
      return response.status(200).render("notes", { title: "Notes App..", notes: notes })    
    }
  } catch (error) {
    console.log({
      name: error.name,
      message: error.message
    })
  }
}

// all notes
const getAllNotes = async (request, response) => {
  try {
    const notes = await Notes.find();
    if(notes) {
      return response.render('notes', { title: "Notes App", notes: notes })
    } else {
      return response.json({ message: 'No Notes Found...' })
    }
  } catch (error) {
    console.log({ 
       name: error.name,
       message: error.message,
       stack: error.stack
    });
  }

};

// get one note
const getOneNote = async (request, response) => {
  try {
    const id = request.params.id;
    const oneNote = await Notes.findById(id);
    if(oneNote) {
      return response.json({ message: oneNote })
    } else {
      return response.json({ message: 'No Note Found...' })
    }
  } catch (error) {
    console.log({ 
      name: error.name,
      message: error.message,
      stack: error.stack
   });
  }
};

// create note
const createNote = async (request, response) => {
  try {

    const note = new Notes({
        title: request.body.title,
        author: request.body.author,
        content: request.body.content
    });

    note.save()
      .then(() => { response.status(200).redirect("/notes") })
      .catch((error) => { console.log({ name: error.name, message: error.message, stack: error.stack }); })
      
  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
  }
};

// update note
const updateNote = async (request, response) => {
  try {
    const id = request.params.id;
    const note = await Notes.findByIdAndUpdate(id, { ...request.body });
    if(note) return response.json({ note })
    return response.json({ message: 'No Updates made...' })
  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
  }
};

// delete note
const deleteNote = async (request, response) => {
  try {
    const id = request.params.id;
    const note = await Notes.findByIdAndDelete({ _id: id });
    if(note) return response.status(200).redirect("/notes");
    return response.json({ message: 'Failed to delete note..' })
  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
  }
};

// exports
module.exports = {
  welcome,
  createNoteForm,
  notesPage,
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote
}