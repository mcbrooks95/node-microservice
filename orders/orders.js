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
    orderRequester.send({ type: "post", body: req.body})
    .then((order) => {
        console.log(`in then statement`)
        res.json(order).status(200);
    })
})

app.get('/orders', (req, res) => {
    orderRequester.send({ type: "list"}).then((orders) => {
        res.json(orders).status(200);
    })
})

app.delete('/order/:id', (req, res) => { 
    orderRequester.send({ type: "delete", id: req.params.id})
    .then(() => {
        res.send("Order has been successfully removed!!");
    })
})


orderResponder.on("list", req => {
    return Promise.resolve(
        Order.find().then((orders) => {
            return orders;
        }).catch((err) => {
            if(err) {
                throw err;            
            }
            return null;
        })
    )
})

orderResponder.on("delete", req => {
    return Promise.resolve(        
        Order.findOneAndRemove(req.id)
        .then(() => {
            return null;
        })
    )
})

orderResponder.on("post", req => {
    return Promise.resolve(
        new Order({
                CustomerID: req.body.CustomerID,
                BookID: req.body.BookID,
                initialDate: req.body.initialDate,
                deliveryDate: req.body.deliveryDate
            }).save().then((order) => {
                    console.log("just saved order created")
                    return order
            })
    )
})


module.exports = app;