const express = require('express')
const path = require('path')
const bodyParser = require(`body-parser`);
const mongoose = require('mongoose');
// var orders = require('./orders/orders');
// var customers = require('./customers/customers');
var books = require('./books/books');

mongoose.connect("mongodb+srv://testuser:testpassword@cluster0-fnurh.mongodb.net/test", () => {
  console.log("database is connected!");
})
const PORT = process.env.PORT || 5000

express()
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
  })
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  // .use('/', orders)
  // .use('/', customers)
  .use('/', books)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
