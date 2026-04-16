const TripInquiry = require("../models/tripInquiry.model");

exports.createInquiry = async (data) => {
  return await TripInquiry.create(data);
};

exports.getAllInquiries = async (userId) => {

  const filter = {};

  if (userId) {
    filter.userId = userId;
  }

  return await TripInquiry
    .find(filter)
    .sort({ createdAt: -1 });

};

exports.getInquiryById = async (id) => {
  return await TripInquiry.findById(id);
};

exports.updateInquiry = async (id, data) => {
  return await TripInquiry.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteInquiry = async (id) => {
  return await TripInquiry.findByIdAndDelete(id);
};