const express = require ('express');
const session = require ('express-session');
const cookieParser = require ('cookie-parser');
const path = require ('path');
const ejs= require ('ejs');
const multer = require('multer');
//const path = require ('path');
const async = require ('async');
const nodmailer = require ('nodemailer');
const crypto = require ('crypto');
const expressValidator = require ('express-validator');
const  sweetalert = require('sweetalert2');
const app = express();

const bodyParser = require ('body-parser');

const  login = require ('./controllers/login');
const  home = require ('./controllers/home');
const  signup = require ('./controllers/signup');
const add_driver = require('./controllers/add_driver');
const  driver_controller = require ('./controllers/driver_controller');
const db = require ('./models/db_controller');
const reset = require('./controllers/reset_controller');
const set = require('./controllers/set_controller');
const employee = require ('./controllers/employee.js');
const logout = require ('./controllers/logout');
const verify = require ('./controllers/verify');
const store = require ('./controllers/store');
const landing = require ('./controllers/landing');
const complain = require ('./controllers/complain');
const inbox = require ('./controllers/inbox');
const ride = require ('./controllers/ride');
const user = require('./controllers/user');

var receipt = require ('./controllers/receipt');
var chat = require ('./controllers/chat');

app.set('view engine ', 'ejs');


app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));


var server =app.listen(3000 , function(){

    console.log('Server Started');
});


app.use('/login' ,login);
app.use('/home' , home);
app.use('/signup' , signup);
app.use('/driver', driver_controller);
app.use('/resetpassword' ,reset);
app.use('/setpassword',set);
app.use('/employee',employee);
app.use ('/logout',logout);
app.use ('/verify', verify);
app.use ('/store',store);
app.use ('/',landing);
app.use ('/complain',complain);
app.use ('/inbox',inbox);
app.use ('/ride',ride);
app.use('/receipt',receipt);
app.use('/user', user);