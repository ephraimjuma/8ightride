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
    db.getallride((err, rides) => {
        if (err) {
            console.error('Error fetching available rides:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render('rides.ejs', { rides });
    });
});

// Book a ride
router.post('/booking/:ride_id', (req, res) => {
    const ride_id = req.params.ride_id;
    const user_id = req.cookies['id']; // Assuming user id is stored in cookies

    // Check for available rides
    db.getAvailableRide(ride_id, (err, availableRide) => {
        if (err) {
            console.error('Error checking available rides:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (!availableRide) {
            res.send('No available rides found.');
            return;
        }

        // Book the ride
        db.bookRide(ride_id, user_id, (err, booking) => {
            if (err) {
                console.error('Error booking ride:', err);
                res.status(500).send('Failed to book ride');
                return;
            }
            res.send('Ride booked successfully!');
        });
    });
});

module.exports = router;
