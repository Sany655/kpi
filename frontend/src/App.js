import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

// Components
import LoginForm from './pages/LoginForm';
import HRDashboard from './pages/HRDashboard';
import TeamLeadDashboard from './pages/TeamLeadDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import RegistrationForm from './pages/RegistrationForm';
import axios from 'axios';
import Header from './components/Header';

// Roles
const ROLES = {
  HR: 'hr',
  TEAM_LEAD: 'team_lead',
  EMPLOYEE: 'employee',
};

function App() {
  axios.defaults.baseURL = "http://localhost:8000/api/"
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
      setIsLoggedIn(auth);
    }
  }, [isLoggedIn?.status]);

  const handleLogout = () => {
    setIsLoggedIn(null);
    localStorage.removeItem('auth');
  };

  return (
    <Router>
      <Header handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <div className='container'>
        <Routes>
          <Route exact path="/" element={isLoggedIn?.status ? isLoggedIn.role === ROLES.EMPLOYEE && (
            <EmployeeDashboard onLogout={handleLogout} />
          ) || isLoggedIn.role === ROLES.TEAM_LEAD && (
            <TeamLeadDashboard onLogout={handleLogout} />
          ) || isLoggedIn.role === ROLES.HR && (
            <HRDashboard onLogout={handleLogout} />
          ) : <LoginForm setIsLoggedIn={setIsLoggedIn} />
          } />
          <Route path='registration' element={<RegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;