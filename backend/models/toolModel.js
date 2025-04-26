const { Schema, model } = require('../connection');

const toolSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  status: { type: Boolean, default: true },
  rejected: { type: Boolean, default: false },
  logo: String
});

module.exports = model("Tools", toolSchema);