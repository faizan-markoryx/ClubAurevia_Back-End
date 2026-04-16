const express = require("express");
const router = express.Router();

const tripController = require("../controllers/tripInquiry.controller");
const { userAuth, adminAuth } = require("../middleware/auth.middleware");

router.post("/", userAuth, tripController.createInquiry);

// router.get("/", adminAuth, tripController.getAllInquiries);
router.get("/admin", adminAuth, tripController.getAllInquiries);

router.get("/", userAuth, tripController.getAllInquiriesByUser);

router.get("/:id", tripController.getInquiryById);

router.put("/:id", tripController.updateInquiry);

router.delete("/:id", tripController.deleteInquiry);

module.exports = router;