const mongoose = require('mongoose');
// const Item = require('./listItems');

const commentSchema = new mongoose.Schema({
  body: String,
  commentedBy: {}
});

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  photo: {type: String},
  items: [{type: mongoose.Schema.ObjectId, ref: 'Item'}],
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User' },
  comments: [commentSchema]

});


module.exports = mongoose.model('List', listSchema);
