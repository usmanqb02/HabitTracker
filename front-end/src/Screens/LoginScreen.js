import React from 'react';
import AuthorizationForm from '../components/AuthorizationForm';
import appLogo from "../images/appLogo.jpg"

const LoginScreen = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gradient-to-r from-teal-500 to-cyan-500 flex justify-center items-center">
        <div className="text-center text-white p-12 space-y-6">
          <img
            src={appLogo}
            alt="App Logo"
            className="mx-auto mb-4 w-36 h-36 rounded-full shadow-lg"
          />
          <h1 className="text-5xl font-extrabold tracking-wide">Habbit Tracker</h1>
          <p className="text-lg italic">Your habits, our responsibility</p>
          <p className="text-md text-opacity-80">Track your daily habits in a seamless way</p>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <AuthorizationForm />
      </div>
    </div>
  );
};

export default LoginScreen;
