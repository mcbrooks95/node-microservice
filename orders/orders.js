const express = require("express")
const app = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./Order")
const Order = mongoose.model("Order");
const cote = require('cote');

app.use(bodyParser.json());

const orderRequester = new cote.Requester({ name: 'Order Requester'})
const orderResponder = new cote.Responder({ name: 'Order Responder'})

app.post('/order', (req, res) => { 
    var newOrder = {
        CustomerID: req.body.CustomerID,
        BookID: req.body.BookID,
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }
    var order = new Order(newOrder);
    order.save().then(() => {
      console.log("new order created")
    }).catch(err => {
        if(err) {
            throw err;
        }
    })
    res.send("a new order created with success!")
})

app.get('/orders', (req, res) => {
    Order.find().then((orders) => {
        res.json(orders)
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })
})

app.delete('/order/:id', (req, res) => { 
    Order.findOneAndRemove(req.params.id).then(() => {
        res.send("Order has been successfully removed!")
    })
})

module.exports = app;