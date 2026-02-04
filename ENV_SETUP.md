# Environment Variables Setup

## Server (.env)

Create `server/.env` file with:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://anjoejames36:anjoe9497james@soul.xl0zkqo.mongodb.net/Project_EC

# MQTT Broker Configuration
MQTT_BROKER_URL=mqtts://51c5de3e2aaf48afaa552713ded6e06d.s1.eu.hivemq.cloud:8883
MQTT_USERNAME=esp32_device
MQTT_PASSWORD=@Anjoe9497James
MQTT_TOPIC=esp32/health/data
MQTT_PORT=8883

# Server Configuration
PORT=3001
NODE_ENV=development
```

**Important:** Add `.env` to `.gitignore` to avoid committing sensitive credentials!

## Client (.env)

Create `client/.env` file with:

```env
# API Configuration
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001

# User Configuration
VITE_USER_ID=user1
VITE_USER_NAME=User 1
```

**Note:** Vite requires environment variables to be prefixed with `VITE_` to be exposed to the client code.

## Usage

Environment variables are automatically loaded:
- **Server**: Uses `dotenv` package (loaded in index.js)
- **Client**: Vite automatically loads `.env` files

Access them in code:
- **Server**: `process.env.MONGO_URI`
- **Client**: `import.meta.env.VITE_API_URL`
