const dashboardController = require("../Controllers/dashboardcontroller");
const express = require("express");
const app = express();
const router = express.Router();
const middleware = require("../middleware/authorization");

router.post("/dashboard/addbabysitter",middleware.authorize, dashboardController.addbabysitter);
router.get("/dashboard/allusers", dashboardController.allusers);
router.post("/dashboard/login", dashboardController.login);
router.get("/dashboard/users/count", dashboardController.countusers);
router.get("/dashboard/allsitters", dashboardController.allsitters);
router.get("/dashboard/sitters/count", dashboardController.countsitters);

module.exports = router;
