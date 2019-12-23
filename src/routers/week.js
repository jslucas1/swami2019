const express = require('express')
const Week = require('../models/week');
const router = new express.Router()
// =====================================================
//                Week flow path
// =====================================================
router.post('/weeks', (req, res) => {
    const myWeek = new Week(req.body);

    myWeek.save().then(() => {
        res.status(201).send(myWeek);
    }).catch((e) => {
        res.status(400).send(e);
    })
})
router.put('/weeks/:id', (req, res) => {
    const myWeek = new Week(req.body);
    const myId = myWeek._id;
    Team.findOneAndUpdate({"_id": myId}, {"$set": {"weekNumber": myWeek.weekNumber,
                                                    "beginDt": myWeek.beginDt,
                                                    "endDt": myWeek.endDt}}, 
        {new: true}).then((myWeek) => {
        res.send(myWeek);
    }).catch((e) => {
        res.status(500).send();
    })
})

router.get('/weeks', (req, res) => {
    Week.find({}).then((myWeeks) => {
        res.send(myWeeks);
    }).catch((e) => {
        res.status(500).send();
    })
})

router.get('/weeks/current', (req, res) => {
    Week.findOne({"current": true}).then((myWeek) => {
        res.send(myWeek);
    }).catch((e) => {
        res.status(500).send();
    })
})

router.get('/weeks/:id', (req, res) => {
    const _id = req.params.id;
    Team.findById(_id).then((myWeek) => {
        if(!myWeek) {
            return res.status(404).send();
        } 
        res.send(myWeek)
    }).catch((e) => {
        res.status(500).send();
    })
})
router.delete('/weeks/:id', (req, res) => {
    const _id = req.params.id;
    Team.findByIdAndRemove(_id).then((myWeek) => {
        if(!myWeek) {
            return res.status(404).send();
        } 
        res.send(myWeek)
    }).catch((e) => {
        res.status(500).send();
    })
})


module.exports = router