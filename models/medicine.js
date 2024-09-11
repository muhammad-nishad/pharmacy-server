const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  deleted: { type: Boolean, default: false },

});

module.exports = mongoose.model('Medicine', medicineSchema);
