const mongoose = require('mongoose');

mongoose.model("Comment", {

    content: {
      type: String,
      required: true
    },
    postId: {
      type: String,
      required: true
    },
    replyingToCommentId: {
      type: String,
      required: true
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
    
    datePosted: {
      type: Date,
      required: false
    }
});
