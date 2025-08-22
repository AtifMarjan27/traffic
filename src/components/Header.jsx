import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTimes,
  FaHome,
  FaBars,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUser
} from "react-icons/fa";

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setOpen(false);
    navigate("/");
  };

  return (
    <div>
      {!open && (
        <button
          className="fixed top-4 right-4 z-50 text-xl cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <FaBars />
        </button>
      )}

      <div
        className={`fixed top-0 right-0 w-64 bg-white h-full p-6 shadow-lg transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div
          className="flex justify-between items-center mb-6 relative
        before:absolute before:w-full before:h-[1px] before:bg-black
        before:top-7
        "
        >
          <h1 className="text-[14px] font-bold text-black">Menu</h1>
          <button
            className="text-black cursor-pointer text-md"
            onClick={() => setOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-gray-800">
          <Link
            to="/"
            className="flex items-center gap-3 text-md font-medium pl-2 py-1 rounded-lg hover:bg-blue-800 hover:text-white"
            onClick={() => setOpen(false)}
          >
            <FaHome /> Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/dashboard"
              className="flex items-center gap-3 pl-2 py-1 text-md font-medium rounded-lg hover:bg-blue-800 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <FaTachometerAlt /> Dashboard
            </Link>
          )}
          {isLoggedIn ? (
            <button
              className="flex items-center gap-3 text-md cursor-pointer font-medium pl-2 py-1 rounded-lg hover:bg-blue-800 hover:text-white text-left"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-3 text-md font-medium pl-2 py-1 rounded-lg hover:bg-blue-800 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <FaUser /> Login
            </Link>
          )}
        </nav>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Header;
