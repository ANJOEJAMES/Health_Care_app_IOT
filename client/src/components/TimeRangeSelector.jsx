import PropTypes from 'prop-types';
import { TIME_RANGES } from '../constants/config';

const TimeRangeSelector = ({ selectedRange, onRangeChange }) => {
    return (
        <div style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
            <h3 style={{ margin: '0 0 16px', color: 'var(--text-primary)' }}>📊 Time Range</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {TIME_RANGES.map(range => (
                    <button
                        key={range.value}
                        onClick={() => onRangeChange(range.value)}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            background: selectedRange === range.value
                                ? 'linear-gradient(90deg, #4361ee, #06ffa5)'
                                : 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontSize: '1em',
                            transition: 'all 0.3s ease',
                            boxShadow: selectedRange === range.value
                                ? '0 4px 12px rgba(67, 97, 238, 0.4)'
                                : 'none'
                        }}
                    >
                        {range.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

TimeRangeSelector.propTypes = {
    selectedRange: PropTypes.string.isRequired,
    onRangeChange: PropTypes.func.isRequired
};

export default TimeRangeSelector;
