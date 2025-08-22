import React from "react";
import { FaShieldAlt, FaClock, FaGlobe } from "react-icons/fa";

function Cards() {
  return (
    <div className="mt-20  mb-20 flex flex-col justify-center
     items-center gap-10 text-3xl font-bold text-gray-900 drop-shadow-lg">
   
      <div className="flex items-center gap-4">
        <FaShieldAlt className="text-green-600 text-4xl drop-shadow-md" />
        <span>Digital Security</span>
      </div>

     
      <div className="flex items-center gap-4">
        <FaClock className="text-red-600 text-4xl drop-shadow-md" />
        <span>24/7 Available</span>
      </div>

    
      <div className="flex items-center gap-4">
        <FaGlobe className="text-blue-600 text-4xl drop-shadow-md" />
        <span>Global Access</span>
      </div>
    </div>
  );
}

export default Cards;
