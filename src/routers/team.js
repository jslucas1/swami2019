const express = require('express')
const Team = require('../models/team');
const router = new express.Router()


// =====================================================
//                Team flow path
// =====================================================
router.post('/teams', (req, res) => {
    const myTeam = new Team(req.body);

    myTeam.save().then(() => {
        res.status(201).send(myTeam);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

router.put('/teams/:id', (req, res) => {
    const myTeam = new Team(req.body);
    const myId = myTeam._id;
    Team.findOneAndUpdate({"_id": myId}, {"$set": {"name": myTeam.name,
                                                    "league": myTeam.league,
                                                    "conference": myTeam.conference,
                                                    "current": myTeam.current}},
        {new: true}).then((myTeam) => {
        res.send(myTeam);
    }).catch((e) => {
        res.status(500).send();
    })
})

router.get('/teams', (req, res) => {
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

router.get('/teams/:id', (req, res) => {
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
router.delete('/teams/:id', (req, res) => {
    const _id = req.params.id;
    Team.findByIdAndRemove(_id).then((myTeam) => {
        if(!myTeam) {
            return res.status(404).send();
        } 
        res.send(myTeam)
    }).catch((e) => {
        res.status(500).send();
    })
})


module.exports = router