const Notes = require('../models/notes.model');

const welcome = (request, response) => {
  response.status(200).render('index', { title: 'Diary App', message: 'Welcome to the Diary App..' })
  // response.status(200).json({ message: 'Welcome to the Diary App..' });
};

const getAllNotes = async (request, response) => {
  try {
    const notes = await Notes.find();
    if(notes) {
      // return response.json({ message: allNotes })
      return await response.render('index', { messagew: notes })
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

const createNote = async (request, response) => {
  try {

    const note = new Notes({
        title: request.body.title,
        author: request.body.author,
        content: request.body.content
    });

    note.save()
      .then(() => { response.json({ message: note }) })
      .catch((error) => { console.log({ name: error.name, message: error.message, stack: error.stack }); })
      
  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
  }
};

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

const deleteNote = async (request, response) => {
  try {
    const id = request.params.id;
    const note = await Notes.findByIdAndDelete(id);
    if(note) return response.json({ message: 'Note Successfully Deleted..' })
    return response.json({ message: 'Error trying to delete note..' })
  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
  }
};

module.exports = {
  welcome,
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote
}