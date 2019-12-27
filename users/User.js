const mongoose = require('mongoose');

mongoose.model("User", {

    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    }
});
