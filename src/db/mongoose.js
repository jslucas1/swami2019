const mongoose = require('mongoose');

//const connectionURL = 'mongodb://127.0.0.1:27017/swami';  //that's the localhost IP and port
const connectionURL = 'mongodb://<dbuser>:<dbpassword>@ds259787.mlab.com:59787/heroku_7przdzwp'; //that's the heroku url
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
