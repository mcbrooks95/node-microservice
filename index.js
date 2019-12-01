const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const { Pool } = require('pg');
const bodyParser = require(`body-parser`);
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://testuser:testpassword@cluster0-fnurh.mongodb.net/test", () => {
  console.log("database is connected!");
})
const pool = new Pool({
  // connectionString: process.env.DATABASE_URL,
  // connectionString: "postgres://sfpbzylfgkxmwn:1c05515cd61b6f52018402d488250ce850be16a115c401af8988f6e40005b89b@localhost:5432/d31sdj5qhk8k8s",
  connectionString: "postgres://sfpbzylfgkxmwn:1c05515cd61b6f52018402d488250ce850be16a115c401af8988f6e40005b89b@ec2-174-129-255-106.compute-1.amazonaws.com:5432/d31sdj5qhk8k8s",
  // ssl: false
  ssl: true
});


console.log('hey whats up')
const PORT = process.env.PORT || 5000

require("./Book")
const Book = mongoose.model("Book");


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/books', (req, res) => { 
    Book.find().then((books) => {
      res.json(books);
    })
  })
  .get('/book/:id', (req, res) => { 


    Book.findById(req.params.id).then((book) => {
        if(book) {
          res.json(book);
        }
        else
        {
          res.sendStatus(404);
        }
    }).catch((err) => {
        if(err) {
          throw err;
        }
    })


  })
  .post('/book', (req, res) => { 
      var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
      }

      var book = new Book(newBook);

      book.save().then(() => {
        console.log("new book created")
      })

      res.send("a new book created with success!")
  })
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
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