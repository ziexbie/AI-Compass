const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  toolId: { type: mongoose.Schema.Types.ObjectId, ref: "Tool", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Rating", ratingSchema);