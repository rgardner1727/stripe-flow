require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const registerRouter = require('./routes/authRoutes/registerRoute');
const loginRouter = require('./routes/authRoutes/loginRoute');
const webhookRouter = require('./routes/stripeRoutes/webhookRoute');
const createSubscriptionRouter = require('./routes/stripeRoutes/createSubscription');
const pricesRouter = require('./routes/stripeRoutes/pricesRoute');
const retrieveSubscriptionRouter = require('./routes/stripeRoutes/retrieveSubscription');

mongoose.connect(process.env.MONGO_DB_URL)
    .then(console.log('Connected to Mongo DB'))
    .catch(error => console.log(error));

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/webhook', webhookRouter);
app.use('/create-subscription', createSubscriptionRouter);
app.use('/prices', pricesRouter);
app.use('/retrieve-subscription', retrieveSubscriptionRouter);

app.get('/', (req, res) => {
    res.send('Backend server is working properly.');
})

app.listen(process.env.SERVER_PORT, () => console.log(`Server is running on port ${process.env.SERVER_PORT}`));