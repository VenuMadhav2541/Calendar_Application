import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';  
import { CSVLink } from 'react-csv';
import axios from 'axios';
import './admin.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement, 
} from 'chart.js';
import AdminNav from '../NavBar/AdminNav';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement  
);

const ReportingModule = () => {
  const [companies, setCompanies] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from database
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://calendar-application-7sna.onrender.com/api/companies');
        setCompanies(response.data);
        setFilteredCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // Filter logic
  useEffect(() => {
    if (filter) {
      setFilteredCompanies(
        companies.filter(company => company.name.toLowerCase().includes(filter.toLowerCase()))
      );
    } else {
      setFilteredCompanies(companies);
    }
  }, [filter, companies]);

  // Calculate communication frequency
  const getCommunicationFrequency = () => {
    const frequency = {};
    companies.forEach(company => {
      company.communications.forEach(communication => {
        if (frequency[communication.type]) {
          frequency[communication.type]++;
        } else {
          frequency[communication.type] = 1;
        }
      });
    });
    return frequency;
  };

  const communicationData = getCommunicationFrequency();
  const communicationLabels = Object.keys(communicationData);
  const communicationValues = Object.values(communicationData);

  const chartData = {
    labels: communicationLabels,
    datasets: [
      {
        label: 'Communication Frequency',
        data: communicationValues,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Communication Report', 20, 10);
    
    if (companies.length === 0) {
      doc.text('No data available', 20, 20);
    } else {
      doc.autoTable({
        head: [['Company', 'Next Communication', 'Total Communications']],
        body: companies.map(company => [
          company.name,
          company.nextCommunication?.type + ' on ' + company.nextCommunication?.date,
          company.communications.length
        ])
      });
    }

    doc.save('communication_report.pdf');
  };

  return (
    <div className='UserDashboard'>
      <AdminNav />
      <div className="main_head">
        <h1>Reports</h1>        
      </div>

      <div className='center'>
        <label>Filter by Company Name: </label>
        <input
          type="text"
          id='report'
          placeholder="Enter company name"
          value={filter}
          style={{color : "black"}}
          onChange={(e) => setFilter(e.target.value)}
        />

        <div>
          <div className="row margin">
            <CSVLink data={filteredCompanies} filename={"communications.csv"} className='btn-grad btn-grad-p'>
              Download CSV
            </CSVLink>
            <button className='btn-grad btn-grad-p' onClick={generatePDF}>Download PDF</button>
          </div>
        </div>
      </div>

      <div className="center">
        <div className='card2'>
          <div className="main_head">
            <h3>Engagement Effectiveness Dashboard</h3>      
          </div>
          <ul>
            {filteredCompanies.map(company => (
              <li key={company._id}>
                <strong>{company.name}</strong>: 
                {company.communications.map((comm, idx) => (
                  <div key={idx}>
                    <p>{comm.type} - {comm.date}</p>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>

        <div className='card2'>
          <div className="main_head">
            <h3>Real-Time Activity Log</h3>      
          </div>
          <ul>
            {filteredCompanies.flatMap(company =>
              company.communications.map((comm, idx) => (
                <li key={idx}>
                  {company.name} - {comm.type} on {comm.date}: {comm.notes}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="main_head">
        <h1>Analytics</h1>        
      </div>

      <div className="center">
        <div className='card2'>
          <div className="main_head">
            <h3>Communication Frequency Report</h3>        
          </div>
          {isLoading ? <p>Loading...</p> : <Line data={chartData} />}
        </div>
        <div className='card2'>
          <div className="main_head">
            <h3>Overdue Communication Trends</h3>      
          </div>
          {isLoading ? <p>Loading...</p> : 
            <Line
              data={{
                labels: filteredCompanies.map(company => company.name),
                datasets: [
                  {
                    label: 'Overdue Communications',
                    data: filteredCompanies.map(company => 
                      company.communications.filter(c => new Date(c.date) < new Date()).length
                    ),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                  }
                ]
              }}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default ReportingModule;
