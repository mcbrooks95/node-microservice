const mongoose = require("mongoose");

// var Schema = mongoose.Schema;
// CustomerID = Schema.objectId;

mongoose.model("Order", {

    CustomerID: {
        type: String,
        // type: mongoose.Schema.objectId,
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