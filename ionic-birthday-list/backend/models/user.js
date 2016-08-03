var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var BeerSchema   = require('mongoose').model('Beer').schema;

var UserSchema   = new Schema({
    customId: { type: String, required: true, unique: true },
    beers: [BeerSchema]
});

UserSchema.statics.findByCustomId = function (customId, cb) {
    this.find({
        customId: customId
    }, cb);
};

module.exports = mongoose.model('User', UserSchema);
