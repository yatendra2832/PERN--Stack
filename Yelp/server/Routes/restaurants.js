const express = require('express');
const router = express.Router();
const { checkRestaurantExists } = require('../middleware/validateRestaurant')

const pool = require('../db/index')

router.get('/', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM restaurants');
        res.status(200).send(results.rows);
    } catch (error) {
        console.log(error.message);
    }

})

router.get('/:id', checkRestaurantExists, async (req, res) => {
    try {
        const { id } = req.params;
        const results = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id])
        res.status(200).send(results.rows);
    } catch (error) {
        console.log(error.message);
    }

})

router.post('/', async (req, res) => {
    try {
        const { name, location, price_range } = req.body;
        const addRestaurant = await pool.query('INSERT INTO restaurants (name,location,price_range) VALUES ($1 ,$2, $3) RETURNING *', [name, location, price_range])
        res.status(200).json({ message: 'Restaurant added successfully', data: addRestaurant.rows[0] });
    } catch (error) {
        console.log(error.message);
    }


})

router.put('/:id', checkRestaurantExists, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, price_range } = req.body;
        const updateRestaurant = await pool.query('UPDATE restaurants SET name = $1 ,location = $2 ,price_range = $3 WHERE id = $4 ', [name, location, price_range, id])
        res.status(200).send('Restaurant Updated Successfully .');
    } catch (error) {
        console.log(error.message)
    }

})

router.delete('/:id', checkRestaurantExists, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query('DELETE FROM restaurants WHERE id = $1', [id])
        res.status(200).send('Restaurant deleted Successfully ');
    } catch (error) {
        console.log(error.message);
    }

})

module.exports = router;