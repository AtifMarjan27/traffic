import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import api from "../api";

function Home() {
  const inputRef = useRef();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    setLoading(true);
    setNotFound(false);
    setResult(null);

    try {
      const res = await api.searchLicense(searchValue.trim());

      if (res.success && res.data) {
        setResult(res.data);
        setNotFound(false);
        navigate(`/${res.data.nationality}-dl/${res.data.licenseNumber}`);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Search error:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      {/* Headings */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 font-bold text-blue-800 text-center">
        Welcome To Online
      </h1>
      <h1 className="text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-10 font-bold text-blue-800 text-center">
        Verification Services
      </h1>

      <div className="flex w-full max-w-lg h-14 items-stretch bg-white rounded-lg shadow-md overflow-hidden">
        <input
          type="text"
          ref={inputRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Type DL/CNIC Number Without Dash"
          className="flex-1 px-4 py-2 text-sm sm:text-base md:text-lg outline-none text-gray-700"
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-5 flex items-center justify-center"
        >
          <FaSearch className="text-lg sm:text-xl md:text-2xl" />
        </button>
      </div>
     
      {loading && (
        <p className="mt-2 text-blue-600 font-medium text-sm sm:text-base">
          Searching...
        </p>
      )}

   
      {notFound && !loading && (
        <p className="mt-2 text-red-600 font-medium text-sm sm:text-base">
          No data found.
        </p>
      )}

   
      {result && !loading && (
        <div className="mt-4 w-full max-w-md bg-white p-4 rounded-lg shadow-md text-sm sm:text-base">
          <p>
            <strong>Country:</strong> {result.nationality}
          </p>
          <p>
            <strong>License Number:</strong> {result.licenseNumber}
          </p>
          <p>
            <strong>Name:</strong> {result.fullName}
          </p>
        </div>
      )}

    
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-10 sm:mt-12 drop-shadow-lg">
        {["Secure", "Fast", "Reliable"].map((word, idx) => (
          <p
            key={idx}
            className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:rounded-full before:bg-white before:drop-shadow-lg text-center sm:text-left"
          >
            {word}
          </p>
        ))}
      </div>

      
      <div className="w-full mt-10">
        <Cards />
      </div>
    </div>
  );
}

export default Home;
