const router = require("express").Router();
const campaignController = require("../controller/campaign.controller");

router.get("/get", campaignController.list);
router.get("/get/:id", campaignController.getById);
router.post("/create", campaignController.create);

module.exports = router;
