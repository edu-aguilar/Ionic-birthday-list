var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ContactSchema   = require('mongoose').model('Contact').schema;

var UserSchema   = new Schema({
    customId: { type: String, required: true, unique: true },
    contacts: [ContactSchema]
});

module.exports = mongoose.model('User', UserSchema);
