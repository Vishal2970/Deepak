const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const multer = require('multer');
const jwt = require('jsonwebtoken');

// Setup multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        // Use a unique filename (timestamp + original file name)
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Registration route
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });

        // Save the user
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

        // Generate a token using the user's method (assuming generateToken() is defined in the User model)
        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Middleware for authentication using the token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Profile retrieval route
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Use the ID from the decoded token
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            email: user.email,
            profilePhoto: user.profilePhoto, // Add other user properties as needed
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Profile photo upload route
router.post('/upload-photo', authenticateToken, upload.single('photo'), async (req, res) => {
    try {
        // Verify file exists in req.file.path
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const userId = req.user.id; // Use the ID from the decoded token
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Save the relative file path of the uploaded photo to the user's profilePhoto property
        const relativeFilePath = req.file.path.replace(`${process.cwd()}/`, '');
        user.profilePhoto = relativeFilePath;
        await user.save();
        console.error("upload");
        res.json({ message: 'Profile photo uploaded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error, please try again later' });
    }
});


module.exports = router;
