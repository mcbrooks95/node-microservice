const express = require("express")
const app = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./Book")
const Book = mongoose.model("Book");
const cote = require('cote');

app.use(bodyParser.json());

const bookRequester = new cote.Requester({ name: 'Book Requester'})
const bookResponder = new cote.Responder({ name: 'Book Responder'})

app.post('/book', (req, res) => {
    bookRequester.send({ type: "post", body: req.body})
    .then((book) => {
        console.log(`in then statement`)
        res.json(book).status(200);
    })
})

app.get('/book/:id', (req, res) => { 
    bookRequester.send({ type: "get", id: req.params.id})
    .then((book) => {
        res.json(book).status(200);
    })
})

app.get('/books', (req, res) => {
    bookRequester.send({ type: "list"}).then((books) => {
        res.json(books).status(200);
    })
  })

  app.delete('/book/:id', (req, res) => {
    bookRequester.send({ type: "delete", id: req.params.id})
    .then(() => {
        res.send("Book has been successfully removed!!");
    })
  })

bookResponder.on("list", req => {
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

bookResponder.on("delete", req => {
    return Promise.resolve(        
        Book.findOneAndRemove(req.id)
        .then(() => {
            return null;
        })
    )
})

bookResponder.on("get", req => {
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

bookResponder.on("post", req => {
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