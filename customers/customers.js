const express = require("express")
const app = express.Router();
const bodyParser = require("body-parser");
require("./Customer")
const customerCote = require('./customerCote.js');

app.use(bodyParser.json());

app.post('/customer', (req, res) => {
    customerCote.Requester.send({ type: "customerpost", body: req.body})
    .then((customer) => {
        res.json(customer).status(200);
    })
})

app.get('/customers', (req, res) => {
    customerCote.Requester.send({ type: "customerlist"}).then((customers) => {
        res.json(customers).status(200);
    })
})

app.get('/customer/:id', (req, res) => {    
    customerCote.Requester.send({ type: "customerget", body: req.params.id})
    .then((customer) => {
        res.json(customer).status(200);
    })
})

app.delete('/customer/:id', (req, res) => { 
    customerCote.Requester.send({ type: "customerdelete", id: req.params.id})
    .then(() => {
        res.send("Customer has been successfully removed!");
    })
})

module.exports = app;