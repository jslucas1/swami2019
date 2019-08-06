const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Team = require('./models/team');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})