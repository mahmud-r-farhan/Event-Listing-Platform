const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('savedEvents');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  const {
    username, bio, location, website,
    socialLinks, interests, phoneNumber, notificationPreferences
  } = req.body;

  try {
    const profileFields = {
      username,
      bio,
      location,
      website,
      socialLinks,
      interests,
      phoneNumber,
      notificationPreferences
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
