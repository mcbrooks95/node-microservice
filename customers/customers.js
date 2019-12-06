const express = require("express")
const app = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./Customer")
const Customer = mongoose.model("Customer");

app.use(bodyParser.json());

app.post('/customer', (req, res) => { 
    var newCustomer = {
      name: req.body.name,
      age: req.body.age,
      address: req.body.address
    }

    var customer = new Customer(newCustomer);

    customer.save().then(() => {
      console.log("new customer created")
    }).catch(err => {
        if(err) {
            throw err;
        }
    })

    res.send("a new customer created with success!")
})


app.get('/customers', (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers)
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })
})


app.get('/customer/:id', (req, res) => { 
    Customer.findById(req.params.id).then((customer) => {
        if(customer) {
            res.json(customer);
        }
        else
        {
            res.sendStatus("wrong status id sorry!!");
        }
    }).catch((err) => {
        if(err) {
            res.send("sorry something went wrong")
            throw err;
        }
    })
})

app.delete('/customer/:id', (req, res) => { 
    Customer.findOneAndRemove(req.params.id).then(() => {
        res.send("Customer has been successfully removed!")
    })
})

module.exports = app;