const express = require ('express');
const session = require ('express-session');
const cookieParser = require ('cookie-parser');
const path = require ('path');
const ejs= require ('ejs');
const multer = require('multer');
//const path = require ('path');
const async = require ('async');
const nodmailer = require ('nodemailer');
const axios = require('axios');
const crypto = require ('crypto');
const expressValidator = require ('express-validator');
const  sweetalert = require('sweetalert2');
const app = express();

const con = require('./models/db_controller');
const bodyParser = require ('body-parser');

const  login = require ('./controllers/login');
const  home = require ('./controllers/home');
const  signup = require ('./controllers/signup');
const add_driver = require('./controllers/add_driver');
const  driver_controller = require ('./controllers/driver_controller');
const driver_details = require('./controllers/driver_details');
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

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

const consumerKey = '9Rgi1GIQWDFIfJ2uwoY6V8pzFuJztFMqN0d14qkpWsipt1Y5';
const consumerSecret = 'ArbW1Kz1IepbL7vsTyfqYum2zHO15pjWF8A5kA9rfcMTNBjr0eKGVJuKAL9Tns4C';
const shortCode = '174379';
const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
const callbackURL = 'https://mydomain.com/path';

const getAccessToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  return response.data.access_token;
};

const processPayment = async (amount, phoneNumber) => {
    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');
  
    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackURL,
      AccountReference: 'Uniride Payment',
      TransactionDesc: 'Payment for Uniride services',
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return response.data;
  };
  
  app.post('/api/payment/process', async (req, res) => {
    const { amount, phone } = req.body;
    console.log('Received amount:', amount, 'and phone:', phone); // Debugging line
    try {
      const paymentResponse = await processPayment(amount, phone);
      console.log('Payment response:', paymentResponse); // Debugging line
      res.json(paymentResponse);
    } catch (error) {
      console.error('Error processing payment:', error.response ? error.response.data : error.message); // Detailed error
      res.status(500).json({ error: 'Payment processing failed', details: error.response ? error.response.data : error.message });
    }
  });
  
  
  app.post('/api/payment/callback', (req, res) => {
    const callbackData = req.body;
    // Process the callback data
    console.log('Callback Data:', callbackData);
    res.status(200).send('Callback received');
  });

  
  app.post('/user/booking', (req, res) => {
    const booking = req.body;
    bookings.push(booking);
    res.redirect('/user/my_rides');
  });
  
  app.get('/user/my_rides', (req, res) => {
    res.render('my_rides', { bookings });
  });


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
            profilePicture: null 
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

        // Update session with latest data
        req.user = user;

        // Render the user_profile.ejs template with the updated user details
        res.render('user_profile', { user });
    });
});


// Route to display edit profile page
app.get('/user/edit_profile', (req, res) => {
    // Fetch the latest user details from the database
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

        // Update session with latest data
        req.user = user;

        // Render the edit_profile.ejs template with the updated user details
        res.render('edit_profile', { user });
    });
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
        profilePicture: req.file ? `/uploads/${req.file.filename}` : req.user.profilePicture  
      };

     // Save updated user to the database
     db.updateUser(req.user.id, updatedUser, (err) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Simulate saving to session
        req.user = updatedUser;

        res.redirect('/user_profile?success=Profile updated successfully');    });
});

// Route to get the counts
app.get('/api/getCounts', (req, res) => {
  const driverQuery = 'SELECT COUNT(*) as count FROM ride WHERE driver_name IS NOT NULL';
  const rideQuery = 'SELECT COUNT(*) as count FROM ride';
  
  con.query(driverQuery, (err, driverResult) => {
    if (err) {
      console.error('Error querying driver count:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    
    console.log('Driver Query Result:', driverResult);

    con.query(rideQuery, (err, rideResult) => {
      if (err) {
        console.error('Error querying ride count:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
      
      console.log('Ride Query Result:', rideResult);
      
      const counts = {
        drivers: driverResult[0].count,
        rides: rideResult[0].count
      };

      console.log('Counts:', counts); // Debug statement to check counts
      res.json(counts);
    });
  });
});


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

app.use('/login' ,login);
app.use('/home' , home);
app.use('/signup' , signup);
app.use('/driver', driver_controller);
app.use('/driver/details', driver_details); 
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

