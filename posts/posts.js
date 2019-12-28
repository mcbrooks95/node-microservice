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
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        datePosted: Date.now(),
        contactPosterId: req.body.contactPosterId,
        upvotes: [],
        downvotes: [],
        contactPosterUserName: req.body.contactPosterUserName,
    }).save().then((post) => {
        console.log("just saved post created")
        res.json(post).status(200);
    })
})

app.put('/post/:id/upvote/:userId', cors(), (req, res) => {
    Post.findOne({ _id: req.params.id})
    .then((post) => {
        return post.upvotes
    })
    .then((upvotes) => {

            if(upvotes.includes(req.params.userId))
            {
                upvotes = upvotes.filter((i) => { return i != req.params.userId })
            }
            else
            {
                upvotes.push(req.params.userId)
            }
        Post.findOneAndUpdate({ _id: req.params.id}, 
            {
                upvotes: upvotes
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
})


app.put('/post/:id/downvote/:userId', cors(), (req, res) => {
    Post.findOne({ _id: req.params.id})
    .then((post) => {
        return post.downvotes
    })
    .then((downvotes) => {

            if(downvotes.includes(req.params.userId))
            {
                downvotes = downvotes.filter((i) => { return i != req.params.userId })
            }
            else
            {
                downvotes.push(req.params.userId)
            }
        Post.findOneAndUpdate({ _id: req.params.id}, 
            {
                downvotes: downvotes
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
})

module.exports = app;