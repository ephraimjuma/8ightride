const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require.main.require('./models/db_controller'); // Adjust the path to your DB controller

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Route to display the edit ride form
router.get('/:id', function (req, res) {
    const rideId = req.params.id;
    // Fetch the ride details from the database
    db.getRideById(rideId, function (err, result) {
        if (err) {
            console.error('Error fetching ride details:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (!result || result.length === 0) {
            return res.status(404).send('Ride not found');
        }
        const ride = result[0];
        res.render('edit_ride.ejs', { ride });
    });
});

// Route to handle the form submission
router.post('/:id', function (req, res) {
    const rideId = req.params.id;
    const updatedRide = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        service: req.body.service,
        pickup_location: req.body.pickupLocation,
        dropoff_location: req.body.dropoffLocation,
        pickup_time: req.body.pickupTime,
        university_arrival_time: req.body.universityArrivalTime,
        dropoff_time: req.body.dropoffTime,
        days_of_week: req.body.days.join(', '),
        note: req.body.note
    };

    // Validate form data
    if (!updatedRide.name || !updatedRide.email || !updatedRide.phone || !updatedRide.service || !updatedRide.pickup_location || !updatedRide.dropoff_location || !updatedRide.pickup_time || !updatedRide.university_arrival_time || !updatedRide.dropoff_time || !updatedRide.days_of_week) {
        return res.send('All fields are required.');
    }

    // Update the ride details in the database
    db.updateRide(rideId, updatedRide, function (err, result) {
        if (err) {
            console.error('Error updating ride:', err);
            return res.send('An error occurred while updating the ride. Please try again later.');
        }

        if (result.affectedRows > 0) {
            res.redirect('/user/my_rides');
        } else {
            res.send('Failed to update ride.');
        }
    });
});

module.exports = router;
