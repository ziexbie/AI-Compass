const { Schema, model, Types } = require('../connection');

const ratingSchema = new Schema({
  toolId: { type: Types.ObjectId, ref: "Tool", required: true },
  userId: { type: Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = model("Ratings", ratingSchema);