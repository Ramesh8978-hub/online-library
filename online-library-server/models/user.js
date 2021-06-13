var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    role: { type: String, required: true, default: 'user' },
    name: { type: String, required: true,unique:true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }

});

module.exports = mongoose.model('user', userSchema)
