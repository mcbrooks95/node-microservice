const express = require('express')
const path = require('path')
const bodyParser = require(`body-parser`);
const mongoose = require('mongoose');
var orders = require('./orders/orders');
var customers = require('./customers/customers');
var books = require('./books/books');
const cote = require('cote');

mongoose.connect("mongodb+srv://testuser:testpassword@cluster0-fnurh.mongodb.net/test", () => {
  console.log("database is connected!");
})

const bloodResponder = new cote.Responder({ name: 'blood Responder'})
const patientRequester = new cote.Requester({ name: 'Patient Requester'})
const blood = [
  {
    blood_type: "A+",
    count: 10
  },
  {
    blood_type: "A-",
    count: 15
  },
  {
    blood_type: "AB+",
    count: 5
  }
]

bloodResponder.on("list", req => {
  return Promise.resolve(blood);
})


const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get("/patients", async function(req, res) {
    const patients = await patientRequester.send({ type: "list"})
    res.json(patients).status(200)
  })
  .use('/', orders)
  .use('/', customers)
  .use('/', books)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
