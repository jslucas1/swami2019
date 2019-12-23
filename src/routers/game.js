const express = require('express')
const Game = require('../models/game');
const router = new express.Router()

// =====================================================
//                Game flow path
// =====================================================
router.post('/games', (req, res) => {
    const myGame = new Game(req.body);

    myGame.save().then(() => {
        res.status(201).send(myGame);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

router.put('/games/:id', (req, res) => {
    const myGame = new Game(req.body);
    const myId = myGame._id;
    Game.findOneAndUpdate({"_id": myId}, {"$set": {"favorite": myGame.favorite,
                                                   "underdog": myGame.underdog,
                                                   "line": myGame.line,
                                                   "week": myGame.week,
                                                   "date": myGame.date,
                                                   "homeScore": myGame.homeScore,
                                                   "awayScore": myGame.awayScore,
                                                   "winner": myGame.winner,
                                                   "homeTeam": myGame.homeTeam
                                                }}, 
        {new: true}).then((myGame) => {
        res.send(myGame);
    }).catch((e) => {
        res.status(500).send();
    })
})

router.get('/games', (req, res) => {
    Game.find({}).then((myGames) => {
        res.send(myGames);
    }).catch((e) => {
        res.status(500).send();
    })
})

router.get('/games/:id', (req, res) => {
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

router.get('/games/week/:week', (req, res) => {
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

router.delete('/games/:id', (req, res) => {
    const _id = req.params.id;
    Game.findByIdAndRemove(_id).then((myGame) => {
        if(!myGame) {
            return res.status(404).send();
        } 
        res.send(myGame)
    }).catch((e) => {
        res.status(500).send();
    })
})

module.exports = router