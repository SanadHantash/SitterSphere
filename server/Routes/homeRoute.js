const homeController = require('../Controllers/homeController');
const express = require('express');
const app = express();
const router = express.Router();
//const middleware = require('../middleware/authorization');
router.get('/home/topratedsitters', homeController.topratedsitters);
router.get('/home/recentrequests', homeController.recentrequests);
module.exports = router;