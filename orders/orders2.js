var express = require('express')
var router = express.Router()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const PORT = process.env.PORT || 5000

require("./Order")
const Order = mongoose.model("Order");

router.use(bodyParser.json());

// define the home page route
// router.get('/', function (req, res) {
//     res.send('Birds home page')
// })
// // define the about route
// router.get('/about', function (req, res) {
//     res.send('About birds')
// })

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