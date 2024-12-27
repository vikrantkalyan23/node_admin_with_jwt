const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const admin = new User({ username: 'admin', password: 'admin123' });
        await admin.save();
        console.log('Admin user created');
        mongoose.connection.close();
    })
    .catch((err) => console.log(err));
