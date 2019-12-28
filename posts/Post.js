const mongoose = require('mongoose');

mongoose.model("Post", {

    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: false
    },
    datePosted: {
      type: Date,
      required: false
    },
    contactPosterId: {
      type: String,
      required: false
    },
    upvotes: {
      type: [String],
      required: false
    },
    downvotes: {
      type: [String],
      required: false
    },
    contactPosterUserName: {
      type: String,
      required: false
    }
});
