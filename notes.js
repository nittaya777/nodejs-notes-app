import fs from "fs";
import chalk from "chalk";

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length > 0) {
    console.log(chalk.inverse("Your notes."));
    notes.forEach((note) => {
      console.log(`Title: ${note.title} Body: ${note.body}`);
    });
    return notes;
  } else {
    console.log(chalk.bgRed("No note found."));
    return [];
  }
};
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.inverse(`${note.title}`));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note not found."));
  }
};
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  debugger;
  
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreen("New note added!"));
  } else {
    console.log(chalk.bgRed("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const noteToKeeps = notes.filter((note) => note.title !== title);
  if (notes.length > noteToKeeps.length) {
    saveNotes(noteToKeeps);
    console.log(chalk.bgGreen("Note removed!"));
  } else {
    console.log(chalk.bgRed("No note found!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

export { addNote, removeNote, listNotes, readNote };
