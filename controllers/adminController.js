const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('All fields are required');
    }

    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.cookie('token', token, { httpOnly: true });
        return res.redirect('/admin/dashboard');
    }

    res.status(401).send('Invalid username or password');
};

exports.dashboard = (req, res) => {
    res.render('dashboard');
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin');
};
