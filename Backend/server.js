const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
// const editAPI = require('./src/api/edit.api');
const userAPI = require('./src/api/user.api');
const userTypeAPI = require('./src/api/usertype.api');
const reviewAPI = require('./src/api/reviewer.api');
const fileRoute = require('./src/controllers/research.controller')
const editRoute = require('./src/controllers/edit.controller')

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const PORT = process.env.PORT || 8085;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (error) => {
  if (error) {
    console.log('Database Error: ', error.message);
  }
});

mongoose.connection.once('open', () => {
  console.log('Database Synced');
});

// app.use('/edit', editAPI());
app.use('/user', userAPI());
app.use('/type', userTypeAPI());
app.use('/review', reviewAPI());
app.use('/file', fileRoute);
app.use('/edit', editRoute);

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});