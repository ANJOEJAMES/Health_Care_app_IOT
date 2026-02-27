// Configuration constants
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://192.168.1.3:5000';
export const API_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.3:5000';
export const USER_ID = import.meta.env.VITE_USER_ID || 'user1';
export const USER_NAME = import.meta.env.VITE_USER_NAME || 'User 1';

// Time range options
export const TIME_RANGES = [
    { value: '10min', label: '10 Min' },
    { value: '30min', label: '30 Min' },
    { value: '1hr', label: '1 Hour' },
    { value: '4hr', label: '4 Hours' },
    { value: '8hr', label: '8 Hours' },
    { value: '12hr', label: '12 Hours' },
    { value: '24hr', label: '24 Hours' }
];

// Metric configurations
export const METRICS = {
    temperature: {
        title: 'Body Temperature',
        unit: '°C',
        emoji: '🌡️',
        color: 'var(--accent-temperature)'
    },
    heartRate: {
        title: 'Heart Rate',
        unit: 'bpm',
        emoji: '❤️',
        color: 'var(--accent-heart)'
    },
    spo2: {
        title: 'SpO2 Level',
        unit: '%',
        emoji: '💧',
        color: 'var(--accent-spo2)'
    },
    bloodPressure: {
        title: 'Blood Pressure',
        unit: 'mmHg',
        emoji: '🩺',
        color: 'var(--accent-bp)'
    }
};
