const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user');

const app = express();

const db_url = process.env.MONGO_DB;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};
mongoose.connect(db_url, options)
.then(() => console.log('MongoDB Connected successfully'));

app.use('/api', userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});