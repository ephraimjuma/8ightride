var express = require ('express');
var home = require('./home');
var user = require('./user');
var mysql =require('mysql');
var session = require ('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/db_controller');
var  sweetalert = require('sweetalert2');
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

module.exports = router;
