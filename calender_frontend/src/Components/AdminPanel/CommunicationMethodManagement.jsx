import React, { useState, useEffect } from 'react';
import AdminNav from '../NavBar/AdminNav';
import './admin.css';
import defaultMethods from '../../Data/methods';
import Loading from '../Loading'; // Import the Loading component

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState([]);
  const [method, setMethod] = useState({ name: '', description: '', sequence: '', mandatory: false });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate data fetching with a delay
    const timer = setTimeout(() => {
      setMethods(defaultMethods); // Set the default methods after the delay
      setLoading(false); // Set loading to false after data is loaded
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.name === 'mandatory' ? e.target.checked : e.target.value;
    setMethod({ ...method, [e.target.name]: value });
  };

  const addMethod = () => {
    setMethods([...methods, method]);
    setMethod({ name: '', description: '', sequence: '', mandatory: false });
  };

  const deleteMethod = (index) => {
    const updatedMethods = methods.filter((_, i) => i !== index);
    setMethods(updatedMethods);
  };

  return (
    <div>
      <AdminNav />
      <div className="main_head margin_top">
        <h1 className="drop-in">
          Communication<span style={{ color: 'rgb(110, 77, 255)' }}> Method</span> Management
        </h1>
      </div>

      {/* Show loading spinner while data is being fetched */}
      {loading ? (
        <Loading />
      ) : (
        <div>
          <form className="form_Admin">
            <input
              className="input1 drop-in"
              name="name"
              placeholder="Name"
              value={method.name}
              onChange={handleInputChange}
            />
            <input
              className="input1 drop-in"
              name="description"
              placeholder="Description"
              value={method.description}
              onChange={handleInputChange}
            />
            <input
              className="input1 drop-in"
              name="sequence"
              type="number"
              placeholder="Sequence"
              value={method.sequence}
              onChange={handleInputChange}
            />
            <label className="drop-in">
              Mandatory: 
              <input
                className="input1 drop-in"
                name="mandatory"
                type="checkbox"
                checked={method.mandatory}
                onChange={handleInputChange}
              />
            </label>
            <button className="btn-grad btn-grad-p drop-in" type="button" onClick={addMethod}>
              Add Method
            </button>
          </form>

          <div className="dashboard overflow-hidden">
            <table id="company" className="drop-in">
              <thead>
                <tr>
                  <th>Method Name</th>
                  <th>Description</th>
                  <th>Sequence</th>
                  <th>Mandatory</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {methods.map((meth, index) => (
                  <tr key={index}>
                    <td>{meth.name}</td>
                    <td>{meth.description}</td>
                    <td>{meth.sequence}</td>
                    <td>{meth.mandatory.toString()}</td>
                    <td>
                      <button
                        className="btn-grad btn-grad-c"
                        onClick={() => deleteMethod(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationMethodManagement;
