import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Performance from "../pages/Performance";
import Errors from "../pages/Errors";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import Login from "../pages/Login";
import { useEffect } from "react";
import { useAuthStore } from "../features/auth/authStore";

function App() {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const initAuthListener = useAuthStore((state) => state.initAuthListener);

  useEffect(() => {
    fetchUser();
    initAuthListener();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route
          path="/dashboard"
          element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          }
        />

        <Route
          path="/performance"
          element={
          <ProtectedRoute>
          <Performance />
          </ProtectedRoute>
          }
        />

        <Route
          path="/errors"
          element={
            <ProtectedRoute>
              <Errors />
            </ProtectedRoute>
          }
        />
        </Routes>
      </BrowserRouter>
      
    );
  }

export default App;