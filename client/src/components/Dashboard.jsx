import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import MetricCard from './MetricCard';
import TimeRangeSelector from './TimeRangeSelector';
import ChartCard from './ChartCard';
import DataTable from './DataTable';
import { useSocket } from '../hooks/useSocket';
import { useHealthData } from '../hooks/useHealthData';
import { formatChartData } from '../utils/formatters';
import { METRICS, API_URL } from '../constants/config';
import { QRCodeCanvas } from 'qrcode.react';
import '../index.css';

const Dashboard = ({ viewingUserId, userName, onBack }) => {
    const [selectedRange, setSelectedRange] = useState('1hr');
    const [thresholds, setThresholds] = useState({
        temperature: { low: 36, high: 37.5 },
        heartRate: { low: 60, high: 100 },
        spo2: { low: 95, high: 100 },
        bloodPressure: { low: 90, high: 140 }
    });

    const { connectionStatus, latestData, messages, setMessages } = useSocket(viewingUserId);
    useHealthData(selectedRange, setMessages, viewingUserId);

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
            <Header userName={userName} connectionStatus={connectionStatus} onBack={onBack} />

            {/* Top Grid: Metrics and QR Code */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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

                {/* QR Code Card - Now on the right */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '12px',
                        borderRadius: '12px',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <QRCodeCanvas value={viewingUserId} size={120} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ margin: 0, color: 'var(--success)', fontSize: '1.1em' }}>Patient ID Code</h3>
                        <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '0.9em' }}>Scan for mobile access</p>
                    </div>
                </div>
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
                    title="🌡️ Temperature"
                    data={chartData}
                    dataKey="temperature"
                    color="var(--accent-temperature)"
                />
                <ChartCard
                    title="❤️ Heart Rate"
                    data={chartData}
                    dataKey="heartRate"
                    color="var(--accent-heart)"
                />
                <ChartCard
                    title="💧 SpO2"
                    data={chartData}
                    dataKey="spo2"
                    color="var(--accent-spo2)"
                />
                <ChartCard
                    title="🩺 Blood Pressure"
                    data={chartData}
                    dataKey="bloodPressure"
                    color="var(--accent-bp)"
                />
            </div>

            <DataTable messages={messages} />
        </div>
    );
};

Dashboard.propTypes = {
    viewingUserId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired
};

export default Dashboard;
