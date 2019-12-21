const express = require("express")
const app = express.Router();
const bodyParser = require("body-parser");
require("./Order")
const orderCote = require('./orderCote.js');
const customerCote = require('../customers/customerCote.js');
const bookCote = require('../books/bookCote.js');

app.use(bodyParser.json());

app.post('/order', (req, res) => {     
    // bookCote.Requester.send({ type: "bookget", body: req.body.BookID })
    bookCote.Requester.send({ type: "bookget", body: req.body.BookID })
    .then((book) => {
        console.log("in then book statement")
        console.log(book)
        if(book) {
            orderCote.Requester.send({ type: "orderpost", body: req.body})
            .then((order) => {
                res.json(order).status(200);
            })
        }
        else {
            res.json(book).status(200);
        }
    })
    // orderCote.Requester.send({ type: "orderpost", body: req.body})
    // .then((order) => {
    //     res.json(order).status(200);
    // })
})

app.get('/orders', (req, res) => {
    orderCote.Requester.send({ type: "orderlist"}).then((orders) => {
        res.json(orders).status(200);
    })
})

app.get('/order/:id', (req, res) => {    
    orderCote.Requester.send({ type: "orderget", body: req.params.id})
    .then((order) => {
        res.json(order).status(200);
    })
})

app.delete('/order/:id', (req, res) => { 
    orderCote.Requester.send({ type: "orderdelete", id: req.params.id})
    .then(() => {
        res.send("Order has been successfully removed!!");
    })
})

module.exports = app;