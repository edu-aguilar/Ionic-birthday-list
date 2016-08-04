// SET UP
// =============================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //to POST operations.
var mongoose = require('mongoose');
mongoose.connect('mongodb://dba:testing@ds029565.mlab.com:29565/ionic-birthday'); // connect to our database
var Beer = require('./backend/models/beer.js');
var User = require('./backend/models/user.js');
var userApi = require('./backend/controllers/user.controller.js');
var beerApi = require('./backend/controllers/beer.controller.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 1990;        // set our port



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening | middleware');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
// on routes that end in /beers
// ----------------------------------------------------
router.route('/users')
    .post(userApi.newUser)
    .get(userApi.getAllUsers);

router.route('/users/:userId')
    .get(userApi.getUserByCustomId);

router.route('/users/:userId/beers')
    .post(beerApi.newBeer)
    .get(beerApi.getAllBeers);

router.route('/users/:userId/beers/:beerId')
    .get(beerApi.getBeerById)
    .put(beerApi.updateBeer)
    .delete(beerApi.deleteBeer);

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
