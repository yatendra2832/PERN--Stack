const express = require('express');
const app = express();
const cors = require('cors');
const todoRouter = require('./Routes/todo')

// middlewares
app.use(express.json())
app.use(cors());
app.use('/todo', todoRouter);

const port = 3000;
try {
    app.listen(port, () => {
        console.log(`Server is Listening at port ${port}`)
    })
} catch (error) {
    console.log(`Error in Connecting to Server`, error);
}
