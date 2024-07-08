const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./controllers/user'); // Adjust the path to your User model

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Route to display user profile
router.get('/user_profile', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Adjust based on your user schema
        res.render('/user_profile', { user });
    } catch (err) {
        console.error(err);
        res.redirect('/home');
    }
});

// Route to handle profile editing
router.get('/edit_profile', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Adjust based on your user schema
        res.render('edit_profile', { user });
    } catch (err) {
        console.error(err);
        res.redirect('/user_profile');
    }
});

// Route to handle password change
router.post('/change-password', isAuthenticated, async (req, res) => {
    const { current_password, new_password, confirm_password } = req.body;
    try {
        const user = await User.findById(req.user.id); // Adjust based on your user schema

        // Check if current password is correct
        const match = await bcrypt.compare(current_password, user.password);
        if (!match) {
            return res.redirect('/user_profile?error=Incorrect current password');
        }

        // Check if new password and confirm password match
        if (new_password !== confirm_password) {
            return res.redirect('/user/user_profile?error=Passwords do not match');
        }

        // Hash the new password and save it
        const hashedPassword = await bcrypt.hash(new_password, 10);
        user.password = hashedPassword;
        await user.save();

        res.redirect('/user_profile?success=Password changed successfully');
    } catch (err) {
        console.error(err);
        res.redirect('/user/user_profile?error=An error occurred');
    }
});

module.exports = router;
