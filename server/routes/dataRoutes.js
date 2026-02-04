const express = require('express');
const router = express.Router();
const DataModel = require('../models/DataModel');
const { TIME_RANGES, WARNING_THRESHOLDS } = require('../config/constants');

// Get data by time range
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { timeRange } = req.query;

        console.log(`API Request - userId: ${userId}, timeRange: ${timeRange}`);

        if (!timeRange || !TIME_RANGES[timeRange]) {
            console.log(`Invalid time range: ${timeRange}`);
            return res.status(400).json({ error: 'Invalid time range' });
        }

        const startTime = new Date(Date.now() - TIME_RANGES[timeRange]);
        console.log(`Fetching data from ${startTime} to now`);

        // Query for matching userId OR records without userId (for backwards compatibility)
        const data = await DataModel.find({
            $or: [
                { userId: userId },
                { userId: { $exists: false } },
                { userId: null }
            ],
            timestamp: { $gte: startTime }
        }).sort({ timestamp: 1 });

        console.log(`Returned ${data.length} records for ${timeRange} range`);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get latest values
router.get('/:userId/latest', async (req, res) => {
    try {
        const { userId } = req.params;
        const latest = await DataModel.findOne({ userId }).sort({ timestamp: -1 });
        res.json(latest || {});
    } catch (error) {
        console.error('Error fetching latest:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get warning thresholds
router.get('/thresholds', (req, res) => {
    res.json(WARNING_THRESHOLDS);
});

// ONE-TIME MIGRATION: Update all records without userId to have default userId
router.post('/migrate/add-userid', async (req, res) => {
    try {
        const result = await DataModel.updateMany(
            { $or: [{ userId: { $exists: false } }, { userId: null }] },
            { $set: { userId: 'user1' } }
        );

        console.log(`Migration complete: Updated ${result.modifiedCount} records`);
        res.json({
            success: true,
            modifiedCount: result.modifiedCount,
            message: `Updated ${result.modifiedCount} records to have userId='user1'`
        });
    } catch (error) {
        console.error('Migration error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
