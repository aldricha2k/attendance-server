const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

router.post('/account', async (req, res) => {
  const { perscode } = req.body;
  const account = await User.findOne({ perscode });
  res.send(account);
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Invalid email.' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    const role = user.role;
    const perscode = user.perscode;
    const name = user.name;
    res.send({ token, role, perscode, name });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password.' });
  }
});

module.exports = router;
