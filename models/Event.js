const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  creator: {type: String, required: true, index: true},
  businesses: [String],
  startDate: Date,
  endDate: Date
}, { timestamps: true });

/**
 * Presaving
 */
eventSchema.pre('save', function save(next) {
	const review = this;
	next()
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;