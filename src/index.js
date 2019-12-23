const express = require('express');
require('./db/mongoose');
const Book = require('./models/book');
const userRouter = require('./routers/user');
const gameRouter = require('./routers/game');
const teamRouter = require('./routers/team');
const wagerRouter = require('./routers/wager');
const weekRouter = require('./routers/week');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(gameRouter);
app.use(teamRouter);
app.use(wagerRouter);
app.use(weekRouter);


// =====================================================
//                Book flow path
// =====================================================
app.post('/books', (req, res) => {
    const myBook = new Book(req.body);

    console.log("just before new save");
    console.log("cwid is " + myBook.cwid);

    myBook.save().then(() => {
        res.status(201).send(myBook);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.get('/books', (req, res) => {
    Book.find({}).then((myBooks) => {
        res.send(myBooks);
    }).catch((e) => {
        res.status(500).send();
    })
})

app.get('/books/:cwid', (req, res) => {
    const myCwid = req.params.cwid;
    Book.find({cwid: myCwid}).then((myBooks) => {
        res.send(myBooks);
    }).catch((e) => {
        res.status(500).send();
    })
})

app.get('/books/:id', (req, res) => {
    const _id = req.params.id;
    Book.findById(_id).then((myBook) => {
        if(!myBook) {
            return res.status(404).send();
        } 
        res.send(myBook)
    }).catch((e) => {
        res.status(500).send();
    })
})
app.delete('/books/:id', (req, res) => {
    const _id = req.params.id;
    Book.findByIdAndRemove(_id).then((myBook) => {
        if(!myBook) {
            return res.status(404).send();
        } 
        res.send(myBook)
    }).catch((e) => {
        res.status(500).send();
    })
})

app.put('/books/:id', (req, res) => {
    const myBook = new Book(req.body);
    const myId = myBook._id;
    Book.findOneAndUpdate({"_id": myId}, {"$set": {"title": myBook.title,
                                                    "cover": myBook.cover,
                                                    "isbn": myBook.isbn,
                                                    "author": myBook.author,
                                                    "copies": myBook.copies,
                                                    "genre": myBook.genre,
                                                    "length": myBook.length}}, 
        {new: true}).then((myBook) => {
        res.send(myBook);
    }).catch((e) => {
        console.log("in the error");
        res.status(500).send();
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port);
})