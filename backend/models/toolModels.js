const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  status: { type: Boolean, default: true },
  rejected: { type: Boolean, default: false },
  logo: String
});

module.exports = mongoose.model("Tool", toolSchema);