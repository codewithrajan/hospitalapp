const express = require('express');
const router = express.Router();
const upload = require('../middlewares/filemiddleware');
const { getHospitalById, registration } = require('../controllers/hospitalapi');

router.get('/api/:hospitalid', getHospitalById);

// Use the handleMulterError middleware before your registration handler
router.post('/registration',upload.single('photo'), registration);

module.exports = router;
