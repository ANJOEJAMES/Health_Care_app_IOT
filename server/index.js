require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDatabase = require('./config/database');
const DataModel = require('./models/DataModel');
const dataRoutes = require('./routes/dataRoutes');
const debugRoutes = require('./routes/debugRoutes');
const { setupMQTT } = require('./mqtt/mqttClient');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Connect to MongoDB
connectDatabase();

// Mount routes
app.use('/api/data', dataRoutes);
app.use('/api/debug', debugRoutes);

// Setup MQTT
setupMQTT(io);

// Socket.io connection handler
io.on('connection', async (socket) => {
    console.log('A user connected via Socket.io');

    // Send last 50 records on connection (for initial load)
    try {
        const historicalData = await DataModel.find().sort({ timestamp: -1 }).limit(50);
        socket.emit('initial-data', historicalData);
    } catch (err) {
        console.error('Error fetching history:', err);
    }

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
