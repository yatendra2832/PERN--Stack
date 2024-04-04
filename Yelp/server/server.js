require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const app = express();

const restaurantRouter = require('./Routes/restaurants');

// Middlewares
app.use(express.json())
app.use(morgan('dev'));

// Routes
app.use('/api/v1/restaurants', restaurantRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening at PORT ${port}`);

})