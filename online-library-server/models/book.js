var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    ratting: { type: Number, required: false, default: 0 },
    pickup: { type: Boolean, required: false, default: false },
    user: {
        type:String
    },
});

module.exports = mongoose.model('book', bookSchema)
