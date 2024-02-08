const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Attendance = mongoose.model('Attendance');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === 'Bearer laksjdflaksdjasdfklj'

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  const attendanceToken = authorization.replace('Bearer ', '');
  jwt.verify(attendanceToken, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }

    next();
  });
};
