import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import ProtectedRoute from './protectedRoutes'; // Assuming it's a route protection logic

const LoginScreen = React.lazy(() => import('../Screens/LoginScreen'));
const Dashboard = React.lazy(() => import('../Screens/DashBoardScreen'));

const RouteConfig = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route element={<ProtectedRoute />}>  {/* Protected route wrapper */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manageHabits" element={<Dashboard />} />
            <Route path="/tracking" element={<Dashboard />} />
            <Route path="/goals" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouteConfig;
