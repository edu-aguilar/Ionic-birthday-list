var User = require('../models/user.js');

exports.newUser = newUser;
exports.getAllUsers = getAllUsers;
exports.getUserByCustomId = getUserByCustomId;


function newUser(req, res, next) {
    var user = new User();
    user.customId = req.body.userId;

    user.save(function(err) {
        if (err){
            res.send(err);
        }
        res.json({ message: 'user created!' });
    });

}

function getAllUsers(req, res) {
    User.find(function(err, users) {
        if (err){
            res.send(err);
        }
        res.json(users);
    });
}

function getUserByCustomId(req, res) {
    User.findOne({customId:req.params.userId}, function(err, user) {
        if (err){
          res.send(err);
        }
        res.json(user);
    });
}
