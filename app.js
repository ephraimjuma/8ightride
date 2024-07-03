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
const booking = require('./controllers/booking');


var receipt = require ('./controllers/receipt');
var chat = require ('./controllers/chat');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


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

// Configure Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });


// Middleware to mock req.user if not defined
app.use((req, res, next) => {
    if (!req.user) {
        req.user = {
            username: 'David',
            email: 'misatisharly@gmail.com',
            phone: '123-456-7890',
            address: '123 Main St',
            birthday: '1990-01-01',
            gender: 'Male',
            id: '1',
            createdAt: new Date(),
            profilePicture: 'https://t3.ftcdn.net/jpg/01/97/11/76/240_F_197117649_MYVpw74AYw4FmgDGC1tyM7G1xMavIShU.jpg'
        };
    }
    next();
});

app.get('/user_profile', (req, res) => {
    // Fetch updated user details from the database
    db.getuserdetails(req.user.username, (err, results) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (!results || results.length === 0) {
            console.error('No user found for username:', req.user.username);
            return res.status(404).send('User Not Found');
        }

        // Assuming results[0] contains the updated user details
        const user = results[0];

        // Render the user_profile.ejs template with the updated user details
        res.render('user_profile', { user });
    });
});


app.get('/user/edit_profile', (req, res) => {
    // Render the edit_profile.ejs template
    res.render('edit_profile', { user: req.user });
});


app.post('/user/update_profile', upload.single('profilePicture'), (req, res) => {
    const updatedUser = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        birthday: req.body.birthday,
        gender: req.body.gender,
        id: req.user.id,
        createdAt: req.user.createdAt,
        profilePicture: req.file ? req.file.filename : req.user.profilePicture
    };

     // Save updated user to the database
     db.updateUser(req.user.id, updatedUser, (err) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Simulate saving to session
        req.user = updatedUser;

        res.redirect('./user_profile');
    });
});

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
app.use('/booking', booking);
app.use('/add_driver', add_driver); 
