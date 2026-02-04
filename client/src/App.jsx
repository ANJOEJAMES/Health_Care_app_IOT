import { useState, useEffect } from 'react';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import TimeRangeSelector from './components/TimeRangeSelector';
import ChartCard from './components/ChartCard';
import DataTable from './components/DataTable';
import { useSocket } from './hooks/useSocket';
import { useHealthData } from './hooks/useHealthData';
import { formatChartData } from './utils/formatters';
import { USER_NAME, METRICS, API_URL } from './constants/config';
import './index.css';

function App() {
    const [selectedRange, setSelectedRange] = useState('1hr');
    const [thresholds, setThresholds] = useState({
        temperature: { low: 36, high: 37.5 },
        heartRate: { low: 60, high: 100 },
        spo2: { low: 95, high: 100 },
        bloodPressure: { low: 90, high: 140 }
    });

    const { connectionStatus, latestData, messages, setMessages } = useSocket();
    useHealthData(selectedRange, setMessages);

    // Fetch thresholds
    useEffect(() => {
        fetch(`${API_URL}/api/thresholds`)
            .then(res => res.json())
            .then(data => setThresholds(data))
            .catch(err => console.error('Error fetching thresholds:', err));
    }, []);

    const chartData = formatChartData(messages, selectedRange);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)',
            padding: '20px'
        }}>
            <Header userName={USER_NAME} connectionStatus={connectionStatus} />

            {/* Metric Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
            }}>
                {Object.entries(METRICS).map(([key, config]) => (
                    <MetricCard
                        key={key}
                        title={config.title}
                        value={latestData?.[key]}
                        unit={config.unit}
                        emoji={config.emoji}
                        accentColor={config.color}
                        metric={key}
                        thresholds={thresholds}
                    />
                ))}
            </div>

            <TimeRangeSelector
                selectedRange={selectedRange}
                onRangeChange={setSelectedRange}
            />

            {/* Charts */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
            }}>
                <ChartCard
                    title="🌡️ Temperature Trend"
                    data={chartData}
                    dataKey="temperature"
                    color="var(--accent-temperature)"
                />
                <ChartCard
                    title="❤️ Heart Rate Trend"
                    data={chartData}
                    dataKey="heartRate"
                    color="var(--accent-heart)"
                />
                <ChartCard
                    title="💧 SpO2 Trend"
                    data={chartData}
                    dataKey="spo2"
                    color="var(--accent-spo2)"
                />
                <ChartCard
                    title="🩺 Blood Pressure Trend"
                    data={chartData}
                    dataKey="bloodPressure"
                    color="var(--accent-bp)"
                />
            </div>

            <DataTable messages={messages} />
        </div>
    );
}

export default App;
