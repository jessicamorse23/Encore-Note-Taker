// const htmlRoute = require("express").Router();
const path = require("path");

//route to notes.html 
module.exports = (app) => {
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public", "notes.html"));
    });

// route to index.html
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};