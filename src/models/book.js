const mongoose = require('mongoose');
const validator = require('validator');

const Book = mongoose.model('Book', {
    cwid: {
        type: String,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    cover: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    copies: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    length: {
        type: Number,
        required: true
    }
});

module.exports = Book;