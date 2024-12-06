import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess, loginFailure } from '../redux/authSlice';

const AuthorizationForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login/register

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isRegistering) {
        // Register API call
        const response = await axios.post('https://dummyjson.com/auth/register', {
          username,
          password,
          email,
        });

        const { user, token } = response.data;
        dispatch(loginSuccess({ user, token }));

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Redirect after successful registration
        window.location.href = '/dashboard'; // Example redirection
      } else {
        // Login API call
        const response = await axios.post('https://dummyjson.com/auth/login', {
          username,
          password,
        });

        const { user, token } = response.data;
        dispatch(loginSuccess({ user, token }));

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Redirect after successful login
        window.location.href = '/dashboard'; // Example redirection
      }
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'An error occurred'));
      setError('Error occurred during submission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{isRegistering ? 'Create an Account' : 'Sign In'}</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {isRegistering && (
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full p-3 bg-teal-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (isRegistering ? 'Registering...' : 'Logging in...') : isRegistering ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {isRegistering ? (
          <>
            Already have an account?{' '}
            <button onClick={() => setIsRegistering(false)} className="text-teal-600 hover:underline">Login here</button>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <button onClick={() => setIsRegistering(true)} className="text-teal-600 hover:underline">Register here</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthorizationForm;
    