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
  images: [{ type: String, required: true }],
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  interested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  shareCount: { type: Number, default: 0 }
});

eventSchema.plugin(sanitize);
module.exports = mongoose.model('Event', eventSchema);
