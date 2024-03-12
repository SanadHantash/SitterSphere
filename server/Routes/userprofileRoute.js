const userprofileController = require('../Controllers/userprofileController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');



router.get('/profile', middleware.authorize, userprofileController.userinfo);
router.put('/profile/uploadimage', middleware.authorize, userprofileController.profilepicture);
router.put('/profile/updateinfo', middleware.authorize, userprofileController.updateinfo);
router.put('/profile/updatepassword', middleware.authorize, userprofileController.updatepassword);
router.get('/profile/myrequests',middleware.authorize, userprofileController.myrequests);

module.exports = router;

