const express = require("express")
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://testuser:testpassword@cluster0-fnurh.mongodb.net/orders", () => {
  console.log("database is connected to orders!!");
})
// mongodb+srv://testuser:<password>@cluster0-fnurh.mongodb.net/test

const PORT = process.env.PORT || 5000

require("./Order")
const Order = mongoose.model("Order");

app.post('/order', (req, res) => { 
    var newOrder = {
        CustomerID: req.body.CustomerID,
        BookID: req.body.BookID,
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
        // CustomerID: "5de72cc3e04f4f45804c9ca2",
        // BookID: "5de16ef0d1639607e4e1dd22",
        // initialDate: "2019-01-31",
        // deliveryDate: "2019-03-30"
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

app.listen(PORT, () => { 
    console.log(`orders is working on ${ PORT }`)
})



// app.get('/customers', (req, res) => {
//     Customer.find().then((customers) => {
//         res.json(customers)
//     }).catch((err) => {
//         if(err) {
//             throw err;
//         }
//     })
// })


// app .get('/customer/:id', (req, res) => { 
//     Customer.findById(req.params.id).then((customer) => {
//         if(customer) {
//             res.json(customer);
//         }
//         else
//         {
//             res.sendStatus("wrong status id sorry!!");
//         }
//     }).catch((err) => {
//         if(err) {
//             res.send("sorry something went wrong")
//             throw err;
//         }
//     })
// })

// app.delete('/customer/:id', (req, res) => { 
//     Customer.findOneAndRemove(req.params.id).then(() => {
//         res.send("Customer has been successfully removed!")
//     })
// })
