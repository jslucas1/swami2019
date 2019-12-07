const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Team = require('./models/team');
const Game = require('./models/game');
const Book = require('./models/book');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// =====================================================
//                User flow path
// =====================================================
app.post('/users', (req, res) => {
    const myUser = new User(req.body);

    myUser.save().then(() => {
        res.status(201).send(myUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((myUsers) => {
        res.send(myUsers);
    }).catch((e) => {
        res.status(500).send();
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((myUser) => {
        if(!myUser) {
            return res.status(404).send();
        } 
        res.send(myUser)
    }).catch((e) => {
        res.status(500).send();
    })

})

// =====================================================
//                Game flow path
// =====================================================
app.post('/games', (req, res) => {
    const myGame = new Game(req.body);

    myGame.save().then(() => {
        res.status(201).send(myGame);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.get('/games', (req, res) => {
    Game.find({}).then((myGames) => {
        res.send(myGames);
    }).catch((e) => {
        res.status(500).send();
    })
})

app.get('/games/:id', (req, res) => {
    const _id = req.params.id;
    Game.findById(_id).then((myGame) => {
        if(!myGame) {
            return res.status(404).send();
        } 
        res.send(myGame)
    }).catch((e) => {
        res.status(500).send();
    })

})

// =====================================================
//                Team flow path
// =====================================================
app.post('/teams', (req, res) => {
    const myTeam = new Team(req.body);

    myTeam.save().then(() => {
        res.status(201).send(myTeam);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.get('/teams', (req, res) => {
    const league = req.query.league;
    const conference = req.query.conference;
    console.log(league);
    console.log(conference)
    if(league){
        Team.find({ league : league }).then((myTeams) => {
            return res.send(myTeams);
        }).catch((e) => {
            return res.status(500).send();
        })
    }

    if(conference){
        Team.find({ conference: conference }).then((myTeams) => {
            return res.send(myTeams);
        }).catch((e) => {
            return res.status(500).send();
        })
    }

    Team.find({}).then((myTeams) => {
        res.send(myTeams);
    }).catch((e) => {
        res.status(500).send();
    })
})

// =====================================================
//                Book flow path
// =====================================================
app.post('/books', (req, res) => {
    const myBook = new Book(req.body);

    console.log("just before new save");
    console.log("title is " + myBook.title);

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
    //const myCwid = req.params.cwid;
    const myBook = new Book(req.body);
    const myId = myBook._id;
    //const _id = req.parms.id;

    console.log("just before update");
    console.log("id is " + myId);
    console.log("title is " + myBook.title);
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