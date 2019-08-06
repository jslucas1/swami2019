const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/swami';  //that's the localhost IP and port
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
