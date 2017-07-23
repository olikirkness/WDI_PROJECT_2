const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  category: { type: String }
});

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  items: [itemSchema]
});



module.exports = mongoose.model('List', listSchema);
