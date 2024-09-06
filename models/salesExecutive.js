const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesExecutiveSchema = new Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Number,
  gender: String,
  experienceYears: String,
});

module.exports = mongoose.model("SalesExecutive", salesExecutiveSchema);
