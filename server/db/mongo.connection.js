require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.log(`Error occured while connecting: ${err}`));
