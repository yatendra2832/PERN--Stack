const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send("Restaurants are fetching ...");
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    res.status(200).send(`Restaurant with the given id ${id} are fetching ... `);
})

router.post('/', (req, res) => {
    console.log('Creating Restaurants...')
    res.status(200).send(`Restaurant are adding ... `);

})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Updating the restaurant with the given id ${id}`);
    res.status(200).send('Restaurant are updating ...');
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log(`Deleting the Restaurants with the given id ${id}`);
    res.status(200).send('Restaurant are deleting ...');
})

module.exports = router;