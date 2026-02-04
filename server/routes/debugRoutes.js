const express = require('express');
const router = express.Router();
const DataModel = require('../models/DataModel');

// DEBUG: Check all data in database
router.get('/all', async (req, res) => {
    try {
        const allData = await DataModel.find().sort({ timestamp: -1 }).limit(10);
        const count = await DataModel.countDocuments();

        const response = {
            totalRecords: count,
            latestRecords: allData.map(d => ({
                userId: d.userId,
                timestamp: d.timestamp,
                age: `${Math.floor((Date.now() - new Date(d.timestamp)) / (1000 * 60 * 60))} hours ago`,
                temperature: d.temperature,
                heartRate: d.heartRate
            }))
        };

        console.log('Debug info:', response);
        res.json(response);
    } catch (error) {
        console.error('Debug error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
