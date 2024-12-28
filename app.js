const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/auth'); 

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.set('view engine', 'ejs');

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Routes
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/admin`);
});
