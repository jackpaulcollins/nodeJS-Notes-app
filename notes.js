const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
  const note = 'Yours notes...'
  return note
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('saved a new note!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title )
  if (notesToKeep.length < notes.length) {
    saveNotes(notesToKeep)
    console.log(chalk.green.inverse('Removed note!'))
  } else {
    console.log(chalk.red.inverse('No matching note with that title!'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.green.underline.inverse("Your Notes: "))
  notes.forEach(note => {
    console.log(chalk.yellow.bold("Title: ") + chalk.blue.inverse(note.title) + chalk.yellow.bold(" Body: ") + chalk.blue.inverse(note.body))
  });
}

const readNote = (title) => {
  const notes = loadNotes()
  const noteToRead = notes.find((note) => note.title === title)
    
    if (noteToRead) {
    console.log(chalk.yellow.bold(noteToRead.title) + " " + noteToRead.body)
  } else {
    console.log(chalk.red.inverse("No note found"))
  }
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}