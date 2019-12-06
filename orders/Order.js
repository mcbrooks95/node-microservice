const mongoose = require("mongoose");

mongoose.model("Order", {

    CustomerID: {
        type: String,
        // type: mongoose.SchemaTypes.CustomerID,
        required: true
    },
    BookID: {
        type: String,
        // type: mongoose.SchemaTypes.BookID,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }
})