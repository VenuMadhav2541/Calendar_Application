import React, { useState, useEffect } from 'react';
import AdminNav from '../NavBar/AdminNav';
import axios from 'axios';

const AdminModule = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    location: '',
    linkedIn: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    periodicity: '',
    communications: [],
    nextCommunication: { type: '', date: '' },  // Ensure valid date format
  });

  const [editCompany, setEditCompany] = useState(null);

  useEffect(() => {
    // Fetch companies from the server
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editCompany) {
      setEditCompany({ ...editCompany, [name]: value });
    } else {
      setNewCompany({ ...newCompany, [name]: value });
    }
  };

  const handleNextCommunicationChange = (e) => {
    const { name, value } = e.target;
    if (editCompany) {
      setEditCompany({
        ...editCompany,
        nextCommunication: {
          ...editCompany.nextCommunication,
          [name]: value
        }
      });
    } else {
      setNewCompany({
        ...newCompany,
        nextCommunication: {
          ...newCompany.nextCommunication,
          [name]: value
        }
      });
    }
  };

 const addCompany = async (e) => {
  e.preventDefault();
  // Ensure nextCommunication.date is a valid Date string
  if (newCompany.nextCommunication.date && !Date.parse(newCompany.nextCommunication.date)) {
    alert("Please enter a valid date.");
    return;
  }

  const companyData = {
    ...newCompany,
    nextCommunication: {
      type: newCompany.nextCommunication.type,
      date: new Date(newCompany.nextCommunication.date).toISOString(), // Ensure it's a valid ISO date string
    },
  };

  try {
    const response = await axios.post('http://localhost:5000/api/companies', companyData);
    setCompanies([...companies, response.data]);
    setNewCompany({
      name: '',
      location: '',
      linkedIn: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      periodicity: '',
      communications: [],
      nextCommunication: { type: '', date: '' },
    });
  } catch (error) {
    console.error('Error adding company:', error.response ? error.response.data : error.message);
  }
};

const deleteCompany = async (id) => {
  console.log('Deleting company with id:', id);  // Log the id being passed
  try {
    const response = await axios.delete(`http://localhost:5000/api/companies/${id}`);
    // Update the UI by removing the deleted company from the list
    setCompanies(companies.filter(company => company._id !== id));
  } catch (error) {
    console.error('Error deleting company:', error);
  }
};


  const startEdit = (company) => {
    setEditCompany(company);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    
    if (!editCompany || !editCompany._id) {
      console.error("Company id is missing");
      return; // Ensure the id is available before making the request
    }
  
    try {
      const response = await axios.put(`http://localhost:5000/api/companies/${editCompany._id}`, editCompany);
      setCompanies(companies.map(comp => comp._id === editCompany._id ? response.data : comp));
      setEditCompany(null); // Reset after saving changes
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
  

  return (
    <div>
      <AdminNav />
      <div>
        <div className="main_head margin_top">
          <h1 className='drop-in'>Company<span style={{ color: 'rgb(110, 77, 255)' }}>  Management</span></h1>
        </div>
        <form className='form_Admin'>
          <input name="name" placeholder="Name" value={editCompany ? editCompany.name : newCompany.name} onChange={handleInputChange} />
          <input name="location" placeholder="Location" value={editCompany ? editCompany.location : newCompany.location} onChange={handleInputChange} />
          <input name="linkedIn" placeholder="LinkedIn Profile" value={editCompany ? editCompany.linkedIn : newCompany.linkedIn} onChange={handleInputChange} />
          <input name="emails" placeholder="Emails" value={editCompany ? editCompany.emails : newCompany.emails} onChange={handleInputChange} />
          <input name="phoneNumbers" placeholder="Phone Numbers" value={editCompany ? editCompany.phoneNumbers : newCompany.phoneNumbers} onChange={handleInputChange} />
          <input name="comments" placeholder="Comments" value={editCompany ? editCompany.comments : newCompany.comments} onChange={handleInputChange} />
          <input name="periodicity" placeholder="Periodicity" value={editCompany ? editCompany.periodicity : newCompany.periodicity} onChange={handleInputChange} />
          {/* Next Communication Fields */}
          <input 
            name="type" 
            placeholder="Communication Type" 
            value={editCompany ? editCompany.nextCommunication.type : newCompany.nextCommunication.type} 
            onChange={handleNextCommunicationChange} 
          />
          <input 
            name="date" 
            placeholder="Next Communication Date" 
            type="date" 
            value={editCompany ? editCompany.nextCommunication.date : newCompany.nextCommunication.date} 
            onChange={handleNextCommunicationChange} 
          />
          {editCompany ? (
            <button className='btn-grad btn-grad-p' onClick={saveEdit}>Save Changes</button>
          ) : (
            <button className='btn-grad btn-grad-p' onClick={addCompany}>Add Company</button>
          )}
        </form>
        <div className="dashboard overflow-hidden">
          <table id='company' className='drop-in'>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Communication Type</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
  {companies.map((company) => (
    <tr key={company._id}> {/* Ensure there's no whitespace or line breaks between <tr> and its children */}
      <td>{company.name}</td>
      <td>{company.nextCommunication?.type}</td>
      <td>{company.nextCommunication?.date}</td>
      <td>
        <button className='btn-grad btn-grad-s' onClick={() => startEdit(company)}>Edit</button>
      </td>
      <td>
        <button className='btn-grad btn-grad-c' onClick={() => deleteCompany(company._id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminModule;
