var User = require('../models/user.js');
var Beer = require('../models/beer.js');

exports.newBeer = newBeer;
exports.getAllBeers = getAllBeers;
exports.getBeerById = getBeerById;
exports.updateBeer = updateBeer;
exports.deleteBeer = deleteBeer;


function newBeer(req, res) {

    User.findOne({customId: req.params.userId}, function(err, user) {
        if (err){
          res.send(err);
        } else {
            var beer = new Beer();      // create a new instance of the beer model
            beer.name = req.body.name;
            user.beers.push(beer);

            user.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'beer created!' });
            });
        }
    });

}

function getAllBeers(req, res) {

    User.findOne({customId: req.params.userId}, function(err, user) {
        if (err){
          res.send(err);
        } else {
            res.json(user.beers);
        }
    });
}

function getBeerById(req, res) {

    User.findOne({customId:req.params.userId}, function(err, user) {
        if (err){
          res.send(err);
        }
        for (var i = 0; i < user.beers.length; i++) {
            if (user.beers[i]._id == req.params.beerId) {
                res.json(user.beers[i]);
            }
        }
    });
}

function updateBeer(req, res) {

    User.findOne({customId:req.params.userId}, function(err, user) {
        if (err){
          res.send(err);
        }
        var index = null;
        for (var i = 0; i < user.beers.length; i++) {
            if (user.beers[i]._id == req.params.beerId) {
                index = i;
            }
        }
        if (index > -1) {
            user.beers[index].name = req.body.name;
            user.save(function(err) {
                if (err){res.send(err);}
                res.json({ message: 'beer updated!' });
            });
        } else {
            res.json({ message: 'beer does not exists!' });
        }
    });
}

function deleteBeer(req, res) {

    User.findOne({customId:req.params.userId}, function(err, user) {
        if (err){
          res.send(err);
        }
        var index = null;
        for (var i = 0; i < user.beers.length; i++) {
            if (user.beers[i]._id == req.params.beerId) {
                index = i;
            }
        }
        if (index > -1) {
            user.beers.splice(index, 1);
            user.save(function(err) {
                if (err){res.send(err);}
                res.json({ message: 'beer deleted!' });
            });
        } else {
            res.json({ message: 'beer does not exists!' });
        }
    });
}
