// ===============================
// Validation: Membership Plan (create / update)
// ===============================
// No validation library is used elsewhere in this project, so this follows
// the same manual-check style used in the existing controllers.

const MAX_CUSTOM_FIELDS = 20;

const isNonEmptyString = (val) => typeof val === "string" && val.trim().length > 0;

const isValidNumber = (val) => typeof val === "number" && !Number.isNaN(val);

const validateBenefits = (benefits) => {
  if (benefits === undefined) return null;

  if (!Array.isArray(benefits)) {
    return "benefits must be an array of strings";
  }

  if (!benefits.every((b) => typeof b === "string")) {
    return "Each benefit must be a string";
  }

  return null;
};

const validateCustomFields = (customFields) => {
  if (customFields === undefined) return null;

  if (!Array.isArray(customFields)) {
    return "customFields must be an array of { label, value } objects";
  }

  if (customFields.length > MAX_CUSTOM_FIELDS) {
    return `customFields cannot have more than ${MAX_CUSTOM_FIELDS} entries`;
  }

  for (const field of customFields) {
    if (
      !field ||
      typeof field !== "object" ||
      !isNonEmptyString(field.label) ||
      !isNonEmptyString(field.value)
    ) {
      return "Each customField must have a non-empty 'label' and 'value'";
    }
  }

  return null;
};


// ===============================
// Validate Create Membership Plan
// ===============================
exports.validateCreateMembershipPlan = (req, res, next) => {

  const { name, price, nights, days, benefits, customFields } = req.body;

  const errors = [];

  if (!isNonEmptyString(name)) {
    errors.push("name is required and must be a non-empty string");
  }

  if (!isValidNumber(price) || price < 0) {
    errors.push("price is required and must be a number >= 0");
  }

  if (!isValidNumber(nights) || nights <= 0) {
    errors.push("nights is required and must be a number greater than 0");
  }

  if (days !== undefined && (!isValidNumber(days) || days < 0)) {
    errors.push("days must be a number >= 0");
  }

  const benefitsError = validateBenefits(benefits);
  if (benefitsError) errors.push(benefitsError);

  const customFieldsError = validateCustomFields(customFields);
  if (customFieldsError) errors.push(customFieldsError);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  next();

};


// ===============================
// Validate Update Membership Plan
// ===============================
exports.validateUpdateMembershipPlan = (req, res, next) => {

  const { name, price, nights, days, benefits, customFields, isActive } = req.body;

  const errors = [];

  if (name !== undefined && !isNonEmptyString(name)) {
    errors.push("name must be a non-empty string");
  }

  if (price !== undefined && (!isValidNumber(price) || price < 0)) {
    errors.push("price must be a number >= 0");
  }

  if (nights !== undefined && (!isValidNumber(nights) || nights <= 0)) {
    errors.push("nights must be a number greater than 0");
  }

  if (days !== undefined && (!isValidNumber(days) || days < 0)) {
    errors.push("days must be a number >= 0");
  }

  if (isActive !== undefined && typeof isActive !== "boolean") {
    errors.push("isActive must be a boolean");
  }

  const benefitsError = validateBenefits(benefits);
  if (benefitsError) errors.push(benefitsError);

  const customFieldsError = validateCustomFields(customFields);
  if (customFieldsError) errors.push(customFieldsError);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  next();

};
