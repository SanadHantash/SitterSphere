const dashboardController = require("../Controllers/dashboardcontroller");
const express = require("express");
const app = express();
const router = express.Router();
const middleware = require("../middleware/authorization");

router.post("/dashboard/addbabysitter",middleware.authorize, dashboardController.addbabysitter);
router.get("/dashboard/allusers",middleware.authorize, dashboardController.allusers);
router.post("/dashboard/login", dashboardController.login);
router.get("/dashboard/users/count", middleware.authorize,dashboardController.countusers);
router.get("/dashboard/allsitters",middleware.authorize, dashboardController.allsitters);
router.get("/dashboard/sitters/count", middleware.authorize,dashboardController.countsitters);
router.get("/dashboard/requests/count", middleware.authorize,dashboardController.countrequests);
router.get("/dashboard/allfamiliesrequests",middleware.authorize, dashboardController.allfamiliesrequests);
router.put("/dashboard/deleteuser/:id", middleware.authorize,dashboardController.deleteuser);
router.put("/dashboard/deletesitter/:id", middleware.authorize,dashboardController.deletesitter);    
router.put("/dashboard/deleterequest/:id", middleware.authorize,dashboardController.deleterequest);    
router.get("/dashboard/sitter/:id/sittingtimes",middleware.authorize,dashboardController.sittertimes);
router.get("/dashboard/sitter/:id/familytimes",middleware.authorize,dashboardController.familytimes);
router.get("/dashboard/sitter/detail/:id",middleware.authorize,dashboardController.detail);
router.get("/dashboard/sitter/:id/applicationscount",middleware.authorize,dashboardController.countsitterapplications);
router.get("/dashboard/sitter/:id/sittingscount",middleware.authorize,dashboardController.sittingscount);

module.exports = router;
