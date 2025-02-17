const mongoose = require('mongoose');

const refreshTokenSchema = mongoose.Schema({
    email: { type: String, required: true },
    refreshToken: { type: String, required: true }
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);