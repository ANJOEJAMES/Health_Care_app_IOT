# Health Care IoT Dashboard

A real-time health monitoring system with secure role-based access for patients and doctors. Features live data visualization, intelligent alerts, and historical trend analysis.

![Dark Mode Dashboard](https://img.shields.io/badge/UI-Dark%20Mode-blue)
![Real--time](https://img.shields.io/badge/Updates-Real--time-green)
![Status](https://img.shields.io/badge/Status-Active-success)
![Auth](https://img.shields.io/badge/Auth-JWT%20Secured-orange)

## 🌟 Features

### 🔐 Multi-Role Authentication
- **Doctor Portal**: Monitor multiple patients, view live dashboards
- **Patient Portal**: Secure access to personal health data
- **Protected Routes**: JWT-based session security

### 📊 Real-Time Monitoring
- **4 Health Metrics**: Temperature, Heart Rate, SpO2, Blood Pressure
- **Live Updates**: 3-second auto-refresh via Socket.io
- **Interactive Charts**: 7 time ranges (10min to 24hr)

### ⚠️ Intelligent Warnings
- **Color-Coded Alerts**: Green (normal), Yellow (warning), Red (danger)
- **Custom Thresholds**: Configurable for each metric

### 🌙 Modern UI
- **Dark Mode**: Sleek glassmorphism design
- **Responsive**: Works on desktop and mobile

## 🚀 Quick Start

### 1. Credentials
| Role | Username | Password |
|------|----------|----------|
| **Doctor** | `doctor` | `1234` |
| **User 1** | `user1` | `12345678` |
| **User 2** | `user2` | `12345678` |

### 2. Setup
```bash
# Clone
git clone https://github.com/ANJOEJAMES/Health_Care_app_IOT.git

# Server
cd server
cp .env.example .env  # Add your creds
npm install
npm run dev

# Client
cd client
cp .env.example .env
npm install
npm run dev
```

## 🏗️ Architecture

```
ESP32 → HiveMQ Cloud → Node.js (Auth/Data) → MongoDB Atlas
                                    ↓
                            React Dashboard (Patient/Doctor Views)
```

## 📁 Project Structure

```
Project_EC/
├── server/                 # Node.js Backend
│   ├── models/            # User, Doctor, Data schemas
│   ├── routes/            # Auth & Data APIs
│   ├── utils/             # Database seeders
│   └── mqtt/              # MQTT client
└── client/                # React Frontend
    ├── src/
    │   ├── context/       # Auth State
    │   ├── pages/         # Login, DoctorDashboard
    │   └── components/    # Reusable Dashboard
```

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Recharts, Vite
- **Backend**: Express, Socket.io, JWT, Mongoose, MQTT.js
- **Database**: MongoDB Atlas
- **IoT**: ESP32, HiveMQ Cloud

## 📝 License

This project is licensed under the MIT License.
