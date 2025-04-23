const mongoose = require('mongoose');
const sanitize = require('mongoose-sanitize');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

eventSchema.plugin(sanitize);
module.exports = mongoose.model('Event', eventSchema);