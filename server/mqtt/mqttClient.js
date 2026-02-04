const mqtt = require('mqtt');
const DataModel = require('../models/DataModel');

let mqttClient = null;

const setupMQTT = (io) => {
    const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL;
    const MQTT_TOPIC = process.env.MQTT_TOPIC || 'esp32/health/data';

    const MQTT_OPTIONS = {
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
        protocol: 'mqtts',
        port: parseInt(process.env.MQTT_PORT || '8883'),
        rejectUnauthorized: true
    };

    mqttClient = mqtt.connect(MQTT_BROKER_URL, MQTT_OPTIONS);

    mqttClient.on('connect', () => {
        console.log(`Connected to MQTT Broker: ${MQTT_BROKER_URL}`);
        mqttClient.subscribe(MQTT_TOPIC, (err) => {
            if (!err) {
                console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
            } else {
                console.error('Failed to subscribe:', err);
            }
        });
    });

    mqttClient.on('message', async (topic, message) => {
        try {
            const msgString = message.toString();
            console.log(`Received message: ${msgString}`);

            // Expecting JSON: {"temperature": 36.5, "heartRate": 70, "spo2": 97.0, "bloodPressure": 120, "userId": "user1"}
            const parsedData = JSON.parse(msgString);

            const newData = new DataModel({
                userId: parsedData.userId || 'user1',
                temperature: parsedData.temperature,
                heartRate: parsedData.heartRate,
                spo2: parsedData.spo2,
                bloodPressure: parsedData.bloodPressure || 120
            });

            const savedData = await newData.save();
            console.log('Saved to MongoDB:', savedData);

            // Broadcast to frontend via Socket.io
            io.emit('mqtt-message', savedData);

        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    mqttClient.on('error', (error) => {
        console.error('MQTT Error:', error);
    });

    return mqttClient;
};

module.exports = { setupMQTT };
