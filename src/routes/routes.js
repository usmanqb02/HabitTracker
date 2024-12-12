import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { logout, loginSuccess } from "../context/authSlice";
import ProtectedRoute from "./protectedRoutes";
import { useDispatch } from "react-redux";
import LoginScreen from "../screens/LoginScreen";
import Dashboard from "../screens/DashBoardScreen";

const RouteConfig = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          dispatch(loginSuccess({ token, user: decoded }));
        } else {
          dispatch(logout());
        }
      } catch {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manageHabits" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default RouteConfig;
