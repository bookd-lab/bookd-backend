const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  businessId: String,
  reviewBody: {type: String, required: true},
  reviewDate: Date,
  reviewerId: String,
  starRating: Number 
}, { timestamps: true });

/**
 * Presaving
 */
reviewSchema.pre('save', function save(next) {
	const review = this;
	next()
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
