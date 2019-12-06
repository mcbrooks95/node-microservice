const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const bodyParser = require(`body-parser`);
const mongoose = require('mongoose');
var orders = require('./orders/orders');
var customers = require('./customers/customers');

mongoose.connect("mongodb+srv://testuser:testpassword@cluster0-fnurh.mongodb.net/test", () => {
  console.log("database is connected!");
})

const PORT = process.env.PORT || 5000

require("./Book")
const Book = mongoose.model("Book");


express()
  // .use(customers)
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .use('/', orders)
  .use('/', customers)
  .delete('/book/:id', (req, res) => { 
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send("Book has been successfully removed!")
    })
  })
  .get('/books', (req, res) => { 
    Book.find().then((books) => {
      res.json(books);
    }).catch((err) => {
      if(err) {
        throw err;
      }
    })
  })
  .get('/book/:id', (req, res) => { 
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
  .post('/book', (req, res) => { 
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
  .get('/times', (req, res) => res.send(showTimes()))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


showTimes = () => {
  let result = ''
  const times = process.env.TIMES || 5
  for (i = 0; i < times; i++) {
    result += i + ' fds '
  }
  return result;
}