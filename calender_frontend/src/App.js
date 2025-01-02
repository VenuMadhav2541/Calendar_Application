// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage/LoginPage';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import UserModule from './Components/userModule/UserModule';
import Dashboard from './Components/userModule/DashBoard';
import ReportingModule from './Components/userModule/ReportingModule';
import About from './Components/userModule/About';
import CommunicationMethodManagement from './Components/AdminPanel/CommunicationMethodManagement'
import CompanyManagement from './Components/AdminPanel/CompanyManagement'
import Events from './Components/userModule/Events';
import RegisterPage from './Components/LoginPage/RegisterPage';
const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/companyManagement" element={<CompanyManagement/>} />
        <Route path="/communication" element={<CommunicationMethodManagement />} />
        <Route path="/user" element={<Dashboard />} />
        <Route path="/calendar" element={<UserModule />} />
        <Route path="/report" element={<ReportingModule/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
