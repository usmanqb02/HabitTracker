import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import LoginScreen from './Screens/LoginScreen';
import Dashboard from './Screens/DashBoard';

const RouteConfig = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<LoginScreen/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
        </Router>
    );
}
export default RouteConfig
