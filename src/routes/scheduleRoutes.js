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

router.patch('/schedule', async (req, res) => {
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
        await Schedule.findOneAndUpdate({
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
        const schedule = await Schedule.find();
        res.send(schedule);
        }
    catch(err){
        return res.status(422).send(err.message);
    }
});

router.put('/schedule', async (req, res) => {
    const { meetId } = req.body;
  
    try{
        await Schedule.deleteOne({ _id: meetId });
        const schedule = await Schedule.find();
        res.send(schedule);
        }
    catch(err){
        res.status(500).send({ error: err});
    }
  }),
module.exports = router;
