const express = require('express');
const router = express.Router();
const booking = require('./controllers/booking');
//const isAuthenticated = require('./middleware/isAuthenticated'); // Middleware to check if the user is authenticated

// middleware/isAuthenticated.js
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = isAuthenticated;

// Route to display user's booked rides
router.get('/my_rides', isAuthenticated, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id }); // Adjust based on your booking schema
        res.render('my_rides', { bookings });
    } catch (err) {
        console.error(err);
        res.redirect('/user_profile');
    }
});

module.exports = router;
