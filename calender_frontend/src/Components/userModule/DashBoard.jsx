import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Tooltip } from 'react-tooltip';
import axios from 'axios';
import Head from '../NavBar/Head';

function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [communicationTypes, setCommunicationTypes] = useState([]); // New state for dropdown options
  const [newCommunication, setNewCommunication] = useState({
    type: '',
    date: '',
    notes: ''
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    const fetchCommunicationTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/communicationMethods'); // Fetch from backend
        setCommunicationTypes(response.data);
      } catch (error) {
        console.error('Error fetching communication methods:', error);
      }
    };

    fetchCompanies();
    fetchCommunicationTypes(); // Fetch methods on mount
  }, []);

  const handleSelectCompany = (id) => {
    if (selectedCompanies.includes(id)) {
      setSelectedCompanies(selectedCompanies.filter((companyId) => companyId !== id));
    } else {
      setSelectedCompanies([...selectedCompanies, id]);
    }
  };

  const handleAddCommunication = async () => {
    try {
      if (!newCommunication.type || !newCommunication.date || !newCommunication.notes) {
        console.error("Incomplete communication data");
        return;
      }

      const date = new Date(newCommunication.date);
      if (isNaN(date.getTime())) {
        console.error("Invalid date");
        return;
      }

      const communicationData = {
        type: newCommunication.type,
        date: date,
        notes: newCommunication.notes,
      };

      for (const companyId of selectedCompanies) {
        await axios.put(
          `http://localhost:5000/api/dashboard/updateCommunication/${companyId}`,
          { communication: communicationData }
        );
      }

      setShowModal(false);
      setNewCommunication({ type: '', date: '', notes: '' });
      setSelectedCompanies([]);
    } catch (error) {
      console.error('Error logging communication:', error);
    }
  };

  const getColor = (date) => {
    const today = new Date();
    const targetDate = new Date(date);
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    if (targetDate < today) return 'red';
    if (targetDate.getTime() === today.getTime()) return 'yellow';
    return 'blue';
  };

  return (
    <div>
      <Head />
      <div className="dashboard">
        <table id="company">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Last Five Communications</th>
              <th>Next Scheduled Communication</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id}>
                <td>{company.name}</td>
                <td>
                  {company.communications && company.communications.length > 0 ? (
                    company.communications.map((comm, index) => (
                      <span
                        key={index}
                        data-tooltip-id={`tooltip-${company._id}-${index}`}
                        style={{ marginRight: '10px', cursor: 'pointer' }}
                      >
                        {comm.type} ({new Date(comm.date).toDateString()})
                        <Tooltip id={`tooltip-${company._id}-${index}`}>
                          {comm.notes || 'No notes available'}
                        </Tooltip>
                      </span>
                    ))
                  ) : (
                    <span>No Communication yet</span>
                  )}
                </td>
                <td>
                  {company.nextCommunication
                    ? `${company.nextCommunication.type} (${new Date(company.nextCommunication.date).toDateString()})`
                    : 'No upcoming communications'}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCompanies.includes(company._id)}
                    onChange={() => handleSelectCompany(company._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn-grad btn-grad-p" onClick={() => setShowModal(true)}>
          Communication Performed
        </button>

        {showModal && (
          <div className="modal">
            <div className="main_head">
              <h2>Log Communication</h2>
            </div>
            <div className="center">
              <select
                value={newCommunication.type}
                onChange={(e) =>
                  setNewCommunication({ ...newCommunication, type: e.target.value })
                }
              >
                <option value="">Select Communication Type</option>
                {communicationTypes.map((method) => (
                  <option key={method._id} value={method.name}>
                    {method.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={newCommunication.date}
                className="date-input"
                onChange={(e) =>
                  setNewCommunication({ ...newCommunication, date: e.target.value })
                }
              />
              <textarea
                value={newCommunication.notes}
                onChange={(e) =>
                  setNewCommunication({ ...newCommunication, notes: e.target.value })
                }
              />
            </div>
            <div className="center">
              <button className="btn-grad btn-grad-s" onClick={handleAddCommunication}>
                Log Communication
              </button>
              <button className="btn-grad btn-grad-c" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="Notification">
        <div className="main_head">
          <h1>Notification</h1>
        </div>
        <div className="center">
          <div className="card">
            <div className="main_head">
              <h2>Overdue Communications</h2>
            </div>
            <ul>
              {companies
                .filter((c) => getColor(c.nextCommunication.date) === 'red')
                .map((c) => (
                  <div className="row" key={c.id}>
                    <p>&#10067;</p>
                    <li>
                      {c.name} - {c.nextCommunication.type} ({c.nextCommunication.date})
                    </li>
                  </div>
                ))}
            </ul>
          </div>
          <div className="card">
            <div className="main_head">
              <h2>Today's Communications</h2>
            </div>
            <ul>
              {companies
                .filter((c) => getColor(c.nextCommunication.date) === 'yellow')
                .map((c) => (
                  <div className="row" key={c.id}>
                    <p>&#9989;</p>
                    <li>
                      {c.name} - {c.nextCommunication.type} ({c.nextCommunication.date})
                    </li>
                  </div>
                ))}
            </ul>
          </div>
          <div className="card">
            <div className="main_head">
              <h2>Next Communications</h2>
            </div>
            <ul>
              {companies
                .filter((c) => getColor(c.nextCommunication.date) === 'blue')
                .map((c) => (
                  <div className="row" key={c.id}>
                    <p>&#10071;</p>
                    <li>
                      {c.name} - {c.nextCommunication.type} ({c.nextCommunication.date})
                    </li>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
