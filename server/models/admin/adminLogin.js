const mongoose = require('mongoose');


const adminLogin = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('admin', adminLogin)
