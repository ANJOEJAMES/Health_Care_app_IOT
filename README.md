# Health Care IoT Dashboard

A real-time health monitoring system that connects ESP32 sensors to a cloud-based dashboard with live data visualization, intelligent alerts, and historical data analysis.

![Dark Mode Dashboard](https://img.shields.io/badge/UI-Dark%20Mode-blue)
![Real--time](https://img.shields.io/badge/Updates-Real--time-green)
![Status](https://img.shields.io/badge/Status-Active-success)

## 🌟 Features

### 📊 Real-Time Monitoring
- **4 Health Metrics**: Temperature, Heart Rate, SpO2, Blood Pressure
- **Live Updates**: 3-second auto-refresh
- **WebSocket Connection**: Instant data streaming via Socket.io

### 📈 Interactive Charts
- **7 Time Ranges**: 10min, 30min, 1hr, 4hr, 8hr, 12hr, 24hr
- **Smart Data Sampling**: Optimized for large datasets
- **Responsive Design**: Works on all screen sizes

### ⚠️ Intelligent Warnings
- **Color-Coded Alerts**: Green (normal), Yellow (warning), Red (danger)
- **Custom Thresholds**: Configurable for each metric
- **Visual Indicators**: Border colors and alert badges

### 🌙 Modern UI
- **Dark Mode**: Sleek glassmorphism design
- **Gradient Effects**: Premium visual aesthetics
- **Smooth Animations**: Enhanced user experience

## 🏗️ Architecture

```
ESP32 Sensors → HiveMQ Cloud (MQTT) → Node.js Backend → MongoDB Atlas → React Dashboard
```

## 📁 Project Structure

```
Project_EC/
├── server/                 # Node.js Backend
│   ├── config/            # Configuration files
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── mqtt/              # MQTT client
│   ├── .env               # Environment variables (not committed)
│   └── index.js           # Entry point
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Helper functions
│   │   ├── constants/    # Configuration
│   │   └── App.jsx       # Main component
│   └── .env              # Client config (not committed)
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- HiveMQ Cloud broker
- ESP32 with health sensors

### 1. Clone Repository
```bash
git clone https://github.com/ANJOEJAMES/Health_Care_app_IOT.git
cd Health_Care_app_IOT
```

### 2. Server Setup
```bash
cd server
npm install

# Create .env file (see ENV_SETUP.md)
npm run dev
```

### 3. Client Setup
```bash
cd client
npm install
npm run dev
```

### 4. Configure ESP32
Update your ESP32 code to publish to:
- **Topic**: `esp32/health/data`
- **Payload**: `{"temperature": 36.5, "heartRate": 70, "spo2": 97, "bloodPressure": 120, "userId": "user1"}`

## 🔐 Environment Variables

### Server `.env`
```env
MONGO_URI=your_mongodb_connection_string
MQTT_BROKER_URL=your_hivemq_broker_url
MQTT_USERNAME=your_mqtt_username
MQTT_PASSWORD=your_mqtt_password
PORT=3001
```

### Client `.env`
```env
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
VITE_USER_ID=user1
VITE_USER_NAME=User 1
```

## 🛠️ Tech Stack

### Backend
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **MQTT.js** - MQTT client
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment management

### Frontend
- **React 18** - UI framework
- **Recharts** - Data visualization
- **Socket.io-client** - WebSocket client
- **Vite** - Build tool

### Infrastructure
- **MongoDB Atlas** - Cloud database
- **HiveMQ Cloud** - MQTT broker
- **ESP32** - IoT device

## 📊 API Endpoints

### Health Data
- `GET /api/data/:userId?timeRange=1hr` - Get time-based data
- `GET /api/data/:userId/latest` - Get latest values
- `GET /api/thresholds` - Get warning thresholds

### Debug
- `GET /api/debug/all` - Database inspection
- `POST /api/migrate/add-userid` - Data migration

## 🎨 Design Features

- **Glassmorphism Cards** with colored accent borders
- **Gradient Header** with live status indicator
- **Responsive Grid Layouts**
- **Custom Dark Theme** with CSS variables
- **Smooth Transitions** on all interactions
- **Professional Color Palette**

## 📈 Health Metrics

| Metric | Normal Range | Unit |
|--------|--------------|------|
| Temperature | 36 - 37.5 | °C |
| Heart Rate | 60 - 100 | bpm |
| SpO2 | 95 - 100 | % |
| Blood Pressure | 90 - 140 | mmHg |

## 🔧 Development

### Code Organization
- **Modular Components**: Each component has single responsibility
- **Custom Hooks**: Reusable logic (useSocket, useHealthData)
- **Utility Functions**: Shared formatters and helpers
- **Environment Config**: Centralized configuration

### Code Quality
- **78% reduction** in client code (450+ → 100 lines)
- **75% reduction** in server code (210 → 53 lines)
- **PropTypes** validation for all components
- **Comprehensive error handling**

## 📝 Scripts

### Server
```bash
npm run dev    # Development (nodemon)
npm start      # Production
```

### Client
```bash
npm run dev    # Development server
npm run build  # Production build
```

## 🔒 Security

- **Environment Variables**: Sensitive data in .env files
- **Git Protection**: .gitignore prevents credential leaks
- **TTL Index**: Automatic data cleanup after 7 days
- **CORS**: Configured for secure communication

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Anjoe James**
- GitHub: [@ANJOEJAMES](https://github.com/ANJOEJAMES)

## 🙏 Acknowledgments

- Built with modern web technologies for real-time IoT monitoring
- Dark mode design inspired by modern healthcare dashboards
- Powered by HiveMQ Cloud and MongoDB Atlas

---

⭐ **Star this repository if you find it helpful!**
