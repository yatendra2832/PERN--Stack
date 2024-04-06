require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const restaurantRouter = require('./Routes/restaurants');

const corsOptions = {
    origin: "http://localhost:5173",
    mehtods: "GET,POST,DELETE,PUT,PATCH,HEAD",
    creadentials: true
}
// Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('dev'));

// Routes
app.use('/api/v1/restaurants', restaurantRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening at PORT ${port}`);

})