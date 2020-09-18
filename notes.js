const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter( note => note.title === title )
    const duplicateNote = notes.find( note => note.title === title ) //will stop going through array once finds one element matching the criteria

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('new note added!'))
    } else {
        console.log(chalk.red.inverse('note title taken!'))
    }

    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter( note =>  note.title != title  )

  if ( notes.length > newNotes.length ) {
      console.log( chalk.green.inverse('note removed!!'))
      saveNotes(newNotes)
  } else {
      console.log(chalk.red.inverse('NO note found!'))
  }
}

const listNotes = () => {
    console.log(chalk.inverse('Your Notes'))
    const notes = loadNotes()
    notes.forEach( note => console.log( chalk.blue(note.title) ))
    
}

const readNotes = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find( note => note.title === title )
    //.find returns undefined if there is no match of the criteria 
    if( noteToRead === undefined ) {
        console.log( chalk.red("Note not found!!"))
    } else { 
    console.log( chalk.green(noteToRead.title), noteToRead.body  )
}
}

const saveNotes = (notes) => {
   const dataJSON = JSON.stringify(notes)
   fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e)  {
        return []
    }
   
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}