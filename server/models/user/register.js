const mongoose = require('mongoose');


const  registerForm = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('users', registerForm )
