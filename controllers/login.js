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



router.get('/', function(req ,res){

    res.render('login.ejs');
});

var con = mysql.createConnection({

    host : 'localhost',
    user : 'root',
    password : '',
    database : 'budapest'
});

router.use(session({

    secret: 'secret',
    resave : true ,
    saveUninitialized : true 

}));


router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());


router.post('/',[
    check('username').notEmpty().withMessage("Username is reequired"),
    check('password').notEmpty().withMessage("Password is reequired")
    
], function(request , response){
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
      }

    var username = request.body.username;
    var password = request.body.password;

    if (username && password) {
        con.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                var user = results[0];
                request.session.loggedin = true;
                request.session.user = {
                    id: user.id,
                    username: user.username,
                    role: user.role
                };
                response.cookie('username', username);
                var status = user.email_status;
                if (status == "not_verified") {
                    response.json({ success: false, message: "Please verify your email." });
                } else {
                    response.json({ success: true, role: user.role });
                }
            } else {
                response.json({ success: false, message: "Incorrect username or password." });
            }
        });
    } else {
        response.json({ success: false, message: "Please enter username and password." });
    }
});

module.exports = router;

   