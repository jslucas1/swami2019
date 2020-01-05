const express = require('express')
const User = require('../models/user');
const router = new express.Router()

// =====================================================
//                User flow path
// =====================================================
router.post('/users', (req, res) => {
    const myUser = new User(req.body);

    myUser.save().then(() => {
        res.status(201).send(myUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

router.get('/users', (req, res) => {
    User.find({}).sort( { wallet: -1 } ).then((myUsers) => {
        res.send(myUsers);
    }).catch((e) => {
        res.status(500).send();
    })
})

router.get('/users/:id', (req, res) => {
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

router.get('/users/email/:email', (req, res) => {
    const myEmail = req.params.email;
    User.find({email: myEmail}).then((myUser) => {
        res.send(myUser);
    }).catch((e) => {
        res.status(500).send();
    })
})

router.put('/users/:id', (req, res) => {
    console.log(req.body);
    const myUser = new User(req.body);
    const myId = myUser._id;
    console.log("The user object sent in is : " + myUser);
    console.log("the request that came in" + req.body);
    console.log("just before update");
    console.log("id is " + myId);
    console.log("name is " + myUser.name);
    console.log("email is : "+ myUser.email);
    /*
    User.findOneAndUpdate({"_id": myId}, {"$set": {"name": myUser.name,
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
    */
})
router.delete('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findByIdAndRemove(_id).then((myUser) => {
        if(!myUser) {
            return res.status(404).send();
        } 
        res.send(myUser)
    }).catch((e) => {
        res.status(500).send();
    })
})

module.exports = router