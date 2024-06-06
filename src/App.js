import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Components
import LoginForm from './pages/LoginForm';
import HRDashboard from './pages/HRDashboard';
import TeamLeadDashboard from './pages/TeamLeadDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import RegistrationForm from './pages/RegistrationForm';

// Roles
const ROLES = {
  HR: 'hr',
  TEAM_LEAD: 'team_lead',
  EMPLOYEE: 'employee',
};

function App() {
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username, password, role) => {
    // Handle login logic here
    // For demo purposes, assume login is successful
    setRole(role);
    setIsLoggedIn(true);
    localStorage.setItem('role', role);
  };

  const handleLogout = () => {
    setRole(null);
    setIsLoggedIn(false);
    localStorage.removeItem('role');
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={isLoggedIn ? role === ROLES.EMPLOYEE && (
          <EmployeeDashboard onLogout={handleLogout} />
        ) || role === ROLES.TEAM_LEAD && (
          <TeamLeadDashboard onLogout={handleLogout} />
        ) || role === ROLES.HR && (
          <HRDashboard onLogout={handleLogout} />
        ) : <LoginForm handleLogin={handleLogin} />
        } />
        <Route path='registration' element={<RegistrationForm />}/>
      </Routes>
    </Router>
  );
}

export default App;