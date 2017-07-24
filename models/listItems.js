const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number},
  long: { type: Number},
  category: { type: String },
  url: {type: String}
});

module.exports = mongoose.model('Item', itemSchema);
