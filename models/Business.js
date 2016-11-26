const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  about: String,
  address: String,
  businessURL: String,
  city: String,
  imageURL: String,
  phone: String,
  price: Number,
  rating: Number,
  reviewCount: Number,
  loc: {
    type: [Number],
    index: '2d'
  },
  logoURL: String,
  tags: {
    type: [String],
    index: true
  }
  
}, { timestamps: true });


const Business = mongoose.model('Business', businessSchema);
module.exports = Business;
