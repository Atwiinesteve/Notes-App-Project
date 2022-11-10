const Notes = require('../models/notes.model');

const welcome = (request, response) => {
  // response.status(200).render('index', { title: 'Diary App'})
  response.status(200).json({ message: 'Welcome to the Diary App..' })
};

const getAllNotes = async (request, response) => {
  try {
    const allNotes = await Notes.find();
    if(allNotes.length > 0) {
      return response.json({ message: allNotes })
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

const deleteNote = (request, response) => {
  // response.status(200).render('index', { title: 'Diary App'})
  // response.status(200).render('index', { title: 'Diary App'})
};

module.exports = {
  welcome,
  getAllNotes,
  getOneNote,
  createNote,
  updateNote,
  deleteNote
}