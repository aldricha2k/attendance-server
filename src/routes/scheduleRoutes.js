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
        date, 
        start, 
        end, 
        summary, 
        name,
        perscode,
        slot
    } = req.body;
    
    try {
        const schedule = new Schedule({
            title, 
            facility, 
            date, 
            start, 
            end, 
            summary, 
            name,
            perscode,
            max_slot: slot
        });
        await schedule.save();
        res.send(schedule);
    } 
    catch (err) {
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
        name,
        perscode,
        slot,
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
            name,
            perscode,
            max_slot: slot
        });
        res.send(schedule);
    }
    catch(err){
        return res.status(422).send(err.message);
    }
});

router.put('/schedule', async (req, res) => {
    const { meetId } = req.body;
  
    try{
        const schedule = await Schedule.deleteOne({ _id: meetId });
        res.send(schedule);
    }
    catch(err){
        res.status(500).send({ error: err});
    }
}),

router.patch('/slot', async (req, res) => {
    const { 
        meetId, 
        name, 
        perscode, 
        chosenSlot
    } = req.body;

    const newAttendee = { name, perscode, chosen_slot: chosenSlot }
    
    try{
        const schedule = await Schedule.findOneAndUpdate({
            _id: meetId
        }, {
            $push: {
                attendees: newAttendee
            },
            $inc: { taken_slot: +1 }
        });

        res.send(schedule);
    }
    catch(err){
        res.status(500).send({ error: err });
    }
});

router.put('/slot', async (req, res) => {
    const {
        meetId,
        perscode,
    } = req.body;
   
    try{
        const schedule = await Schedule.findOneAndUpdate({
            _id: meetId
        }, {
            $pull: {
                attendees: { perscode:perscode }
            },
            $inc: { taken_slot: -1}
        });
        res.send(schedule);
    }
    catch(e){
        res.send(500).send({ error: err});
    }
}) 
module.exports = router;
