const express = require("express")
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://testuser:testpassword@cluster0-fnurh.mongodb.net/customers", () => {
  console.log("database is connected to customersssss!!");
})
// mongodb+srv://testuser:<password>@cluster0-fnurh.mongodb.net/test

const PORT = process.env.PORT || 5000


app.post('/customer', (req, res) => { 
    var newCustomer = {
      name: req.body.name,
      age: req.body.age,
      address: req.body.address
    }

    var customer = new Customer(newCustomer);

    customer.save().then(() => {
      console.log("new customer created")
    }).catch(err => {
        if(err) {
            throw err;
        }
    })

    res.send("a new customer created with success!")
})


app.get('/customers', (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers)
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })
})

require("./Customer")
const Customer = mongoose.model("Customer");


app.listen(PORT, () => { 
    console.log(`customers is working on ${ PORT }`)
})