const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const expressValidator = require('express-validator');
require('dotenv').config();

const app = express();

const db_url = process.env.MONGO_DB;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};
mongoose.connect(db_url, options)
.then(() => console.log('MongoDB Connected successfully'));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use('/api', userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});