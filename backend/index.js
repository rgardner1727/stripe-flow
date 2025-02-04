require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const stripeRouter = require('./routes/stripeRouter');
const webhookRouter = require('./routes/webhookRouter');

app.use(cors());
app.use('/auth', authRouter);
app.use('/stripe', stripeRouter);
app.use('/webhook', webhookRouter);

mongoose.connect(process.env.MONGO_DB_URL)
    .then(console.log('Connected to Mongo DB'))
    .catch(error => console.log(error));

app.listen(process.env.SERVER_PORT, () => console.log(`Server is running on port ${process.env.SERVER_PORT}`));