const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const  cors = require('cors');
const userRoute = require('./routes/user');


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));app.use(cookieParser());

app.use(bodyParser.json());

app.use("/user", userRoute);

module.exports = app;
