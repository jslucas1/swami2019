const mongoose = require('mongoose');
const validator = require('validator');

const Team = mongoose.model('Team', {
    name: {
        type: String,
        trim: true,
        required: true
    },
    league: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        validate(value) {
            if (value!="NFL" && value!="CFB"){
                throw new Error('League must be NFL or CFB');
            }
        }
    },
    conference: {
        type: String,
        required: true,
        trim: true
    },
});

module.exports = Team;