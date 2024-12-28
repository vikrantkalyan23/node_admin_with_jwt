const express = require('express');
const { loginPage, login, dashboard, logout } = require('../controllers/adminController');
const { isAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', loginPage);
router.post('/login', login);
router.get('/dashboard', isAuthenticated, dashboard);
router.get('/logout', logout);


router.get('/register', (req, res) => {
    res.render('register');
});

// Handle Registration Submission
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('register', { errorMessage: 'Email already registered!' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.redirect('/login'); // Redirect to login page after successful registration
    } catch (error) {
        console.error(error);
        res.render('register', { errorMessage: 'Something went wrong. Please try again.' });
    }
});

router.get('/news', (req, res) => {
    res.render('news');
});

// Render Add News Page
router.get('/news/add', (req, res) => {
    res.send('Add News Page'); // Replace with the actual page rendering
});

// Render Edit News Page
router.get('/news/edit/:id', (req, res) => {
    const newsId = req.params.id;
    res.send(`Edit News Page for ID: ${newsId}`); // Replace with the actual page rendering
});

// Render User List Page
router.get('/users', (req, res) => {
    res.render('users');
});

// Render Add User Page
router.get('/users/add', (req, res) => {
    res.send('Add User Page'); // Replace with the actual page rendering
});

// Render Edit User Page
router.get('/users/edit/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Edit User Page for ID: ${userId}`); // Replace with the actual page rendering
});


module.exports = router;
