const mongoose = require('mongoose');

const psychiatristSchema = new mongoose.Schema({
  psychiatristid: { type: String, required: true }, // Custom ID
  name: { type: String, required: true },
  hospitalid: { type: String, ref: 'Hospital', required: true },
});

const Psychiatrist = mongoose.model('Psychiatrist', psychiatristSchema);

module.exports = Psychiatrist;