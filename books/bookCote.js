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
                CustomerID: req.body.CustomerID,
                BookID: req.body.BookID,
                initialDate: req.body.initialDate,
                deliveryDate: req.body.deliveryDate
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