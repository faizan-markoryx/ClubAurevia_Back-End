const express = require("express");

const router = express.Router();

const {

  getUserMembership,
  assignMembership,
  assignCustomMembership,
  useNights,
  addNights,
  getAllMembershipPlans,
  createMembershipPlan,
  getMembershipPlanById,
  updateMembershipPlan,
  deleteMembershipPlan
} = require("../controllers/membership.controller");

const { adminAuth } = require("../middleware/auth.middleware");

const {
  validateCreateMembershipPlan,
  validateUpdateMembershipPlan
} = require("../middleware/validateMembershipPlan");


router.get("/plans", getAllMembershipPlans);

// Custom Membership Plan management (admin only)
router.post("/plans", adminAuth, validateCreateMembershipPlan, createMembershipPlan);

router.get("/plans/:id", getMembershipPlanById);

router.put("/plans/:id", adminAuth, validateUpdateMembershipPlan, updateMembershipPlan);

router.delete("/plans/:id", adminAuth, deleteMembershipPlan);

router.get("/user/:userId", getUserMembership);

router.post("/assign", assignMembership);

router.post("/assign-custom", assignCustomMembership);

router.post("/use-nights", useNights);

router.post("/add-nights", addNights);

module.exports = router;