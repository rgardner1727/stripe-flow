const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    stripeCustomerId: {type: String, required: false},
    subscription: {
        id: {type: String, required: false}, 
        status: {type: String, required: false},
        type: {type: String, required: false}
    }
});

module.exports = mongoose.model('User', userSchema);