// models/Rating.js
import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  media: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
  score: { type: Number, min: 0, max: 10, required: true },
  review: String
}, {
  timestamps: true,
  unique: true
});

ratingSchema.index({ user: 1, media: 1 }, { unique: true }); // evita rating duplicado

export default mongoose.model('Rating', ratingSchema);
