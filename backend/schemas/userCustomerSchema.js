const mongoose = require('mongoose');

const userCustomerSchema = mongoose.Schema({
    userId: {type: String, required: true},
    customerId: {type: String, required: true}
});

module.exports = mongoose.model('UserCustomer', userCustomerSchema);