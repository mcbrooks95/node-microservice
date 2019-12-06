const express = require("express")
const app = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://testuser:testpassword@cluster0-fnurh.mongodb.net/test", () => {
  console.log("database is connected to orders!!");
})

const PORT = process.env.PORT || 5000

require("./Order")
const Order = mongoose.model("Order");

// app.listen(PORT, () => { 
//     console.log(`orders is working on ${ PORT }`)
// })

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