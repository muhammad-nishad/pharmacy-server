const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesExecutiveSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  experienceYears: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("SalesExecutive", salesExecutiveSchema);
