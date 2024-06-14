import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState({status:'',message:''})
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
      setResponse({status:'error',message:"All inputs are required!"})
    } else {
      axios.post('users/register/', {
        username, password, email, role
      }).then(res => {
        if (res.data.status) {
          setResponse({status:'success',message:res.data.role+" account created successfully"})
          setUsername('')
          setEmail('')
          setPassword('')
          setRole('')
        } else {
          setResponse({status:'error',message:res.data.message})
        }
      })
        .catch(err => setResponse({status:'success',message:err.message}))
    }
  };

  return (
    <div className="row justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="col-md-6 col-lg-4">
        <div className="card ">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h2 className="text-center">Sign Up</h2>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-bold">Username</label>
                <input required type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email address</label>
                <input required type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label fw-bold">Role</label>
                <select required className="form-select" aria-label="Default select example" id='role' value={role} onChange={(e) => setRole(e.target.value)}>
                  <option>Select a role</option>
                  {
                    roles.map((rolee, index) => <option key={index} value={rolee}>{rolee}</option>)
                  }
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Password</label>
                <input required type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary fw-bold">Submit</button>
            </form>
            <div className="mt-1 text-center">
              <small className={response.status=='success'?'text-success':'text-danger'}>{response.message && response.message}</small>
            </div>
            <hr />
            <div className="mt-4 text-center">
              <p>
                Already have an account?{' '}
                <Link to="/" className="text-primary">
                  Sign In
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