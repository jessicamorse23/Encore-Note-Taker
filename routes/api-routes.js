const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const db = require("../db/db.json");
const path = require("path");

module.exports = (app) => {
  // API GET request
  app.get("/api/notes", function (req, res) {
    //res.json(db);

    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;

      res.json(JSON.parse(data));
    });
  });

  // API POST request
  app.post("/api/notes", (req, res) => {
    let activeNotes = [];
    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      activeNotes = JSON.parse(data);
      activeNotes.push(newNote);
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(activeNotes), "utf-8", (err) => {
        if (err) throw err;
        console.log("The note has been saved.");
        res.end();
      });
    });
    console.log(newNote);
  });

  // API DELETE Request
  app.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id;
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      let notesDB = JSON.parse(data);
      const filteredNotes = notesDB.filter((values) => values.id != noteId);
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(filteredNotes), "utf-8", (err) => {
        if (err) throw err;
        console.log("Your note is deleted.");
        res.end();
      });
    });
  });
};
