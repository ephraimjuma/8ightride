
var express = require('express');
var home = require('./home');
var user = require('./user');
var mysql = require('mysql');
var session = require('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
var sweetalert = require('sweetalert2');
const { check, validationResult } = require('express-validator');

// Middleware to check if the user is logged in
function checkAuth(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/', checkAuth, function(req, res) {
    res.render('user.ejs', { username: req.session.user.username });
});

// Route to display the booking form
router.get('/booking', checkAuth, function(req, res) {
    res.render('user.ejs', { username: req.session.user.username });
});

// Route to handle booking form submission
router.post('/booking', [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('phone').notEmpty().withMessage('Phone number is required'),
    check('service').notEmpty().withMessage('Service is required'),
    check('pickup_location').notEmpty().withMessage('Pickup location is required'),
    check('dropoff_location').notEmpty().withMessage('Dropoff location is required'),
    check('pickup_time').notEmpty().withMessage('Pickup time is required'),
    check('dropoff_time').notEmpty().withMessage('Dropoff time is required'),
    check('days').notEmpty().withMessage('Days are required'),
    check('total_cost').isNumeric().withMessage('Total cost is required and must be a number')
], checkAuth, function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('user.ejs', { 
            username: req.session.user.username, 
            errors: errors.array() 
        });
    }

    const { name, email, phone, service, pickup_location, dropoff_location, pickup_time, dropoff_time, days, note, total_cost } = req.body;
    const id = req.session.user.id; // Assuming the user ID is stored in the session

    db.make_bookings(id, name, email, phone, service, pickup_location, dropoff_location, pickup_time, dropoff_time, days, note, total_cost, function(err) {
        if (err) {
            console.error('Error inserting booking data:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/user/bookings');
    });
});

module.exports = router;