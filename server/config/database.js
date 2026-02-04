const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;

        if (!MONGO_URI) {
            throw new Error('MONGO_URI not defined in environment variables');
        }

        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDatabase;
