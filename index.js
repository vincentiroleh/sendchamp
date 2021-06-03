const express = require('express');
const logger = require('morgan');
const helmet = require("helmet");
const cors = require('cors');
const crypto = require("crypto");

const sendSms = require('./sendchamp');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'))

const userDatabase = [];

// Create user endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Hola, testing sendchamp API'
    })
});

app.post('/users', (req, res) => {
    const { email, password, phone } = req.body;
    const user = {
        email,
        password,
        phone
    };

    const n = crypto.randomInt(0, 1000000);
    const verificationCode = n.toString().padStart(6, "0");

    userDatabase.push(user);
    const data = {
        to: user.phone,
        message: `Welcome to Chere! Your verification code is ${verificationCode} `,
        sender_name: 'Iroleh'
    }

    sendSms(data)

    res.status(201).send({
        message: 'Account created successfully, kindly check your phone to activate your account!',
        data: user
    })
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;