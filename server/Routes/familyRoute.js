const familyController = require('../Controllers/familyController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');
router.post('/family/addrequest',middleware.authorize, familyController.addrequest);
router.get('/family/allrequests', familyController.allrequests);

module.exports = router;