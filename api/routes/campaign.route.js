const router = require("express").Router();
const campaignController = require("../controller/campaign.controller");

router.get("/get", campaignController.list);

module.exports = router;
