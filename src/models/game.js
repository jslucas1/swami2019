const mongoose = require('mongoose');
const validator = require('validator');

const Game = mongoose.model('Game', {
    home: {
        type: ObjectId,
        required: true
    },
    away: {
        type: ObjectId,
        required: true
    },
    week: {
        type: Number,
        required: true
            
        
    },
    homeScore: {
        type: Number,
        required: true
    },
    awayScore: {
        type: Number,
        required: true
    },
    winner: {
        type: Number,
        required: true,
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        validate(value) {
            if (value!="H" && value!="A" && value!="P"){
                throw new Error('Winner not properly defined.');
            }
        }
    }

});

module.exports = Game;