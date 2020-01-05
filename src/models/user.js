const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (validator.contains(value, 'password')){
                throw new Error('Password can not contain the phrase password');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    wallet: {
        type: Number,
        required: true
    },
    wagerOverride: {
        type: Boolean
    }

});

module.exports = User;