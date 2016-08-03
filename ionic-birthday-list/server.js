// SET UP
// =============================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //to POST operations.
var mongoose = require('mongoose');
mongoose.connect('mongodb://dba:testing@ds029565.mlab.com:29565/ionic-birthday'); // connect to our database
var Beer = require('./backend/models/beer.js');

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
router.route('/beers')
    .post(newBeer)
    .get(getAllBeers);

router.route('/beers/:beerId')
    .get(getBeerById)
    .put(updateBeer)
    .delete(deleteBeer);

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


//private methods

function newBeer(req, res) {
    var beer = new Beer();      // create a new instance of the beer model
    beer.name = req.body.name;  // set the beers name (comes from the request)

    // save the beer and check for errors
    beer.save(function(err) {
        if (err){
            res.send(err);
        }
        res.json({ message: 'beer created!' });
    });

}

function getAllBeers(req, res) {
    Beer.find(function(err, beers) {
        if (err){
            res.send(err);
        }
        res.json(beers);
    });
}

function getBeerById(req, res) {
    console.log(req.params);
    Beer.findById(req.params.beerId, function(err, beer) {
        if (err){
          res.send(err);
        }
        res.json(beer);
    });
}

function updateBeer(req, res) {

    // use our beer model to find the beer we want
    Beer.findById(req.params.beerId, function(err, beer) {

        if (err){
            res.send(err);
        }

        beer.name = req.body.name;  // update the beers info

        // save the beer
        beer.save(function(err) {
            if (err){res.send(err);}
            res.json({ message: 'beer updated!' });
        });

    });
}

function deleteBeer(req, res) {

  Beer.remove({
          _id: req.params.beerId
      }, onBeerRemoved);

      function onBeerRemoved(err, beer) {
          if (err){res.send(err);}
          res.json({ message: 'Successfully deleted' });
      }
}
