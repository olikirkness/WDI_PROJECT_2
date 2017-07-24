const mongoose = require('mongoose');
// const Item = require('./listItems');


const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  items: [{type: mongoose.Schema.ObjectId, ref: 'Item'}]
});


module.exports = mongoose.model('List', listSchema);
