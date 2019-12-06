var express = require('express')
var router = express.Router()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const PORT = process.env.PORT || 5000

require("./Order")
const Order = mongoose.model("Order");

router.use(bodyParser.json());

router.get('/orders', (req, res) => {
    Order.find().then((orders) => {
        res.json(orders)
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })
})

module.exports = router