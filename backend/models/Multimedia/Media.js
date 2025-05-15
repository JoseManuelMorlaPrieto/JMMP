// models/Media.js
import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  synopsis: String,
  releaseYear: Number,
  genres: [String],
  createdAt: { type: Date, default: Date.now }
}, { discriminatorKey: 'type', collection: 'media' });

export default mongoose.model('Media', mediaSchema);
