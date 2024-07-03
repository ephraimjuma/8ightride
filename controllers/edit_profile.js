const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../models/user'); // Adjust the path to your User model

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/'); // Adjust the path as necessary
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Route to display edit profile page
router.get('/edit_profile', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Adjust based on your user schema
        res.render('edit_profile', { user });
    } catch (err) {
        console.error(err);
        res.redirect('/user_profile');
    }
});

// Route to handle profile update
router.post('/update_profile', isAuthenticated, upload.single('profilePicture'), async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Adjust based on your user schema
        user.username = req.body.username;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.address = req.body.address;
        user.birthday = req.body.birthday;
        user.gender = req.body.gender;

        if (req.file) {
            user.profilePicture = `/uploads/${req.file.filename}`;
        }

        await user.save();
        res.redirect('/user_profile?success=Profile updated successfully');
    } catch (err) {
        console.error(err);
        res.redirect('/user/edit_profile?error=An error occurred');
    }
});

module.exports = router;
