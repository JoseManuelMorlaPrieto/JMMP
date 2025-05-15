// models/Serie.js
import Media from './Media.js';
import mongoose from 'mongoose';

const serieSchema = new mongoose.Schema({
  seasons: Number,
  episodesPerSeason: Number
});

export default Media.discriminator('Serie', serieSchema);
