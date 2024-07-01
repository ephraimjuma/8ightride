var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

module.exports = router;

router.get('/', function (req, res) {
    res.render('add_driver.ejs');
});

router.post('/', function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var phoneNumber = req.body.phoneNumber;
    var licenseNumber = req.body.licenseNumber;
    var vehicleType = req.body.vehicleType;

    // Validate form data
    if (!firstName || !lastName || !email || !phoneNumber || !licenseNumber || !vehicleType) {
        return res.send('All fields are required.');
    }

    // Add driver to the database
    db.addDriver(firstName, lastName, email, phoneNumber, licenseNumber, vehicleType, function (err, result) {
        if (err) {
            console.error(err);
            return res.send('An error occurred while adding the driver. Please try again later.');
        }

        console.log(result);
        if (result.affectedRows > 0) {
            res.send(`Driver added successfully! Driver ID is ${result.insertId}`);
        } else {
            res.send('Failed to add driver.');
        }
    });
});
