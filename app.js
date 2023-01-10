import chalk from "chalk";
import { addNote, removeNote, listNotes, readNote } from "./notes.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

//add, remove, read, list
//Create add command
yargs(hideBin(process.argv))
  .command({
    command: "add",
    description: "Add a new note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
      body: {
        describe: "Note description",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      addNote(argv.title, argv.body);
    },
  })
  .demandCommand(1)
  .parse();

//Create remove command
yargs(hideBin(process.argv))
  .command({
    command: "remove",
    description: "Remove a note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      removeNote(argv.title);
    },
  })
  .demandCommand(1)
  .parse();

//Create list command
yargs(hideBin(process.argv))
  .command({
    command: "list",
    description: "List your notes",
    handler() {
      listNotes();
    },
  })
  .demandCommand(1)
  .parse();

//Create read command
yargs(hideBin(process.argv))
  .command({
    command: "read",
    describe: "Read a note",
    builder:{
      title:{
        describe: "Note title",
        demandOption: true,
        type:'string'
      }
    },
    handler(argv) {
      readNote(argv.title);
    },
  })
  .demandCommand(1)
  .parse();
