const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');

app.use(express.json());

//import all routes
const product= require('./routes/product');
const UserAuth= require('./routes/userAuth');

app.use('/api/v1', product);
app.use('/api/v1', UserAuth);

//Middleware to handle error
app.use(errorMiddleware);

module.exports = app;