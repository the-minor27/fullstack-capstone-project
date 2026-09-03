const express = require('express');
const cors = require('cors');

const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'GiftLink API is running'
    });
});

app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);

module.exports = app;