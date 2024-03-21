const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Attendance = mongoose.model('Attendance');

const router = express.Router();

router.get('/attendance', async (req, res) => {
    const details = await Attendance.find();
    res.send(details);
});

router.post('/attendance', async (req, res) => {
    const {
      perscode,
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
      perscode,
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
  const { perscode, date, time_out } = req.body; 

  try{
    const updateAttendance = await Attendance.findOneAndUpdate(
      { perscode, date },
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

  router.put('/delete_attendance', async (req, res) => {
    const { perscode } = req.body;

      const deleteAttendance = await Attendance.deleteMany(
        { perscode }
      )
    res.send(deleteAttendance);
  })

module.exports = router;