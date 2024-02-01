const express = require('express');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
      const { username, phoneNumber, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ username, phoneNumber, email, password: hashedPassword });
      await user.save();
  
      const token = jwt.sign({ userId: user._id }, 'ohyeah');
      
      res.json({ success: true, message: 'Signup successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
 const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'ohyeah');
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
