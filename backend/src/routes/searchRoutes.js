const express = require('express');
const { connectToDatabase, getDatabase } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { category } = req.query;

        await connectToDatabase();

        const db = getDatabase();

        const filter = category
            ? { category: { $regex: `^${category}$`, $options: 'i' } }
            : {};

        const gifts = await db.collection('gifts').find(filter).toArray();

        res.json(gifts);
    } catch (error) {
        res.status(500).json({
            message: 'Search failed',
            error: error.message
        });
    }
});

module.exports = router;