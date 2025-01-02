const express = require('express');
const Company = require('../models/Company');
const router = express.Router();

// Create a new company
router.post('/', async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body
    try {
      const company = new Company(req.body);
      await company.save();
      res.status(201).json(company);
      console.log("data Received at the router")
    } catch (error) {
      console.error('Error:', error.message);
      res.status(400).json({ message: error.message });
    }
  });
  
// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single company by id
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a company
router.put('/:id', async (req, res) => {
  console.log('Request Params:', req.params); // Log params
  console.log('Request Body:', req.body); // Log body

  try {
    // Validate that body contains valid data (optional, can be expanded further)
    if (!req.body.name || !req.body.nextCommunication) {
      return res.status(400).json({ message: 'Missing required fields: name or nextCommunication.' });
    }

    // Update the company document using the provided data
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Use $set to update only the fields in req.body
      { new: true, runValidators: true } // Ensure new document and validation are applied
    );

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Send the updated company as the response
    res.status(200).json(company);
  } catch (error) {
    // Log the error message for debugging
    console.error('Error:', error.message);

    // Handle specific validation or other errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error: ' + error.message });
    }

    // Send a general error response
    res.status(400).json({ message: error.message });
  }
});




// Delete a company
router.delete('/:id', async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
