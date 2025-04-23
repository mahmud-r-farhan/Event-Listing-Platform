const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const sanitize = require('mongoose-sanitize');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  profilePicture: { type: String, default: '' },
  bio: { type: String, default: '' },
  location: String,
  website: String,
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
  },
  interests: [String],
  phoneNumber: String,
  notificationPreferences: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true }
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.plugin(sanitize);
module.exports = mongoose.model('User', userSchema);