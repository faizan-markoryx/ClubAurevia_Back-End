const express = require("express");

const router = express.Router();

const {

  getUserMembership,
  assignMembership,
  assignCustomMembership,
  useNights,
  addNights,
  getAllMembershipPlans
} = require("../controllers/membership.controller");


router.get("/plans", getAllMembershipPlans);

router.get("/user/:userId", getUserMembership);

router.post("/assign", assignMembership);

router.post("/assign-custom", assignCustomMembership);

router.post("/use-nights", useNights);

router.post("/add-nights", addNights);

module.exports = router;