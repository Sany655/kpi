import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const roles = [
    'hr',
    'team_lead',
    'employee',
  ];
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/',{
        username,password,email,role
      }).then(res => console.log(res))
      .catch(err => console.log(err))
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <select
              id="role"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setRole(e.target.value)}
            >
                <option>{role||'Select a role'}</option>
                {
                    roles.map((rolee,index) => <option key={index} value={rolee} selected={(rolee==role)}>{rolee}</option>)

                }
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
            >
              Sign In
            </button>
            <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Forgot Password?
            </a>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-500">
              Have already an account?
              <Link to="/" className="text-blue-500 hover:text-blue-800">
                Signin
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;