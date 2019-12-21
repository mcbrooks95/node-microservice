const express = require("express")
const app = express.Router();
const bodyParser = require("body-parser");
require("./Book")
// const bookCote = require('./bookCote.js');
const mongoose = require("mongoose");
const Book = mongoose.model("Book");

app.use(bodyParser.json());


app.get('/books', (req, res) => {
    Book.find().then((books) => {
        res.json(books).status(200);
    }).catch((err) => {
        if(err) {
            throw err;            
        }
        return null;
    })
})

// app.get('/books', (req, res) => {
//     bookCote.Requester.send({ type: "booklist"}).then((books) => {
//         res.json(books).status(200);
//     })
// })

// app.post('/book', (req, res) => {
//     bookCote.Requester.send({ type: "bookpost", body: req.body})
//     .then((book) => {
//         res.json(book).status(200);
//     })
// })

// app.get('/book/:id', (req, res) => { 
//     bookCote.Requester.send({ type: "bookget", body: req.params.id})
//     .then((book) => {
//         res.json(book).status(200);
//     })
// })

// app.delete('/book/:id', (req, res) => {
//     bookCote.Requester.send({ type: "bookdelete", id: req.params.id})
//     .then(() => {
//         res.send("Book has been successfully removed!");
//     })
// })

module.exports = app;