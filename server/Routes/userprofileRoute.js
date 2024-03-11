const userprofileController = require('../Controllers/userprofileController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');



router.get('/profile', middleware.authorize, userprofileController.userinfo);
router.put('/profile/uploadimage', middleware.authorize, userprofileController.profilepicture);
router.put('/myprofile/updateinfo', middleware.authorize, userprofileController.updateinfo);
router.put('/myprofile/updatepassword', middleware.authorize, userprofileController.updatepassword);


module.exports = router;

