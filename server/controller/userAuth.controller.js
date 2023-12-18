require('dotenv').config();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const userSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
  });
  const inputValidation = userSchema.safeParse({ email, password });

  if (!inputValidation.success) {
    console.log('wrong input');
    res.status(400).json({ message: 'Invalid email input' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.email === email && user.password === password) {
      var token = jwt.sign({ email: email }, process.env.JWT_SECRET);
      return res.status(200).json({ token, message: 'Login success' });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(403).json({ message: 'Invalid credentials' });
  }
};

const requireAuthentication = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    console.log('Token is missing');
  } else {
    const tokenWithoutBearer = token.startsWith('Bearer ')
      ? token.slice(7)
      : token;

    try {
      const verify = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
      req.user = verify;
      next();
    } catch (err) {
      console.log('Invalid token');
    }
  }
};

const userVerify = async (req, res) => {
  res.status(200).json({ message: 'Token is valid', user: req.user.email });
};

module.exports = { userLogin, requireAuthentication, userVerify };
