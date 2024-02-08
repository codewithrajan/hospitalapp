const mongoose = require('mongoose')
const patientSchema = new mongoose.Schema({
  patientid: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
    validate: {
      validator: async function (value) {
        const existingPatient = await this.constructor.findOne({ id: value });
        return !existingPatient;
      },
      message: 'ID must be unique. This ID is already in use.'
    }
  },
  name: { type: String, required: [true, 'Name is required'], minlength: [2, 'Name should be at least 2 characters'] },
  address: { type: String, required: [true, 'Address is required'], minlength: [10, 'Address should be at least 10 characters'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phone: { type: String, required: [true, 'Phone Number  is required'],minlength: [10, 'Phone number should be at least 10 digits ']
  ,maxlength: [10, 'Phone number should be maximum 10 digits ']
 },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password should be at least 8 characters'],
    maxlength: [15, 'Password should not exceed 15 characters'],
    validate: {
      validator: function (value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/.test(value);
      },
      message: props => 'Password must contain at least one lowercase letter, one uppercase letter, and one digit!'
    }
  },
  photo: { type: String, required: [true, 'Patient photo is required'] },
  psychiatristid: {
    type: String,
    ref: 'Psychiatrist',
    required: [true, 'Psychiatrist is required'],
    validate: {
      validator: async function (value) {
        // Check if the referenced Psychiatrist exists
        const existingPsychiatrist = await mongoose.model('Psychiatrist').findOne({ psychiatristid: value });
        return !!existingPsychiatrist;
      },
      message: 'Invalid Psychiatrist ID. Please provide a valid Psychiatrist ID.'
    }
  }, // Reference to Psychiatrist schema
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient
