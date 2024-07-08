const express = require('express');
const router = express.Router();
const db = require.main.require('./models/db_controller'); // Adjust the path to your DB controller

router.get('/:id', function (req, res) {
    const driverId = req.params.id;

    // Fetch driver details from the database
    db.getDriverbyId(driverId, function (err, result) {
        if (err) {
            console.error(err);
            return res.send('An error occurred while fetching the driver details. Please try again later.');
        }

        if (result.length > 0) {
            res.render('driver_details.ejs', { driver: result[0] });
        } else {
            res.send('Driver not found.');
        }
    });
});

router.get('/accept/:id', function (req, res) {
    const driverId = req.params.id;

    // Handle accept driver logic here
    // For example, updating the driver's status in the database
    db.acceptDriver(driverId, function (err, result) {
        if (err) {
            console.error(err);
            return res.send('An error occurred while accepting the driver. Please try again later.');
        }

        res.redirect(`/driver/details/${driverId}`);
    });
});

router.get('/reject/:id', function (req, res) {
    const driverId = req.params.id;

    // Handle reject driver logic here
    // For example, updating the driver's status in the database
    db.rejectDriver(driverId, function (err, result) {
        if (err) {
            console.error(err);
            return res.send('An error occurred while rejecting the driver. Please try again later.');
        }

        res.redirect(`/driver/details/${driverId}`);
    });
});

module.exports = router;
