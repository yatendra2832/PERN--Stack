const express = require('express');
const router = express.Router();
const { checkRestaurantExists } = require('../middleware/validateRestaurant')

const pool = require('../db/index')

router.get('/', async (req, res) => {
    try {
        // const results = await pool.query('SELECT * FROM restaurants');
        const results = await pool.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id ')
        res.status(200).send(results.rows);
    } catch (error) {
        console.error('Error retrieving restaurants:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }

})

router.get('/:id', checkRestaurantExists, async (req, res) => {
    try {
        const { id } = req.params;
        const restaurantResult = await pool.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id  WHERE id = $1', [id])
        const reviewsResult = await pool.query('SELECT * FROM reviews WHERE restaurant_id = $1', [id])

        const restaurant = restaurantResult.rows[0];
        const reviews = reviewsResult.rows;

        // Combine restaurant and reviews into a single object
        const data = { restaurant, reviews };

        res.status(200).json(data);
    } catch (error) {
        console.error('Error retrieving restaurant and reviews:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }

})

router.post('/', async (req, res) => {
    try {
        const { name, location, price_range } = req.body;
        const addRestaurant = await pool.query('INSERT INTO restaurants (name,location,price_range) VALUES ($1 ,$2, $3) RETURNING *', [name, location, price_range])
        res.status(200).json({ message: 'Restaurant added successfully', data: addRestaurant.rows[0] });
    } catch (error) {
        console.error('Error adding restaurant:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }


})

router.put('/:id', checkRestaurantExists, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, price_range } = req.body;
        const updateRestaurant = await pool.query('UPDATE restaurants SET name = $1 ,location = $2 ,price_range = $3 WHERE id = $4 ', [name, location, price_range, id])
        res.status(200).send('Restaurant Updated Successfully .');
    } catch (error) {
        console.error('Error updating restaurant:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }

})

router.delete('/:id', checkRestaurantExists, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query('DELETE FROM restaurants WHERE id = $1', [id])
        res.status(200).send('Restaurant deleted Successfully ');
    } catch (error) {
        console.error('Error deleting restaurant:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }

})

router.post('/:id/addReview', async (req, res) => {
    try {
        const { id } = req.params
        const { name, review, rating } = req.body;
        const addReview = await pool.query('INSERT INTO reviews (restaurant_id,name,review,rating) VALUES ($1,$2,$3,$4) RETURNING *', [id, name, review, rating])
        res.status(201).send(addReview.rows[0]);
    } catch (error) {
        console.error('Error adding review:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;