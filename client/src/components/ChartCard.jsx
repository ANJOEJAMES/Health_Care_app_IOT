import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartCard = ({ title, data, dataKey, color }) => {
    return (
        <div style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
            <h3 style={{ marginBottom: '20px', color }}>{title}</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                        dataKey="time"
                        stroke="var(--text-secondary)"
                        style={{ fontSize: '0.8em' }}
                    />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                        contentStyle={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            color: 'var(--text-primary)'
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        strokeWidth={3}
                        dot={{ fill: color }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

ChartCard.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    dataKey: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default ChartCard;
