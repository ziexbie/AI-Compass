const { Schema, model } = require('../connection');

const ratingSchema = new Schema({
  toolId: { type: mongoose.Schema.Types.ObjectId, ref: "Tool", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = model("Ratings", ratingSchema);