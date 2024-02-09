const userController = require("../Controllers/userController");
const express = require("express");
const app = express();
const router = express.Router();
const middleware = require("../middleware/authorization");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/protected", middleware.authorize, userController.cont);
router.post("/forgetpassword", userController.forgetpassword);
router.post("/verifycode", userController.verifycode);
router.put("/resetpassword", userController.resetpassword);
router.post(
  "/subscribtion",
  middleware.authorize,
  userController.createCheckoutSession
);
router.get("/updaterole", middleware.authorize, userController.updateuserrole);
module.exports = router;
