const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connectToDatabase, getDatabase } = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email and password are required'
            });
        }

        await connectToDatabase();

        const db = getDatabase();
        const users = db.collection('users');

        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await users.insertOne({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({
            message: 'Registration failed',
            error: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        await connectToDatabase();

        const db = getDatabase();

        const user = await db.collection('users').findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET || 'giftlink-secret',
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Login failed',
            error: error.message
        });
    }
});

router.put('/profile/:id', async (req, res) => {
    try {
        const { name, email } = req.body;

        await connectToDatabase();

        const db = getDatabase();

        const currentUser = await db.collection('users').findOne({
            _id: new (require('mongodb').ObjectId)(req.params.id)
        });

        if (!currentUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        await db.collection('users').updateOne(
            { _id: currentUser._id },
            {
                $set: {
                    name,
                    email,
                    updatedAt: new Date()
                }
            }
        );

        res.json({
            message: 'User information updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Update failed',
            error: error.message
        });
    }
});

module.exports = router;