// dashboardRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const Company = require('../models/Company');
const router = express.Router();

// PUT request to update communication for a specific company
// dashboardRoutes.js

router.put('/updateCommunication/:id', async (req, res) => {
    const companyId = req.params.id;
    console.log(req.body);
    // Check if the provided company ID is valid
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }
  
    const { communication } = req.body; // Destructure the communication object
  
    // Ensure communication data is provided
    if (!communication || !communication.type || !communication.date || !communication.notes) {
      return res.status(400).json({ message: 'Incomplete communication data at router' });
    }
  
    try {
      // Find the company by ID
      const company = await Company.findById(companyId);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      // Add the new communication to the company's communications array
      company.communications.push(communication);
      await company.save();
  
      res.status(200).json(company);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;
