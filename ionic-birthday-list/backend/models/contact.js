var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContactSchema   = new Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    subject: { type: String },
    image: { type: String },
    notification: { type: Number }
});

module.exports = mongoose.model('Contact', ContactSchema);
