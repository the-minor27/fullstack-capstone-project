const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDatabase, getDatabase } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await connectToDatabase();

        const db = getDatabase();
        const gifts = await db.collection('gifts').find().toArray();

        res.json(gifts);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch gifts',
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        await connectToDatabase();

        const db = getDatabase();
        const gift = await db.collection('gifts').findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!gift) {
            return res.status(404).json({
                message: 'Gift not found'
            });
        }

        res.json(gift);
    } catch (error) {
        res.status(400).json({
            message: 'Invalid gift ID'
        });
    }
});

module.exports = router;