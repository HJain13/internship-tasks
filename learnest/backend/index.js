var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3001; //.env for Production
var fs = require('fs')
var https = require('https')
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB = require('./configs/db.js');

mongoose.connect(configDB.url); // Connecting to our database

require('./configs/passport')(passport);

app.use(morgan('dev')); // Logging every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up EJS for Templating
app.set('view engine', 'ejs'); 

// Passport Configuration
app.use(session({ secret: 'thismustberandomso3.14' })); //Session Secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//========= Routes =========
require('./app/routes.js')(app, passport);

const httpsOptions = {
    key: fs.readFileSync( './localhost.key' ),
    cert: fs.readFileSync( './localhost.cert' ),
    requestCert: false,
    rejectUnauthorized: false	
}

//========= Launch =========
app.listen(port);
console.log('Authentication Server running on Port:' + port);