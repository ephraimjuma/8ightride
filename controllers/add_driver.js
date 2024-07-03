const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const db = require.main.require('./models/db_controller'); // Adjust the path to your DB controller

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Adjust the path as necessary
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', function (req, res) {
    res.render('add_driver.ejs');
});

router.post('/', upload.single('image'), function (req, res) {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    const phone = req.body.phone;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const address = req.body.address;
    const image = req.file ? req.file.filename : null;

    // Validate form data
    if (!firstName || !lastName || !email || !phone) {
        return res.send('First Name, Last Name, Email, and Phone are required fields.');
    }

    // Add driver to the database
    db.add_driver(firstName, lastName, email, phone, dob, gender, address, image, function (err, result) {
        if (err) {
            console.error(err);
            return res.send('An error occurred while adding the driver. Please try again later.');
        }

        if (result.affectedRows > 0) {
            res.send(`Driver added successfully! Driver ID is ${result.insertId}`);
        } else {
            res.send('Failed to add driver.');
        }
    });
});

module.exports = router;
