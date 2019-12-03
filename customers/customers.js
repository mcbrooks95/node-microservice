const express = require("express")
const app = express();


mongoose.connect("mongodb+srv://testuser:testpassword@cluster0-fnurh.mongodb.net/customers", () => {
  console.log("database is connected to customersssss!!");
})
// mongodb+srv://testuser:<password>@cluster0-fnurh.mongodb.net/test

const PORT = process.env.PORT || 5001



app.listen(PORT, () => { 
    console.log(`customers is working on ${ PORT }`)
})