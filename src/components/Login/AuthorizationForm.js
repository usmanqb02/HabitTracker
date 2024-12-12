import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginFailure } from "../../context/authSlice";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import config from "../UrlConfig";

const AuthorizationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isRegistering && !isValidEmail(formData.email)) {
      setError("Please enter a valid email address...");
      setLoading(false);
      return;
    }

    const apiUrl = isRegistering ? config.REGISTER_URL : config.LOGIN_URL;
    const payload = isRegistering
      ? {
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }
      : { username: formData.username, password: formData.password };

    try {
      const response = await axios.post(apiUrl, payload);
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      dispatch(loginSuccess({ user, token }));
      console.log(`user logged in with token : ${token} and ${user}`);
      navigate("/dashboard");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "An error occurred";
      dispatch(loginFailure(errorMsg));
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsRegistering((prev) => !prev);
    setFormData({ username: "", password: "", email: "" });
    setError(null);
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {isRegistering ? "Create an Account" : "Sign In"}
      </h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-2 p-3 w-full text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {isRegistering && (
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 p-3 w-full text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="mt-2 p-3 w-full text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full p-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading
            ? isRegistering
              ? "Registering..."
              : "Logging in..."
            : isRegistering
            ? "Sign Up"
            : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center">
        {isRegistering ? (
          <span>
            Already have an account?{" "}
            <button
              onClick={toggleAuthMode}
              className="text-teal-600 hover:underline"
            >
              Login here
            </button>
          </span>
        ) : (
          <span>
            Don't have an account?{" "}
            <button
              onClick={toggleAuthMode}
              className="text-teal-600 hover:underline"
            >
              Register here
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default AuthorizationForm;
