const cote = require('cote');

require("./Book")
const mongoose = require("mongoose");
const Book = mongoose.model("Book");
const bookRequester = new cote.Requester({ name: 'Book Requester', key: 'book'})
const bookResponder = new cote.Responder({ name: 'Book Responder', key: 'book'})

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

bookResponder.on("bookget", req => {
    return Promise.resolve(
        Book.findById(req.body).then((book) => {
            if(book) {
                return(book);
            }
            else
            {
                return(null);
            }
        }).catch((err) => {
            if(err) {
                return(null);
            }
            return(null);
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

module.exports = {
    Requester: bookRequester,
    Responder: bookResponder
}