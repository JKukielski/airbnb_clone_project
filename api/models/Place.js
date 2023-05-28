import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  address: String,
  photos: [{ type: String }],
  description: String,
  perks: [{ type: String }],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: Number,
});

const Place = mongoose.model('Place', PlaceSchema);
export default Place;
