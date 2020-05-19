var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text: String,
  color: String,
  fontSize: { type: Number, min: 2, max: 144 },
  backgroundColor: String,
  borderColor: String,
  borderWidth: { type: Number, min: 0, max: 100 },
  borderRadius: { type: Number, min: 0, max: 100 },
  padding: { type: Number, min: 0, max: 100 },
  height: { type: Number, min: 0, max: 900 },
  width: { type: Number, min: 0, max: 570 },
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);