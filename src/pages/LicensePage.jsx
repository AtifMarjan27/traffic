import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import api from "../api";
import { formatDate } from "../util/Date";

import indiaImg from "../assets/indi1.webp";
import banglshImg from "../assets/Ban1.webp";
import Srilanka from "../assets/Sri1webp.webp";
import Piplpines from "../assets/pil1.webp";
import Pakitan from "../assets/Pak1.jpg";
import Nepal from "../assets/nepal1.PNG";


const countryInfo = {
  India: {
    img: indiaImg,
    label: "लाइसेंस सत्यापन", // Hindi
  },
  Bangladesh: {
    img: banglshImg,
    label: "লাইসেন্স যাচাইকরণ", // Bengali
  },
  SriLanka: {
    img: Srilanka,
    label: "බලපත්ර සත්‍යාපනය", // Sinhala
  },
  Pakitan: {
    img: Pakitan,
    label: "لائسنس کی تصدیق", // Urdu
  },
  Nepal: {
    img: Nepal,
    label: "अनुज्ञा प्रमाणिकरण", // Nepali
  },
  Philippines: {
    img: Piplpines,
    label: "Pagpapatunay ng Lisensya", // Filipino
  },
};

function LicensePage() {
  const { licenseNumber } = useParams();
  const inputRef = useRef();

  const [searchValue, setSearchValue] = useState(licenseNumber || "");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputRef.current.focus();

    if (licenseNumber) {
      fetchLicense(licenseNumber);
    }
  }, [licenseNumber]);

  const fetchLicense = async (value) => {
    setLoading(true);
    setNotFound(false);
    setResult(null);

    try {
      const res = await api.searchLicense(value.trim());
      if (res.success && res.data) {
        setResult(res.data);
        setNotFound(false);
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

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    fetchLicense(searchValue);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto w-full">
    
      {result && result.nationality && countryInfo[result.nationality] && (
        <div className="mb-4 w-full">
          <img
            src={countryInfo[result.nationality].img}
            alt={result.nationality}
            className="w-full h-auto max-h-[300px] object-cover rounded-lg"
          />
          <h2 className="text-center text-lg sm:text-xl font-semibold text-gray-800 mt-2">
            {countryInfo[result.nationality].label}
          </h2>
        </div>
      )}

    
      <div className="flex w-full bg-white rounded-lg shadow-md overflow-hidden">
        <input
          type="text"
          ref={inputRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Type DL/CNIC Number Without Dash"
          className="flex-1 px-4 py-2 outline-none text-gray-700 text-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-5 flex items-center justify-center"
        >
          <FaSearch className="text-lg" />
        </button>
      </div>

    
      {loading && (
        <p className="mt-4 text-blue-600 font-medium">Searching...</p>
      )}

    
      {notFound && !loading && (
        <p className="mt-4 text-red-600 font-medium">No data found.</p>
      )}

     
      {result && !loading && (
        <div className="mt-4 w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
       
          <div className="flex items-center justify-center text-sm font-bold px-4 py-2 border-b border-gray-300 bg-gray-200 text-black">
            License Number: {result.licenseNumber}
          </div>

       
          <div className="divide-y sm:divide-y-0 sm:divide-x border-t border-gray-300">
          
            {[
              ["Name", result.fullName],
              ["Father Name", result.parentName],
              ["Date of Birth",formatDate(result.dateOfBirth)],
              ["First Issue",formatDate(result.issueDate)],
              ["Issue / Renewal", formatDate(result.issueDate)],
              ["Validity",formatDate(result.expiryDate)],
              ["Category", result.licenseType],
            ].map(([label, value], idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row ${
                  idx % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                {/* Label */}
                <div className="px-4 py-2 sm:w-1/2 font-semibold text-sm sm:text-base text-black border-b sm:border-b-0 sm:border-r border-gray-300">
                  {label}
                </div>

             
                <div className="px-4 py-2 sm:w-1/2 text-sm sm:text-base text-black">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LicensePage;
