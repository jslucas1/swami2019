const mongoose = require('mongoose');
const validator = require('validator');

const Wager = mongoose.model('Wager', {
    user: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true,
        validate(value) {
            if (value!="favorite" && value!="underdog"){
                throw new Error('Team not properly defined.');
            }
        }
    },
    amount: {
        type: Number,
        required: true
    },
    week: {
        type: Number,
        required: true
    },

});

module.exports = Wager;