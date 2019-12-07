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
    var newBook = {
      title: req.body.title,
      author: req.body.author,
      numberPages: req.body.numberPages,
      publisher: req.body.publisher
    }

    var book = new Book(newBook);

    book.save().then(() => {
      console.log("new book created")
    })

    res.send("a new book created with success!")
})

app.get('/book/:id', (req, res) => { 
    Book.findById(req.params.id).then((book) => {
        if(book) {
          res.json(book);
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

module.exports = app;