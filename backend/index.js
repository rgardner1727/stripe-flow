require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SK_TEST);
const cors = require('cors');

app.use(cors());

const registerRouter = require('./routes/authRoutes/registerRoute');
const loginRouter = require('./routes/authRoutes/loginRoute');
const webhookRouter = require('./routes/stripeRoutes/webhookRoute');
const customerRouter = require('./routes/stripeRoutes/customerRoute');

mongoose.connect(process.env.MONGO_DB_URL)
    .then(console.log('Connected to Mongo DB'))
    .catch(error => console.log(error));

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/webhook', webhookRouter);
app.use('/customer', customerRouter);

app.get('/', (req, res) => {
    res.send('Backend server is working properly.');
})

app.listen(process.env.SERVER_PORT, () => console.log(`Server is running on port ${process.env.SERVER_PORT}`));