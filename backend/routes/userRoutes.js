const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Registration route
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Validate the user's credentials
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a token using the user's method
        const token = await user.generateToken();

        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Profile retrieval route
router.get('/profile', async (req, res) => {
    try {
        const userId = req.user._id; // Assuming `req.user` is available with user data
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            email: user.email,
            profilePhoto: user.profilePhoto,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Profile photo upload route
router.post('/upload-photo', async (req, res) => {
    // Implement the functionality to upload and save profile photo
});

module.exports = router;
