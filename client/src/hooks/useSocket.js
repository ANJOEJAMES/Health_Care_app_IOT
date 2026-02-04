import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { SOCKET_URL, USER_ID } from '../constants/config';

export const useSocket = (userId) => {
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const [latestData, setLatestData] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = io(SOCKET_URL);

        socket.on('connect', () => {
            console.log('Connected to backend');
            setConnectionStatus('Connected');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from backend');
            setConnectionStatus('Disconnected');
        });

        socket.on('initial-data', (data) => {
            console.log('Initial data:', data);
            // Filter data for the specific user we are viewing
            const filteredData = data.filter(item => item.userId === userId || (!item.userId && userId === 'user1'));
            setMessages(filteredData);
            if (filteredData.length > 0) {
                setLatestData(filteredData[0]);
            }
        });

        socket.on('mqtt-message', (data) => {
            console.log('Received:', data);
            // Only update state if message belongs to viewed user
            if (data.userId === userId || (!data.userId && userId === 'user1')) {
                setMessages((prev) => [data, ...prev].slice(0, 100));
                setLatestData(data);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return { connectionStatus, latestData, messages, setMessages };
};
