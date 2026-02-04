/**
 * Format chart data with intelligent sampling and time formatting
 */
export const formatChartData = (messages, selectedRange) => {
    if (messages.length === 0) {
        console.log('No messages to format for chart');
        return [];
    }

    console.log(`Formatting ${messages.length} messages for chart`);

    // Determine sampling rate based on data size
    let sampleRate = 1;
    const dataPointsTarget = 100;

    if (messages.length > dataPointsTarget) {
        sampleRate = Math.ceil(messages.length / dataPointsTarget);
    }

    console.log(`Sample rate: ${sampleRate} (showing ~${Math.ceil(messages.length / sampleRate)} points)`);

    // Sample and format data
    const sampledData = messages.filter((_, index) => index % sampleRate === 0);

    const formatted = sampledData.map(msg => {
        const date = new Date(msg.timestamp);
        let timeLabel;

        // Format time based on selected range
        if (selectedRange === '10min' || selectedRange === '30min') {
            timeLabel = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        } else if (selectedRange === '1hr' || selectedRange === '4hr') {
            timeLabel = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else {
            timeLabel = date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        return {
            time: timeLabel,
            temperature: msg.temperature,
            heartRate: msg.heartRate,
            spo2: msg.spo2,
            bloodPressure: msg.bloodPressure
        };
    }).reverse();

    console.log('Chart data formatted:', formatted.slice(0, 3), '... (showing first 3)');
    return formatted;
};

/**
 * Determine warning status based on value and thresholds
 */
export const getWarningStatus = (value, metric, thresholds) => {
    if (!value || !thresholds[metric]) return 'normal';
    const { low, high } = thresholds[metric];
    if (value < low || value > high) return 'danger';
    if (value <= low + (high - low) * 0.1 || value >= high - (high - low) * 0.1) return 'warning';
    return 'success';
};

/**
 * Get color for status
 */
export const getStatusColor = (status) => {
    switch (status) {
        case 'success': return 'var(--success)';
        case 'warning': return 'var(--warning)';
        case 'danger': return 'var(--danger)';
        default: return 'var(--border-color)';
    }
};
