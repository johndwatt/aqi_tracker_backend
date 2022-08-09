const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    city: { type: String },
    state: { type: String },
    air_quality: { type: Number },
  },
  { timestamps: true }
);

locationSchema.index({createdAt: 1}, {expireAfterSeconds: 10800});

const location = mongoose.model('location', locationSchema);

module.exports = location;