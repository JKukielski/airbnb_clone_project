import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
});

const Place = mongoose.model('Place', PlaceSchema);
export default Place;
