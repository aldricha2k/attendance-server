const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

const router = express.Router();

router.post('/account', async (req, res) => {
  const { perscode } = req.body;
  const account = await User.findOne({ perscode });
  res.send(account);
});

router.post('/account_list', async (req, res) => {
  const account = await User.find();
  res.send(account);
});

router.post('/createaccount', async (req, res) => {
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

    const accountRole = user.role;
    const accountPerscode = user.perscode;
    const accountName = user.name;
    res.send({ role: accountRole, perscode: accountPerscode, name: accountName });
  } catch (err) {
    return res.status(422).send(err.message);
  }
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
    const perscode = user.perscode;
    const account = await User.findOne({ perscode });
    res.send({ 
      token, 
      name: account.name,
      perscode,
      email: account.email,
      division: account.division,
      role: account.role,
      balance: account.balance,
      installment: account.installment,
      payment: account.payment
    });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password.' });
  }
});

router.patch('/update_account', async (req, res) => {
  const {
    name,
    perscode,
    email,
    password,
    division,
    role
  } = req.body;

  try{
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateUser = await User.findOneAndUpdate(
      { perscode },
      { 
        name,
        perscode,
        password: hashedPassword,
        email,
        password,
        division,
        role 
      }
    )
    res.send(updateUser);
  }
  catch(err){
      res.status(500).send({ error: err});
  }
}),

router.patch('/delete_account', async (req, res) => {
  const { perscode, password } = req.body;

  try{
      const checkUser = await User.findOne({ perscode })
      console.log(checkUser);
      console.log(password);
    }
  catch(err){
      res.status(500).send({ error: err});
  }
}),

router.patch('/account', async (req, res) => {
  const { perscode, balance, payment, installment } = req.body;

  try{
      const updateUser = await User.findOneAndUpdate(
          { perscode },
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
  const { perscode, balance } = req.body;

  try{
      const updateUser = await User.findOneAndUpdate(
          { perscode },
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
