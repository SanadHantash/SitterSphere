const sitterController = require("../Controllers/sitterController");
const express = require("express");
const app = express();
const router = express.Router();
const middleware = require("../middleware/authorization");

router.post("/sitter/addmydetail",middleware.authorize, sitterController.addmydetails);
router.get("/sitter/mydetail",middleware.authorize, sitterController.mydetails);
router.get("/sitters", sitterController.allsitters);

module.exports = router;
