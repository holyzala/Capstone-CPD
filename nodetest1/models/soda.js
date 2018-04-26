const mongoose = require('mongoose');

let SodaSchema = mongoose.Schema({
    name: {type: String},
    description: {type: String},
    reviews: [{user: {type: mongoose.Schema.ObjectId, ref: 'User'}, rating: {type: Number}}],
}, {timestamps: true});

SodaSchema.methods.toWeb = function () {
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

let soda = module.exports = mongoose.model('Soda', SodaSchema);

