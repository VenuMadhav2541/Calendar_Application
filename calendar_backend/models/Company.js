const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  linkedIn: String,
  emails: String,
  phoneNumbers: String,
  comments: String,
  periodicity: String,
  communications: [ {
    type: new mongoose.Schema({
      type: { type: String, required: true },  // Communication type (e.g., 'email', 'call')
      date: { 
        type: Date,  // Ensure it's a Date type
        required: true,  // Make it required
        validate: {
          validator: function(value) {
            return !isNaN(Date.parse(value));  // Validate that the date is valid
          },
          message: 'Invalid date format for next communication.',
        },
      },
      notes: { type: String, required: true },
    }),
  },],
  nextCommunication: {
    type: new mongoose.Schema({
      type: { type: String, required: true },  // Communication type (e.g., 'email', 'call')
      date: { 
        type: Date,  // Ensure it's a Date type
        required: true,  // Make it required
        validate: {
          validator: function(value) {
            return !isNaN(Date.parse(value));  // Validate that the date is valid
          },
          message: 'Invalid date format for next communication.',
        },
      },
    }),
  },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
