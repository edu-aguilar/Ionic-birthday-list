var jwt = require('jsonwebtoken');
var config = require('./config.js');
var Beer = require('./models/contact.js');
var User = require('./models/user.js');

module.exports = {
    'middleware': middleware,
    'authenticate': authenticate
};

function middleware (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
        });

    } else {
        // if there is no token return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

}


function authenticate(req, res) {

    console.log(req.body);
    console.log(req.body.userId);
    User.findOne({
        customId: req.body.userId
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
          //crear usuario maybe?
          res.status(404).json({ success: false, message: 'Authentication failed. User not found.' });
      } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, config.secret, {
              expiresIn: '1440m'
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
      }

    });
}
