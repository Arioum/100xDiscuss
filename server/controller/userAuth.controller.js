require('dotenv').config();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const userSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
  });
  const inputValidation = userSchema.safeParse({ username, password });

  if (!inputValidation.success) {
    console.log('wrong input');
    res.status(402).json({ message: 'input error' });
  } else {
    console.log('correct input');
  }

  try {
    const user = await User.find({ username });
    if (user.username === username) {
      var token = jwt.sign({ username: username }, process.env.JWT_SECRET);
      return res.status(200).json({ token, message: 'success' });
    }
  } catch (error) {
    res.status(403).json({ message: 'User login failed' });
  }
};

module.exports = { userLogin };
