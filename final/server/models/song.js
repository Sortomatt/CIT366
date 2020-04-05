const mongoose = require ('mongoose');

const songSchema = mongoose.Schema({
  id: { type: String, required: true},
  name: { type: String, required: true},
  description: { type: String, required: true},
  author: { type: String, required: true},
});

module.exports = mongoose.model('Song', songSchema);
