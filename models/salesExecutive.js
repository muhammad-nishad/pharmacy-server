const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesExecutiveSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Number, required: true },
  gender: { type: String, required: true },
  experienceYears: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("SalesExecutive", salesExecutiveSchema);
