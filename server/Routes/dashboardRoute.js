const dashboardController = require("../Controllers/dashboardcontroller");
const express = require("express");
const app = express();
const router = express.Router();
const middleware = require("../middleware/authorization");

router.post("/dashboard/addbabysitter", dashboardController.addbabysitter);

module.exports = router;
