const express = require('express');
const router = express.Router();

const appointmentController = require('../../controllers/appointments')
const slotController = require('../../controllers/slot')

router.get('/appointments', appointmentController.all);
router.get('/slots', slotController.all);
router.post('/appointments', appointmentController.create);




module.exports = router;