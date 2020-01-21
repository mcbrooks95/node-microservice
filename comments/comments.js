const express = require("express")
const app = express.Router();
const bodyParser = require("body-parser");
require("./Comment")
// const bookCote = require('./bookCote.js');
const mongoose = require("mongoose");
// const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");
// const mongoose = require("mongoose");
const cors = require('cors')

app.use(bodyParser.json());


app.get('/post/:postId/comments', cors(), (req, res) => {
    Comment.find({ postId: req.params.postId, replyingToCommentId: "" }).then((comments) => {
        res.json(comments).status(200);
    }).catch((err) => {
        if(err) {
            throw err;            
        }
        res.json(null).status(404);
    })
  })

app.get('/comment/:id', (req, res) => { 

    return Promise.resolve(
        Comment.findById(req.params.id).then((comment) => {
            if(comment) {
                res.json(comment).status(200);
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
})

app.post('/comment', (req, res) => {

    new Comment({
        content: req.body.content,
        postId: req.body.postId,
        replyingToCommentId: req.body.replyingToCommentId,
        contactPosterId: req.body.contactPosterId,
        upvotes: [],
        downvotes: [],
        datePosted: Date.now()
    }).save().then((comment) => {
        console.log("just saved comment created")
        res.json(comment).status(200);
    })
})

app.delete('/comment/:id', (req, res) => { 
    Customer.findOneAndRemove(req.id)
    .then(() => {
        return null;
    })
})


module.exports = app;