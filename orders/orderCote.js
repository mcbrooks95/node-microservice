const cote = require('cote');

require("./Order")
const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const orderRequester = new cote.Requester({ name: 'Order Requester'})
const orderResponder = new cote.Responder({ name: 'Order Responder'})

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

module.exports = {
    Requester: orderRequester,
    Responder: orderResponder
}