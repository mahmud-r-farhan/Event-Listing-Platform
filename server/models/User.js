const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const sanitize = require('mongoose-sanitize');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.plugin(sanitize);
module.exports = mongoose.model('User', userSchema);