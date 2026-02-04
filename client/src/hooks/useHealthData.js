import { useEffect } from 'react';
import { API_URL, USER_ID } from '../constants/config';

export const useHealthData = (selectedRange, setMessages, userId) => {
    useEffect(() => {
        const fetchData = () => {
            console.log(`Fetching data for range: ${selectedRange}`);
            fetch(`${API_URL}/api/data/${userId}?timeRange=${selectedRange}`)
                .then(res => res.json())
                .then(data => {
                    console.log(`Received ${data.length} records for ${selectedRange}`, data);
                    setMessages(data);
                })
                .catch(err => console.error('Error fetching data:', err));
        };

        // Fetch immediately
        fetchData();

        // Set up auto-refresh interval (every 3 seconds)
        const intervalId = setInterval(fetchData, 3000);

        // Cleanup on unmount or when selectedRange changes
        return () => clearInterval(intervalId);
    }, [selectedRange, setMessages]);
};
