const cote = require('cote');

require("./Customer")
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const customerRequester = new cote.Requester({ name: 'Customer Requester', key: 'customer'})
const customerResponder = new cote.Responder({ name: 'Customer Responder', key: 'customer'})

customerResponder.on("customerget", req => {
    return Promise.resolve(
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
    )
})

customerResponder.on("customerlist", req => {
    return Promise.resolve(
        Customer.find().then((customers) => {
            return customers;
        }).catch((err) => {
            if(err) {
                throw err;            
            }
            return null;
        })
    )
})

customerResponder.on("customerdelete", req => {
    return Promise.resolve(        
        Customer.findOneAndRemove(req.id)
        .then(() => {
            return null;
        })
    )
})

customerResponder.on("customerpost", req => {
    return Promise.resolve(
        new Customer({
                name: req.body.name,
                age: req.body.age,
                address: req.body.address
            }).save().then((customer) => {
                    console.log("just saved customer created")
                    return customer
            })
    )
})

module.exports = {
    Requester: customerRequester,
    Responder: customerResponder
}