import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/',{
      username,password
    }).then(res => console.log(res))
    .catch(err => console.log(err))
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-96">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
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
              Don't have an account?{' '}
              <Link to="registration" className="text-blue-500 hover:text-blue-800">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;