const sitterController = require("../Controllers/sitterController");
const express = require("express");
const app = express();
const router = express.Router();
const middleware = require("../middleware/authorization");

router.post("/sitters/addmydetail",middleware.authorize, sitterController.addmydetails);
router.get("/sitters", sitterController.allsitters);
router.get("/sitter/detail/:id",sitterController.detail);

module.exports = router;
