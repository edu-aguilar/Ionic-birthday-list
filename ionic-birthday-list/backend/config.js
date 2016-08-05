var jwt = require('jsonwebtoken');

var secret = 'porpakens';
var database = 'mongodb://dba:testing@ds029565.mlab.com:29565/ionic-birthday';

module.exports = {
    'secret': secret,
    'database': database
};
