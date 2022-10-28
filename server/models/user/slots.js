const mongoose = require('mongoose');


const slotsBooking = new mongoose.Schema({
    sloatNo: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    bookedId: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('slots', slotsBooking)
