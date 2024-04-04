const express = require('express');
const pool = require('../db/index')
const checkRestaurantExists = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const results = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
      if (results.rows.length === 0) {
        return res.status(404).send('Restaurant not found with the given id');
      }
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error'); 
    }
  };

  module.exports = {checkRestaurantExists}