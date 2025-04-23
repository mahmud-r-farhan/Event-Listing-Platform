const Event = require('../models/Event');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');

exports.getEvents = async (req, res) => {
  try {
    const { category, location } = req.query;
    const query = {};
    if (category) query.category = category;
    if (location) query.location = location;

    const events = await Event.find(query).populate('createdBy', 'username');
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'username');
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { name, date, time, location, description, category, coordinates, images } = req.body;

    const imageUrls = await Promise.all(images.map(async (image) => {
      const result = await cloudinary.uploader.upload(image, { folder: 'events' });
      return result.secure_url;
    }));

    const event = new Event({
      name,
      date,
      time,
      location,
      description,
      category,
      coordinates,
      images: imageUrls,
      createdBy: req.user.id,
    });

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    if (event.createdBy.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    if (event.createdBy.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await event.remove();
    res.json({ msg: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.saveEvent = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.savedEvents.includes(req.params.id)) {
      return res.status(400).json({ msg: 'Event already saved' });
    }

    user.savedEvents.push(req.params.id);
    await user.save();
    res.json({ msg: 'Event saved' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.likeEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.likes.includes(req.user.id)) {
      event.likes.push(req.user.id);
      await event.save();
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
