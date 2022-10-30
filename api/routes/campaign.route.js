const router = require("express").Router();
const campaignController = require("../controller/campaign.controller");

router.get("/get", campaignController.list);
router.get("/get/:uid", campaignController.getById);
router.post("/create", campaignController.create);
router.post("/create-donation", campaignController.createDonation);
router.get("/get-all-donations/:uid", campaignController.getAllDonations);
router.post("/add-comment", campaignController.addComment);
router.get("/get-all-comments/:uid", campaignController.getAllComments);
router.get("/get-all-categories", campaignController.getAllCategories);

module.exports = router;
