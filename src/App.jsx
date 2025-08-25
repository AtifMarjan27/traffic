import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import bg from "./assets/bg.webp";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminSection from "./pages/AdminSection";
import AddNew from "./pages/AddNew";
import EditLicense from "./pages/EditLicense"; // ✅ import new page

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div
        className="w-full min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Header />

        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* ✅ Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AdminSection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/newEntry"
              element={
                <ProtectedRoute>
                  <AddNew />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id" // ✅ Add Edit License route
              element={
                <ProtectedRoute>
                  <EditLicense />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
