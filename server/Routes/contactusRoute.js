const contactusController = require('../Controllers/contactusController');
const express = require('express');
const router = express.Router();



router.post('/contactus',contactusController.mail);


module.exports = router;