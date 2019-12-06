const express = require("express")
const app = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./Book")
const Book = mongoose.model("Book");

app.use(bodyParser.json());


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
    Book.find().then((books) => {
      res.json(books);
    }).catch((err) => {
      if(err) {
        throw err;
      }
    })
  })

  app.delete('/book/:id', (req, res) => { 
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send("Book has been successfully removed!")
    })
  })

module.exports = app;