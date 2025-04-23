const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  saveEvent,
} = require('../controllers/eventController');

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', auth, createEvent);
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);
router.post('/save/:id', auth, saveEvent);

module.exports = router;