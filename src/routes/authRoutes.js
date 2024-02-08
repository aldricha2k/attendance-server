const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const {
    name,
    perscode,
    email,
    password,
    division,
    role
    } = req.body;

  try {
    const user = new User({
      name,
      perscode,
      email,
      password,
      division,
      role 
    });
    await user.save();

    const signinToken = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token: signinToken });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
router.get('/signin', async (req, res) => {
  const response = await User.find();

  res.send(response);
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  try {
    await user.comparePassword(password);
    const signinToken = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    const role = user.role;
    const _id = user._id;
    const name = user.name;
    res.send({ token: signinToken, role, _id, name });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;
