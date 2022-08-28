const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    city: { type: String },
    state: { type: String },
    air_quality: { type: Number },
    expire_at: {type: Date, default: Date.now, expires: 10800},
  },
  { timestamps: true }
);

locationSchema.index({"expire_at": 1}, {expireAfterSeconds: 10800});

const location = mongoose.model('location', locationSchema);

module.exports = location;