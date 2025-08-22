import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Function to generate a random token
const generateToken = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded credentials
  const HARDCODED_EMAIL = "admin@example.com";
  const HARDCODED_PASSWORD = "Admin123";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    
    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      

      const token = generateToken();
      localStorage.setItem("authToken", token);
      console.log("Login successful, token:", token);
     
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-sm p-6">
      
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back Admin 👋
        </h2>

      
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}

       
        <div className="space-y-4">
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

       
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

       
          <div className="flex justify-end text-sm">
            <Link
              to="/forgot-password"
              className="text-black hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>

       
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-black transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
