const tripService = require("../services/tripInquiry.service");
const TripInquiry = require("../models/tripInquiry.model");


exports.createInquiry = async (req, res) => {
  try {

    const data = {
      ...req.body,
      userId: req.user.id   // agar auth middleware use kar rahe ho
    };

    const inquiry = await tripService.createInquiry(data);

    res.status(201).json({
      success: true,
      message: "Trip inquiry created successfully",
      data: inquiry
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

exports.getAllInquiries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    // 🔍 Search Filter
    const searchFilter = search
      ? {
        $or: [
          { memberId: { $regex: search, $options: "i" } },
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { destination: { $regex: search, $options: "i" } },
          { travelDate: { $regex: search, $options: "i" } }
        ]
      }
      : {};

    // 👉 Total count (with search)
    const total = await TripInquiry.countDocuments(searchFilter);

    // 👉 Data fetch
    const inquiries = await TripInquiry.find(searchFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data: inquiries
    });

  } catch (error) {
    console.error("Get Inquiries Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllInquiriesByUser = async (req, res) => {

  try {

    const { userId } = req.query;

    const inquiries = await tripService.getAllInquiries(userId);

    res.json({
      success: true,
      data: inquiries
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.getInquiryById = async (req, res) => {

  try {

    const inquiry = await tripService.getInquiryById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found"
      });
    }

    res.json({
      success: true,
      data: inquiry
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.updateInquiry = async (req, res) => {

  try {

    const inquiry = await tripService.updateInquiry(req.params.id, req.body);

    res.json({
      success: true,
      message: "Inquiry updated",
      data: inquiry
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.deleteInquiry = async (req, res) => {

  try {

    await tripService.deleteInquiry(req.params.id);

    res.json({
      success: true,
      message: "Inquiry deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};