const Hospital = require("../models/Hospital");
const Psychiatrist = require("../models/Psychiatrist");
const Patient = require("../models/Patient");
require('../config/db');
const getHospitalById = async (req, res) => {
  try {
    const hospitalid = req.params.hospitalid;
    if (!hospitalid) {
      return res.status(404).json({ error: 'Hospital ID is required' });
    }
    // Find hospital by ID
    const hospital = await Hospital.findOne({ 'hospitalid': hospitalid });
    if (!hospital) {     
        // Send a response indicating that the hospital ID does not exist
        return res.status(404).json({ error: "Invalid Hospital ID" });
    }
    // Fetch related data (you can customize this based on your data model)
    const psychiatrists = await Psychiatrist.find({ 'hospitalid': hospital.hospitalid });
    const patients = await Patient.find({ 'psychiatristid': { $in: psychiatrists.map(p => p.psychiatristid) } });
    // Calculate the total patients count
    const totalPatientsCount = patients.length;
    // Construct the response object
    const response = {
        hospitalName: hospital.name,
        totalPsychiatristCount: psychiatrists.length,
        totalPatientsCount,
        psychiatrists: psychiatrists.map(psychiatrist => {
            const psychiatristPatients = patients.filter(patient => patient.psychiatristid.toString() === psychiatrist.psychiatristid.toString());
            return {
                psychiatristid: psychiatrist.psychiatristid,
                name: psychiatrist.name,
                patientsCount: psychiatristPatients.length,
                patients: psychiatristPatients.map(patient => ({
                    patientid: patient.patientid,
                    name: patient.name,
                })),
            };
        }),
    };
    // Send the response
    res.json(response);
} catch (error) {
    console.error('Error fetching hospital details:', error);
    // Send an error response
    res.status(500).json({ error: "Internal Server Error" });
}
};

const registration = async (req, res) => {
  try {
    const { patientid, name, address, email, phone, password,psychiatristid } = req.body;
    const filename = req.file ? req.file.filename : null;
    // Create a new Patient document and validate it
    const result = await Patient.create({
      patientid, psychiatristid, name, address, email, phone, password, 'photo':filename
    });
    // Send a success response
    res.status(201).json("Patient Registration Successful");
  } catch (error) {
    // Handle validation and duplicate key errors
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      Object.keys(error.errors).forEach(field => {
        validationErrors[field] = error.errors[field].message;
      });
      res.status(400).json({ errors: validationErrors });
    } else if (error.code === 11000 && error.keyPattern && error.keyPattern.patientid) {
      // Handle duplicate key error for id field
      res.status(400).json({ error: 'ID already exists' });
    } else if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      // Handle duplicate key error for email field
      res.status(400).json({ error: 'Email address already exists' });
    } else {
      res.status(501).json("Something went wrong.");
    }
  }
};

module.exports = { getHospitalById, registration };