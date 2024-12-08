import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../../context/authSlice';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'; // Import eye icons

const AuthorizationForm = () => {
  const LOGIN_URL = 'https://dummyjson.com/auth/login';
  const REGISTER_URL = 'https://dummyjson.com/auth/register';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const apiUrl = isRegistering ? REGISTER_URL : LOGIN_URL;
    const payload = isRegistering
      ? { username: formData.username, password: formData.password, email: formData.email }
      : { username: formData.username, password: formData.password };

    try {
      const response = await axios.post(apiUrl, payload);
      const { user, token } = response.data;

      dispatch(loginSuccess({ user, token }));
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'An error occurred';
      dispatch(loginFailure(errorMsg));
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => setIsRegistering((prev) => !prev);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev); // Toggle function for password visibility

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {isRegistering ? 'Create an Account' : 'Sign In'}
      </h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        {['username', 'email', 'password'].map((field, idx) => 
          !isRegistering && field === 'email' ? null : (
            <div key={idx} className="mb-5">
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <div className="relative">
                <input
                  type={field === 'password' ? (showPassword ? 'text' : 'password') : 'text'} // Conditional input type for password
                  id={field}
                  name={field}
                  className="mt-2 p-3 w-full text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
                {field === 'password' && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            </div>
          )
        )}

        <button
          type="submit"
          className={`w-full p-3 bg-teal-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (isRegistering ? 'Registering...' : 'Logging in...') : (isRegistering ? 'Sign Up' : 'Sign In')}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {isRegistering ? (
          <>
            Already have an account?{' '}
            <button onClick={toggleAuthMode} className="text-teal-600 hover:underline">
              Login here
            </button>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <button onClick={toggleAuthMode} className="text-teal-600 hover:underline">
              Register here
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthorizationForm;
