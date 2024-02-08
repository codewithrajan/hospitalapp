const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  hospitalid: { type: String, required: true, unique: true }, // Custom ID
  name: { type: String, required: true },
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
