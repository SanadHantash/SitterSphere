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
router.get('/profile/myrequests/:id/applications',middleware.authorize, userprofileController.myrequestapplications);
router.get('/profile/mysittapplications',middleware.authorize, userprofileController.mysittapplications);
router.put('/profile/familyapplcation/:id/ignore',middleware.authorize, userprofileController.ignoreapplication);
router.put('/profile/request/:id/delete',middleware.authorize, userprofileController.deleterequest);
router.get('/profile/myapplications',middleware.authorize, userprofileController.myapplications);
router.post( "/payment/:id", middleware.authorize, userprofileController.createCheckoutSession );
router.get('/profile/mycontracts',middleware.authorize, userprofileController.contracts);
router.get('/profile/mydates',middleware.authorize, userprofileController.dates);
router.post('/profile/sittapplication/:id/accept',middleware.authorize, userprofileController.acceptsitt);
router.put('/profile/sittapplication/:id/ignore',middleware.authorize, userprofileController.ignoresitt);
module.exports = router;

