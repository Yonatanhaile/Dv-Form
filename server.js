require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define Schema
const PersonalInfoSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  gender: String,
  birthDate: Date,
  birthYear: Number,
  birthCity: String,
  birthCountry: String,
  currentCity: String,
  district: String,
  addressLine: String,
  country: String,
  phoneNumber: String,
  email: String,
  education: String,
  maritalStatus: String,
  children: Number
});

// Create model
const PersonalInfo = mongoose.model('PersonalInfo', PersonalInfoSchema);

// POST route to save form data


// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/", function(req, res){
  const newPerson = new PersonalInfo({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    birthYear: req.body.birthYear,
    birthCity: req.body.birthCity,
    birthCountry: req.body.birthCountry,
    currentCity: req.body.currentCity,
    district: req.body.district,
    addressLine: req.body.addressLine,
    country: req.body.country,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    education: req.body.education,
    maritalStatus: req.body.maritalStatus,
    children: req.body.children
  });
  
  // Save the new person to the database
  newPerson.save()
  .then(() => {
    res.sendFile(path.join(__dirname, 'public', 'success.html'));
  })
  .catch((err) => {
    res.sendFile(path.join(__dirname, 'public', 'failur.html'));
  });
})

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});