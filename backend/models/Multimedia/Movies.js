// models/Movie.js
import Media from './Media.js';
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  duration: Number,
  director: String
});

export default Media.discriminator('Movie', movieSchema);
