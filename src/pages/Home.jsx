import React, { useEffect, useRef, useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import Cards from "../components/Cards";
import { DataContext } from "../context/DataContext";
import SearchModel from "../components/SearchModel";

function Home() {
  const inputRef = useRef();
  const { data } = useContext(DataContext);
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Focus input on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Country flag mapping

  // Handle Search
  const handleSearch = () => {
    const found = data.find(
      (item) =>
        item.licenseNumber &&
        item.licenseNumber.toString().trim() === searchValue.trim()
    );

    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setResult(null);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4">
      {/* Headings */}
      <h1 className="text-3xl mb-4 sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-800 text-center">
        Welcome To Online
      </h1>
      <h1 className="text-3xl mb-10 sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-800 text-center mb-8">
        Verification Services
      </h1>

      {/* Search Bar */}
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

      {/* No Data Found */}
      {notFound && (
        <p className="mt-4 text-red-600 font-medium text-lg">No data found.</p>
      )}

      {/* Modal for Search Result */}
      {result && (
       <SearchModel result={result}  closeModal={closeModal}/>
      )}

      {/* Features Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-12 drop-shadow-lg">
        <p className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:rounded-full before:bg-white before:drop-shadow-lg">
          Secure
        </p>
        <p className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:rounded-full before:bg-white before:drop-shadow-lg">
          Fast
        </p>
        <p className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:rounded-full before:bg-white before:drop-shadow-lg">
          Reliable
        </p>
      </div>

      {/* Cards Section */}
      <div className="w-full mt-10">
        <Cards />
      </div>
    </div>
  );
}

export default Home;
