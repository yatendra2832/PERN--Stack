const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')

// middlewares
app.use(express.json())
app.use(cors());

// Routes 
//Create a Todo

// Get all Todo

// Get a Todo

// Update Todo

// Delete Todo



const port = 3000;
try {
    app.listen(port, () => {
        console.log(`Server is Listening at port ${port}`)
    })
}catch (error) {
    console.log(`Error in Connecting to Server`, error);
}
 