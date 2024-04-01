const express = require('express');
const mongoose = require('mongoose');

const Schedule = mongoose.model('Schedule');

const router = express.Router();

router.post('/schedule', async (req, res) => {
    const {
        title,
        summary,
        dateString,
        start,
        end,
        perscode
    } = req.body;

    try{
        const schedule = new Schedule({
            title,
            summary,
            date: dateString,
            start,
            end,
            perscode
        });
        await schedule.save;
        res.send(schedule);
    }
    catch(err){
        return res.status(422).send(err.message);
    }
});

module.exports = router;