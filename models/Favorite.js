const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  creator: {type: String, required: true, index: true},
  business: String
}, { timestamps: true });

/**
 * Presaving
 */
favoriteSchema.pre('save', function save(next) {
	next()
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
