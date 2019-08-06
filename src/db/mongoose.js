const mongoose = require('mongoose');

//const connectionURL = 'mongodb://127.0.0.1:27017/swami';  //that's the localhost IP and port
const connectionURL = 'mongodb+srv://swamiapp:Rolltide1!@cluster0-s02ok.mongodb.net/swami-api?retryWrites=true&w=majority'; //that's the mongo url
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
