import React, { useState, useEffect } from 'react';
import './user.css';
// import { Atom } from 'react-loading-indicators';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios'; // Import axios for making API requests
import Head from '../NavBar/Head';
import Loading from '../Loading'; // Import your Loading component

const localizer = momentLocalizer(moment);

function Calender() {
  const [companies, setCompanies] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [newCommunication, setNewCommunication] = useState({
    type: 'LinkedIn Post',
    date: '',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Fetch companies and communications from the server
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://calendar-application-7sna.onrender.com/api/companies'); // Replace with your API endpoint
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setIsLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchCompanies();
  }, []); // Fetch data when component mounts

  // Map next communication dates to calendar events
  useEffect(() => {
    const mappedEvents = companies.flatMap(company => {
      const companyEvents = [];

      // Check if there is a next communication date
      if (company.nextCommunication && company.nextCommunication.date) {
        companyEvents.push({
          title: `${company.name}: ${company.nextCommunication.type}`,
          start: new Date(company.nextCommunication.date),
          end: new Date(company.nextCommunication.date),
          color: getColor(company.nextCommunication.date)
        });
      }

      return companyEvents;
    });

    setEvents(mappedEvents);
  }, [companies]); // Update events whenever companies change

  // Get color based on the date
  const getColor = (date) => {
    const today = new Date();
    const targetDate = new Date(date);
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    if (targetDate < today) return 'red'; // Past date: red
    if (targetDate.getTime() === today.getTime()) return 'yellow'; // Today: yellow
    return 'blue'; // Future date: blue
  };

  // Add communication to the selected company
  const handleAddCommunication = () => {
    if (!selectedCompany) return;

    const updatedCompanies = companies.map(company => {
      if (company._id === selectedCompany._id) {
        return {
          ...company,
          communications: [...company.communications, newCommunication],
          nextCommunication: null // Ensure nextCommunication is updated accordingly
        };
      }
      return company;
    });

    setCompanies(updatedCompanies);
    setSelectedCompany(null);
    setNewCommunication({ type: 'LinkedIn Post', date: '', notes: '' });
  };

  return (
    <div className="UserDashboard">
      <Head />

      <div>
        <div className="main_head">
          <h1>Calendar</h1>
        </div>

        <div className="center">
          {isLoading ? (
            <Loading /> // Display loading spinner while fetching data
          ) : (
            <Calendar
              localizer={localizer}
              className="calendar"
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              date={currentDate}
              onNavigate={(date) => setCurrentDate(date)} // Update state when navigating
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.color,
                },
              })}
              views={['month', 'week', 'day', 'agenda']}
              defaultView="month"
              toolbar={true}
              step={30}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Calender;
