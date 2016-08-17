// SET UP
// =============================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //to POST operations.
var mongoose = require('mongoose');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('./backend/config.js');
var common = require('./backend/common.js');

mongoose.connect(config.database); // connect to our database
var Contact = require('./backend/models/contact.js');
var User = require('./backend/models/user.js');
var userApi = require('./backend/controllers/user.controller.js');
var contactApi = require('./backend/controllers/contact.controller.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('secret', config.secret);

var port = process.env.PORT || 1990;        // set our port


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
// on routes that end in /contacts
// ----------------------------------------------------
// ----------------------------------------------------
router.route('/users')
    .post(userApi.newUser);

router.route('/authenticate')
    .post(common.authenticate);

// middleware to use for all requests
router.use(common.middleware);

router.route('/users')
    .get(userApi.getAllUsers);

router.route('/users/:userId')
    .get(userApi.getUserByCustomId);

router.route('/users/:userId/contacts')
    .post(contactApi.newContact)
    .get(contactApi.getAllContacts);

router.route('/users/:userId/contacts/:contactId')
    .get(contactApi.getContactById)
    .put(contactApi.updateContact)
    .delete(contactApi.deleteContact);

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
