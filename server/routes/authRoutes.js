const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const DoctorModel = require('../models/DoctorModel');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_123';

// Login Endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Check Doctor Collection
        const doctor = await DoctorModel.findOne({ username });
        if (doctor) {
            const isMatch = await bcrypt.compare(password, doctor.password);
            if (isMatch) {
                const token = jwt.sign(
                    { id: doctor._id, role: 'doctor', name: doctor.name },
                    JWT_SECRET,
                    { expiresIn: '24h' }
                );
                return res.json({
                    token,
                    user: {
                        id: doctor._id,
                        username: doctor.username,
                        name: doctor.name,
                        role: 'doctor'
                    }
                });
            }
        }

        // 2. Check User Collection
        const user = await UserModel.findOne({ userId: username });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign(
                    { id: user._id, role: 'user', userId: user.userId, name: user.name },
                    JWT_SECRET,
                    { expiresIn: '24h' }
                );
                return res.json({
                    token,
                    user: {
                        id: user._id,
                        userId: user.userId,
                        name: user.name,
                        role: 'user'
                    }
                });
            }
        }

        // 3. Auth Failed
        return res.status(401).json({ error: 'Invalid credentials' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Verify Token Endpoint
router.get('/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ valid: false });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ valid: false });
        res.json({ valid: true, user: decoded });
    });
});

module.exports = router;
