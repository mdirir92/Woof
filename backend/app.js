require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.miqgmmq.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('MongoDB connected'))
    .catch((err)=>console.error(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var indexRouter = require('./routes/index');
var dogsRouter = require('./routes/dogs');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dogs', dogsRouter);

module.exports = app;
