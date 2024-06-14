import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, seterror] = useState('')
  const [success, setSuccess] = useState('')
  const roles = [
    'hr',
    'team_lead',
    'employee',
  ];
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !email || !password || !role) {
      seterror("All inputs are required!")
    } else {
      seterror(null)
      axios.post('users/register/', {
        username, password, email, role
      }).then(res => seterror(null) & setSuccess(res.data?.status) & setUsername('') & setEmail('') & setPassword('') & setRole(''))
        .catch(err => seterror(err.message))
    }
  };

  return (
    <div className="row justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="col-md-6 col-lg-4">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h2 className="text-center">Signup</h2>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <select className="form-select" aria-label="Default select example" id='role' value={role} onChange={(e) => setRole(e.target.value)}>
                  <option>Select a role</option>
                  {
                    roles.map((rolee, index) => <option key={index} value={rolee}>{rolee}</option>)
                  }
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="mt-1 text-center">
              <small className={success?'text-success':'text-danger'}>{success ? "User created successfully" : error}</small>
            </div>
            <hr />
            <div className="mt-4 text-center">
              <p>
                Already have an account?{' '}
                <Link to="/" className="text-primary">
                  Signin
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;