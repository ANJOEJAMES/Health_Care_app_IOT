const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');
const DoctorModel = require('../models/DoctorModel');

const seedUsers = async () => {
    try {
        // Check if users exist
        const userCount = await UserModel.countDocuments();
        const doctorCount = await DoctorModel.countDocuments();

        if (userCount === 0) {
            console.log('Seeding default users...');
            const hashedPassword = await bcrypt.hash('12345678', 10);

            await UserModel.create([
                { userId: 'user1', password: hashedPassword, name: 'User 1' },
                { userId: 'user2', password: hashedPassword, name: 'User 2' }
            ]);
            console.log('Created user1 and user2');
        }

        if (doctorCount === 0) {
            console.log('Seeding default doctor...');
            const hashedPassword = await bcrypt.hash('1234', 10);

            await DoctorModel.create({
                username: 'doctor',
                password: hashedPassword,
                name: 'Dr. Smith'
            });
            console.log('Created doctor account');
        }
    } catch (error) {
        console.error('Seeding error:', error);
    }
};

module.exports = seedUsers;
