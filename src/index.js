const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Team = require('./models/team');
const Game = require('./models/game');
const Book = require('./models/book');
const Wager = require('./models/wager');

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
    User.find({}).sort( { wallet: -1 } ).then((myUsers) => {
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

app.get('/users/email/:email', (req, res) => {
    const myEmail = req.params.email;
    User.find({email: myEmail}).then((myUser) => {
        res.send(myUser);
    }).catch((e) => {
        res.status(500).send();
    })
})

app.put('/users/:id', (req, res) => {
    const myUser = new User(req.body);
    const myId = myUser._id;
    console.log("just before update");
    console.log("id is " + myId);
    console.log("name is " + myUser.name);
    Book.findOneAndUpdate({"_id": myId}, {"$set": {"name": myUser.name,
                                                    "password": myUser.password,
                                                    "email": myUser.email,
                                                    "nickname": myUser.nickname,
                                                    "wallet": myUser.wallet}}, 
        {new: true}).then((myUser) => {
        res.send(myUser);
    }).catch((e) => {
        console.log("in the error");
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

app.get('/games/week/:week', (req, res) => {
    const myWeek = req.params.week;
    const currWeek = "2";
    if(myWeek == 0)
    { 
        Game.find({week: currWeek}).then((myGames) => {
            res.send(myGames);
        }).catch((e) => {
            res.status(500).send();
    })
    } else {
        Game.find({week: myWeek}).then((myGames) => {
            res.send(myGames);
        }).catch((e) => {
            res.status(500).send();
    })  
    }
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

app.get('/teams/:id', (req, res) => {
    const _id = req.params.id;
    Team.findById(_id).then((myTeam) => {
        if(!myTeam) {
            return res.status(404).send();
        } 
        res.send(myTeam)
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

// =====================================================
//                Wager flow path
// =====================================================
app.post('/wagers', (req, res) => {
    const myWager = new Wager(req.body);

    myWager.save().then(() => {
        res.status(201).send(myWager);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.get('/wagers', (req, res) => {
    Wager.find({}).then((myWagers) => {
        res.send(myWagers);
    }).catch((e) => {
        res.status(500).send();
    })
})
app.get('/wagers/:id', (req, res) => {
    const _id = req.params.id;
    Wager.findById(_id).then((myWager) => {
        if(!myWager) {
            return res.status(404).send();
        } 
        res.send(myWager)
    }).catch((e) => {
        res.status(500).send();
    })
})
app.get('/wagers/week/:week/:id', (req, res) => {
    const myid = req.params.id;
    const myWeek = req.params.week;
    const currWeek = "2";
    if(myWeek == 0)
    { 
        Wager.find({week: currWeek, _id: myid}).then((myWagers) => {
            res.send(myWagers);
        }).catch((e) => {
            res.status(500).send();
    })
    } else {
        Wager.find({week: myWeek}).then((myWagers) => {
            res.send(myWagers);
        }).catch((e) => {
            res.status(500).send();
    })  
    }
})
app.listen(port, () => {
    console.log('Server is up on port ' + port);
})