const mongoose = require("mongoose");

mongoose.model("Order", {

    CustomerID: {
        type: mongoose.SchemaTypes.CustomerID,
        required: true
    },
    BookID: {
        type: mongoose.SchemaTypes.BookID,
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