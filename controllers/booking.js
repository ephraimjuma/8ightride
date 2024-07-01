const express = require('express');
const router = express.Router();
const db = require.main.require('./models/db_controller');

// Middleware to check authentication (replace with your actual authentication logic)
router.use((req, res, next) => {
    if (!req.cookies['username']) {
        res.redirect('/login'); // Redirect to login if user is not authenticated
    } else {
        next();
    }
});

// Display available rides
router.get('/', (req, res) => {
    db.getAvailableRides((err, rides) => {
        if (err) {
            console.error('Error fetching available rides:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render('available_rides.ejs', { rides });
    });
});

// Book a ride
router.post('/booking/:rideId', (req, res) => {
    const ride_id = req.params.rideId;
    const user_id = req.cookies['id']; // Assuming user id is stored in cookies
    // Here you might want to implement logic to select an available driver
    db.bookRide(ride_id, user_id, (err, booking) => {
        if (err) {
            console.error('Error booking ride:', err);
            res.status(500).send('Failed to book ride');
            return;
        }
        res.redirect('/booking');
    });
});

module.exports = router;
