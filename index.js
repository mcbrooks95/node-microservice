const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const bodyParser = require(`body-parser`);
const mongoose = require('mongoose');
var orders = require('./orders/orders');
var customers = require('./customers/customers');
var books = require('./books/books');

mongoose.connect("mongodb+srv://testuser:testpassword@cluster0-fnurh.mongodb.net/test", () => {
  console.log("database is connected!");
})

const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .use('/', orders)
  .use('/', customers)
  .use('/', books)
  .get('/times', (req, res) => res.send(showTimes()))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


showTimes = () => {
  let result = ''
  const times = process.env.TIMES || 5
  for (i = 0; i < times; i++) {
    result += i + ' fds '
  }
  return result;
}