const express = require("express")
const app = express.Router();
const bodyParser = require("body-parser");
require("./User")
// const bookCote = require('./bookCote.js');
const mongoose = require("mongoose");
const User = mongoose.model("User");
// const mongoose = require("mongoose");
const cors = require('cors')

app.use(bodyParser.json());


app.get('/users', cors(), (req, res) => {
    User.find().then((users) => {
        res.json(users).status(200);
    }).catch((err) => {
        if(err) {
            throw err;            
        }
        res.json(null).status(404);
    })
  })

app.put('/user/:id', cors(), (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id}, 
        {
            userName: req.body.userName,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        { new: true }
     ).then((user) => {
        res.json(user).status(200);
    }).catch((err) => {
        if(err) {
            throw err;            
        }
        res.json(null).status(404);
    })
})

app.post('/user', (req, res) => {
    new User({
        userName: req.body.userName,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).save().then((user) => {
        console.log("just saved user created")
        res.json(user).status(200);
    })
})

app.get('/user/:id', (req, res) => { 

    return Promise.resolve(
        User.findById(req.params.id).then((user) => {
            if(user) {
                res.json(user).status(200);
            }
            else
            {
                res.json(null).status(404);
            }
        }).catch((err) => {
            if(err) {
                res.json(null).status(404);
            }
            res.json(null).status(404);
        })
    )
    // bookCote.Requester.send({ type: "bookget", body: req.params.id})
    // .then((book) => {
    //     res.json(book).status(200);
    // })
})

// app.get('/books', (req, res) => {
//     bookCote.Requester.send({ type: "booklist"}).then((books) => {
//         res.json(books).status(200);
//     })
//   })

// app.delete('/book/:id', (req, res) => {
//     bookCote.Requester.send({ type: "bookdelete", id: req.params.id})
//     .then(() => {
//         res.send("Book has been successfully removed!");
//     })
// })

module.exports = app;