const express = require("express")
const app = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./Book")
const Book = mongoose.model("Book");
const cote = require('cote');

app.use(bodyParser.json());

// const patientRequester = new cote.Requester({ name: 'Patient Requester'})
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
    // Book.find().then((books) => {
    //   res.json(books);
    // }).catch((err) => {
    //   if(err) {
    //     throw err;
    //   }
    // })

    console.log(`in get /books`)
    bookRequester.send({ type: "list"}).then((books) => {
        console.log(`abot to print books`)
        console.log(books)
        res.json(books).status(200);
    })

    // const response = await bookRequester.send({ type: "list"});
    // console.log(`got response`)
    // console.log(response)
  })

//   app.get('/bookpatient', (req, res) => {
      
//     // const patients = await patientRequester.send({ type: "list"})
//     patientRequester.send({ type: "list"}).then((patients) => {
        
//         res.json(patients).status(200)
//     })
//     // res.json(patients).status(200)
//   })

  app.delete('/book/:id', (req, res) => { 
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send("Book has been successfully removed!")
    })
  })


// bookRequester.send({ type: "list"}).then((books) => {
//     res.json(books).status(200);
// })

bookResponder.on("list", req => {
    // Promise.resolve(
        // console.log(`in book responder`)
        // return Promise.resolve(blood);
        return Promise.resolve(
            Book.find().then((books) => {
                console.log(`found the books`)
                console.log(books)
                return books;
                // return books;
            }).catch((err) => {
                if(err) {
                    throw err;            
                }
                return null;
            })
        )
    // )
})

module.exports = app;