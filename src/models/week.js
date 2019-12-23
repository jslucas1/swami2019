const mongoose = require('mongoose');
const validator = require('validator');

const Week = mongoose.model('Week', {
    weekNumber: {
        type: Number,
        required: true
    },
    beginDt: {
        type: String,
        required: true,
        trim: true
    },
    endDt: {
        type: String,
        required: true,
        trim: true
    },
    current: {
        type: Boolean,
        required: true
    }
});

module.exports = Week;