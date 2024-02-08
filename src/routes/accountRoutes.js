const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const User = mongoose.model('User');

const router = express.Router();

router.use(requireAuth);

router.get('/account', async (req, res) => {
    const details = await User.find({ userId: req.user._id });

    res.send(details);
});
  
router.put('/account', async (req, res) => {
    const { _id, balance, payment, installment } = req.body;

    try{
        const updateUser = await User.findOneAndUpdate(
            { _id },
            { 
                balance,
                payment,
                installment
            }
        )
        res.send(updateUser);
    }
    catch(err){
        res.status(500).send({ error: err});
    }
}),

router.patch('/account', async (req, res) => {
    const { _id, balance } = req.body;

    try{
        const updateUser = await User.findOneAndUpdate(
            { _id },
            { 
                balance,
            }
        )
        res.send(updateUser);
    }
    catch(err){
        res.status(500).send({ error: err});
    }
}),


module.exports = router;