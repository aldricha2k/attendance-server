const express = require('express');
const mongoose = require('mongoose');

const Attendance = mongoose.model('Attendance');

const router = express.Router();

router.get('/attendance', async (req, res) => {
    const details = await Attendance.find();

    res.send(details);
})
router.post('/attendance', async (req, res) => {
    const {
        id,
        name,
        time_in,
        time_out,
        date,
        week,
        week_counter,
        month_year,
        absent,
        deduction
    } = req.body;
    
    try {
    const attendance = new Attendance({
        user_id: id,
        name,
        time_in,
        time_out,
        date,
        week,
        week_counter,
        month_year,
        absent,
        deduction
    });
    await attendance.save();

    res.send(attendance);
    } catch (err) {
    return res.status(422).send(err.message);
    }
    
});

router.put('/attendance', async (req, res) => {
  const { id, date, time_out } = req.body; 

  try{
    const updateAttendance = await Attendance.findOneAndUpdate(
      { user_id: id, date: date },
      { 
          time_out: time_out
      }
    )
    res.send(updateAttendance);
  }
  catch(err){
    res.status(500).send({ error: err});
  }
});


module.exports = router;