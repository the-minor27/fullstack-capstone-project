const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);

let db;

const connectToDatabase = async () => {
    try {
        await client.connect();
        db = client.db('giftlink');
        console.log('MongoDB connected successfully');
        return db;
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        throw error;
    }
};

const getDatabase = () => {
    if (!db) {
        throw new Error('Database is not connected');
    }

    return db;
};

module.exports = {
    connectToDatabase,
    getDatabase
};