const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number},
  long: { type: Number},
  url: {type: String},
  category: { type: String }
});

module.exports = mongoose.model('Item', itemSchema);
