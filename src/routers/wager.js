const express = require('express')
const Wager = require('../models/wager');
const Week = require('../models/week');
const Game = require('../models/game');
const router = new express.Router()

// =====================================================
//                Wager flow path
// =====================================================
router.post('/wagers', (req, res) => {
    const myWager = new Wager(req.body);

    myWager.save().then(() => {
        res.status(201).send(myWager);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

router.get('/wagers', (req, res) => {
    Wager.find({}).then((myWagers) => {
        res.send(myWagers);
    }).catch((e) => {
        res.status(500).send();
    })
})
router.get('/wagers/:id', (req, res) => {
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
router.get('/wagers/week/:week/:user', (req, res) => {
    const myUser = req.params.user;
    const myWeek = req.params.week;
    Week.findOne({"current": true}).then((myCurrWeekObj) =>{
        if(myWeek == 0)
        { 
            const currWeek = myCurrWeekObj.weekNumber;
            Wager.find({"week": currWeek, "user": myUser}).then((myWagers) => {
                res.send(myWagers);
            }).catch((e) => {
                res.status(500).send();
        })
        } else {
            Wager.find({"week": myWeek, "user": myUser}).then((myWagers) => {
                res.send(myWagers);
            }).catch((e) => {
                res.status(500).send();
        })  
        }

    }).catch((e) => {
        res.status(500).send();
        })
})
router.get('/wagers/week/:week', (req, res) => {
    const myWeek = req.params.week;
    Week.findOne({"current": true}).then((myCurrWeekObj) => {
        if(myWeek == 0)
        { 
            const currWeek = myCurrWeekObj.weekNumber;
            Wager.find({"week": currWeek}).then((myWagers) => {
                res.send(myWagers);
            }).catch((e) => {
                res.status(500).send();
            })
        } else {
            Wager.find({"week": myWeek}).then((myWagers) => {
                res.send(myWagers);
            }).catch((e) => {
                res.status(500).send();
            })  
        }

    }).catch((e) => {
        res.status(500).send();
        })
   
})
router.delete('/wagers/:id', (req, res) => {
    const _id = req.params.id;
    Wager.findByIdAndRemove(_id).then((myWager) => {
        if(!myWager) {
            return res.status(404).send();
        } 
        res.send(myWager)
    }).catch((e) => {
        res.status(500).send();
    })
})


module.exports = router