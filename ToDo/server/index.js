const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')

// middlewares
app.use(express.json())
app.use(cors());

// Routes 
//Create a Todo
app.post('/todo', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *", [description]);

        res.status(200).send(newTodo.rows[0])

        // console.log(req.body);

    } catch (error) {
        console.log(error.message)
    }
})

// Get all Todo
app.get('/todo', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.status(200).send(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})
// Get a Todo
app.get('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT*FROM todo WHERE todo_id = $1", [id]);
        res.status(200).send(todo.rows)
    } catch (error) {
        console.log(error.message);
    }
})

// Update Todo
app.put('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const todo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.status(200).send('todo updated Successfully');
    } catch (error) {
        console.log(error.message);
    }

})
// Delete Todo
app.delete('/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.status(200).send('Todo Deleted Successfully');
    } catch (error) {
        console.log(error.message);
    }

})


const port = 3000;
try {
    app.listen(port, () => {
        console.log(`Server is Listening at port ${port}`)
    })
} catch (error) {
    console.log(`Error in Connecting to Server`, error);
}
