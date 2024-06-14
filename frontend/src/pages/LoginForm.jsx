import axios from 'axios';
import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('All inputs are required')
    }
    else {
      axios.post('users/login/', {
        username, password
      }).then(res => {
        if (res.data.status) {
          setError(null)
          localStorage.setItem('auth', JSON.stringify(res.data))
          setIsLoggedIn(res.data)
        } else {
          setError(res.data.message)
        }
      })
        .catch(err => setError(err.message))
    }
  };

  return (
    <div className="row justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="col-md-6 col-lg-4">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h2 className="text-center">Sign In</h2>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="mt-1 text-center">
              <small className='text-danger'>{error}</small>
            </div>
            <hr />
            <div className="mt-4 text-center">
              <p>
                Don't have an account?{' '}
                <Link to="registration" className="text-blue-500 hover:text-blue-800">
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;