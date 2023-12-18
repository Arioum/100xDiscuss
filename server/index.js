require('dotenv').config();
require('./db/mongo.connection');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/endpoints');

const app = express();
const port = process.env.PROD_URL || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);

app.listen(port, () => console.log(`Port: ${port}`));
