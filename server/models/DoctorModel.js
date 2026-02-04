const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'doctor' }
});

const DoctorModel = mongoose.model('Doctor', DoctorSchema, 'doctor');
module.exports = DoctorModel;
