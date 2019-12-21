const cote = require('cote');

require("./Order")
const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const orderRequester = new cote.Requester({ name: 'Order Requester', key: 'order'})
const orderResponder = new cote.Responder({ name: 'Order Responder', key: 'order'})

orderResponder.on("orderlist", req => {
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


orderResponder.on("orderget", req => {
    return Promise.resolve(
        Order.findById(req.body).then((order) => {
            if(order) {
                return(order);
            }
            else
            {
                return(null);
            }
        }).catch((err) => {
            if(err) {
                res.send("sorry something went wrong")
                throw err;
            }
        })
    )
})


orderResponder.on("orderdelete", req => {
    return Promise.resolve(        
        Order.findOneAndRemove(req.id)
        .then(() => {
            return null;
        })
    )
})

orderResponder.on("orderpost", req => {
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