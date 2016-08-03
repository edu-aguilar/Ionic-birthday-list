var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    customId: { type: String, required: true, unique: true },
    beers: Array
});

UserSchema.statics.findByCustomId = function (customId, cb) {
    this.find({
        customId: customId
    }, cb);
};

module.exports = mongoose.model('User', UserSchema);
