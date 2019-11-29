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
  .post('/book', (req, res) => { 
    var newBook = {
      title: req.body.title,
      // title = "asdf",
      author: req.body.author,
      numberPages: req.body.numberPages,
      publisher: req.body.publisher
    }

    var book = new Book(newBook);

    book.save().then(() => {
      console.log('new book created')
    }).catch((err) => {
        if(err) {
          throw err;
        }
    })
    res.send("a new book created with success");
    // console.log(`about to print req.body for book post`)
    // console.log(req.body)
    // res.send("Testing our book route!");
  })
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      console.log(`about to print results`)
      // alert(results);
      console.log(results)
      console.log(result)
      res.render('pages/db', results );
      console.log(`about to print results`)
      console.log(results)
      console.log(result)
      client.release();
      console.log(`about to print results`)
      console.log(results)
      console.log(result)
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