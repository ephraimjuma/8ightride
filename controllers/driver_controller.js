const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require.main.require('./models/db_controller');
const nodemailer = require('nodemailer');

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ephraimloch@gmail.com',
        pass: 'rvfgdjixhtmkybji',
    },
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Middleware to check if the user is authenticated
router.get('*', function (req, res, next) {
    if (req.cookies['username'] == null) {
        res.redirect('/login');
    } else {
        next();
    }
});

// Route to get all drivers
router.get('/', function (req, res) {
    db.getAllDriver(function (err, result) {
        if (err) throw err;
        res.render('driver.ejs', { list: result });
    });
});

// Route to view driver details
router.get('/details/:id', function (req, res) {
    var id = req.params.id;
    db.getDriverbyId(id, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.render('driverDetails', { driver: result[0] });
        } else {
            res.send('Driver not found');
        }
    });
});

// Route to accept a driver
router.get('/accept/:id', function (req, res) {
    var id = req.params.id;
    db.acceptDriver(id, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while accepting the driver. Please try again later.');
        }
        db.getDriverbyId(id, function (err, driverResult) {
            if (err) throw err;
            const driver = driverResult[0];

            // Send acceptance email
            const output = `
                <p>Dear ${driver.first_name} ${driver.last_name},</p>
                <p>We are pleased to inform you that your application to become a driver has been accepted.</p>
                <p>Please show up for an interview at our office.</p>
                <p>Regards,</p>
                <p>HR Manager</p>
            `;
            const mailOptions = {
                from: 'Uniride@gmail.com',
                to: driver.email,
                subject: 'Driver Application Accepted',
                html: output,
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.redirect('/driver');
        });
    });
});

// Route to reject a driver
router.get('/reject/:id', function (req, res) {
    var id = req.params.id;
    db.rejectDriver(id, function (err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while rejecting the driver. Please try again later.');
        }
        db.getDriverbyId(id, function (err, driverResult) {
            if (err) throw err;
            const driver = driverResult[0];

            // Send rejection email
            const output = `
                <p>Dear ${driver.first_name} ${driver.last_name},</p>
                <p>We regret to inform you that your application to become a driver has been rejected.</p>
                <p>Regards,</p>
                <p>HR Manager</p>
            `;
            const mailOptions = {
                from: 'Uniride@gmail.com',
                to: driver.email,
                subject: 'Driver Application Rejected',
                html: output,
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.redirect('/driver');
        });
    });
});

// Multer storage configuration
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/images/upload_images"); // Specify the destination
    },
    filename: function (req, file, cb) {
        console.log(file); // Log the file object info in console
        cb(null, file.originalname); // Save file with original name
    }
});

var upload = multer({ storage: storage });

// Route to add driver
router.get('/add_driver', function (req, res) {
    db.getalldept(function (err, result) {
        res.render('add_driver.ejs', { list: result });
    });
});

router.post('/add_driver', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'id_passport', maxCount: 1 },
    { name: 'driving_licence', maxCount: 1 },
    { name: 'certificate_of_good_conduct', maxCount: 1 },
    { name: 'kcse_certificate', maxCount: 1 }
]), function (req, res) {
    db.add_driver(
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.dob,
        req.body.gender,
        req.body.address,
        req.body.phone,
        req.files['image'] ? req.files['image'][0].filename : null,
        req.files['id_passport'] ? req.files['id_passport'][0].filename : null,
        req.files['driving_licence'] ? req.files['driving_licence'][0].filename : null,
        req.files['certificate_of_good_conduct'] ? req.files['certificate_of_good_conduct'][0].filename : null,
        req.files['kcse_certificate'] ? req.files['kcse_certificate'][0].filename : null,
        req.body.department
    );
    if (db.add_driver) {
        console.log('1 driver inserted');
    }
    res.redirect('add_driver');
});

// Route to edit driver
router.get('/edit_driver/:id', function (req, res) {
    var id = req.params.id;
    db.getDriverbyId(id, function (err, result) {
        res.render('edit_driver.ejs', { list: result });
    });
});

router.post('/edit_driver/:id', function (req, res) {
    var id = req.params.id;
    db.editDriver(id, req.body.first_name, req.body.last_name, req.body.email, req.body.dob, req.body.gender, req.body.address, req.body.phone, req.body.image, req.body.department, function (err, result) {
        if (err) throw err;
        res.redirect('back');
    });
});

// Route to delete driver
router.get('/delete_driver/:id', function (req, res) {
    var id = req.params.id;
    db.getDriverbyId(id, function (err, result) {
        res.render('delete_driver.ejs', { list: result });
    });
});

router.post('/delete_driver/:id', function (req, res) {
    var id = req.params.id;
    db.deleteDriver(id, function (err, result) {
        res.redirect('/driver');
    });
});

// Route to search drivers
router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchDriver(key, function (err, result) {
        console.log(result);
        res.render('driver.ejs', { list: result });
    });
});

module.exports = router;
