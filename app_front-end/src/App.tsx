/**
 * App.tsx
 * Routes principales de l'application
 */

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProfilPage from "./pages/ProfilPage";
import { AuthentificationPage } from "./pages/AuthenticationPage";
import ProfilePage2 from "./pages/ProfilePage2";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./App.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<AuthentificationPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProfilPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-2"
          element={
            <ProtectedRoute>
              <ProfilePage2 />
            </ProtectedRoute>
          }
        />

        {/* Redirection par défaut si route inconnue */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;