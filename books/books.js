const express = require("express")
const app = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./Book")
const Book = mongoose.model("Book");
const cote = require('cote');

app.use(bodyParser.json());

const bookRequester = new cote.Requester({ name: 'Book Requester', key: 'book'})
const bookResponder = new cote.Responder({ name: 'Book Responder', key: 'book'})

app.post('/book', (req, res) => {
    bookRequester.send({ type: "bookpost", body: req.body})
    .then((book) => {
        console.log(`in then statement`)
        res.json(book).status(200);
    })
})

app.get('/book/:id', (req, res) => { 
    bookRequester.send({ type: "bookget", id: req.params.id})
    .then((book) => {
        res.json(book).status(200);
    })
})

app.get('/books', (req, res) => {
    bookRequester.send({ type: "booklist"}).then((books) => {
        res.json(books).status(200);
    })
  })

  app.delete('/book/:id', (req, res) => {
    bookRequester.send({ type: "bookdelete", id: req.params.id})
    .then(() => {
        res.send("Book has been successfully removed!!");
    })
  })

bookResponder.on("booklist", req => {
        return Promise.resolve(
            Book.find().then((books) => {
                return books;
            }).catch((err) => {
                if(err) {
                    throw err;            
                }
                return null;
            })
        )
})

bookResponder.on("bookdelete", req => {
    return Promise.resolve(        
        Book.findOneAndRemove(req.id)
        .then(() => {
            return null;
        })
    )
})

bookResponder.on("bookget", req => {
    return Promise.resolve(
        Book.findById(req.id).then((book) => {
            if(book) {
                return book;
            }
            else
            {
                res.sendStatus(404);
            }
        }).catch((err) => {
            if(err) {
                throw err;
            }
        })
    )
})

bookResponder.on("bookpost", req => {
    return Promise.resolve(
        new Book({
                title: req.body.title,
                author: req.body.author,
                numberPages: req.body.numberPages,
                publisher: req.body.publisher
            }).save().then((book) => {
                    console.log("just saved book created")
                    return book
            })
    )
})

module.exports = app;