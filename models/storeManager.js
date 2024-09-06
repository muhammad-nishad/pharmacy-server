const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeManagerSchema = new Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('StoreManager', storeManagerSchema);