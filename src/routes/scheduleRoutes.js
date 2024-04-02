const express = require('express');
const mongoose = require('mongoose');

const Schedule = mongoose.model('Schedule');

const router = express.Router();

router.get('/schedule', async (req, res) => {
    const schedule = await Schedule.find();
    res.send(schedule);
});

router.post('/schedule', async (req, res) => {
    const {
        title,
        facility,
        summary,
        date,
        start,
        end,
        perscode
    } = req.body;

    try{
        const schedule = new Schedule({
            title,
            facility,
            summary,
            date,
            start,
            end,
            perscode
        });
        await schedule.save();
    }
    catch(err){
        return res.status(422).send(err.message);
    }
});

router.post('/schedule', async (req, res) => {
    const {
        title,
        meetId,
        facility,
        summary,
        date,
        start,
        end,
        perscode
    } = req.body;

    try{
        const schedule = await Schedule.findOneAndUpdate({
            _id: meetId
        },
        {
            title,
            facility,
            summary,
            date,
            start,
            end,
            perscode
        });
        await schedule.save();
    }
    catch(err){
        return res.status(422).send(err.message);
    }
});

module.exports = router;
