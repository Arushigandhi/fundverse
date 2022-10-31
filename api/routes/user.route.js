const router = require("express").Router();
const userController = require("../controller/user.controller");

router.post("/create", userController.createUser);
router.get("/get/:uid", userController.getUser);
router.post("/update/:uid", userController.updateUser);

module.exports = router;
