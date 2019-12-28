const express = require("express")
const app = express.Router();
const bodyParser = require("body-parser");
require("./Post")
// const bookCote = require('./bookCote.js');
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
// const mongoose = require("mongoose");
const cors = require('cors')

app.use(bodyParser.json());


app.get('/posts', cors(), (req, res) => {
    Post.find().then((posts) => {
        res.json(posts).status(200);
    }).catch((err) => {
        if(err) {
            throw err;            
        }
        res.json(null).status(404);
    })
  })

app.put('/post/:id', cors(), (req, res) => {
    Post.findOneAndUpdate({ _id: req.params.id}, 
        {
            userName: req.body.userName,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        { new: true }
     ).then((post) => {
        res.json(post).status(200);
    }).catch((err) => {
        if(err) {
            throw err;            
        }
        res.json(null).status(404);
    })
})

app.post('/post', (req, res) => {

    new Post({
        title: "firstPost",
        category: "interesting",
        content: "this is the very first post of this site!",
        datePosted: Date.now(),
        contactPosterId: "5e06c50bcb42dd26fc548717",
        upvotes: ["5e066b052ff4171d3cd2c5dd", "5e066b482ff4171d3cd2c5de"],
        downvotes: ["5e06c50bcb42dd26fc548717"],
        contactPosterUserName: "fdasdf3333"
    }).save().then((post) => {
        console.log("just saved post created")
        res.json(post).status(200);
    })
})

module.exports = app;