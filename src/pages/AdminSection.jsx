import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; 

function AdminSection() {
  const { data, setdata } = useContext(DataContext); 
  const navigate = useNavigate();


  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setdata(updatedData);
  };

  return (
    <div className="p-4">
      <h2
        className="text-xl font-semibold mb-3 underline cursor-pointer"
        onClick={() => navigate("/newEntry")}
      >
        Add New Entry
      </h2>
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
        <table className="w-full text-xs border-collapse bg-white">
          <thead className="bg-gray-50 text-gray-700 uppercase tracking-wide">
            <tr>
              {[
                "Avatar",
                "Name",
                "Parent",
                "DOB",
                "Gender",
                "Nationality",
                "Phone",
                "Email",
                "License No",
                "Issue Date",
                "Expiry",
                "Delete",
              ].map((header, idx) => (
                <th
                  key={idx}
                  className="px-2 py-2 border-b border-gray-200 text-left font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 even:bg-gray-50/20 transition-colors"
                >
                  <td className="px-2 py-1 border-b border-gray-200 text-center">
                    <img
                      src={item.image}
                      alt={`${item.nationality} flag`}
                      className="w-6 h-4 mx-auto rounded-sm"
                    />
                  </td>
                  <td className="px-2 py-1 border-b border-gray-200">
                    {item.name}
                  </td>
                  <td className="px-2 py-1 border-b border-gray-200">
                    {item.parentName}
                  </td>
                  <td className="px-2 py-1 border-b border-gray-200">
                    {item.dateOfBirth}
                  </td>
                  <td className="px-2 py-1 border-b border-gray-200">
                    {item.gender}
                  </td>
                  <td className="px-2 py-1 border-b border-gray-200">
                    {item.nationality}
                  </td>
                  <td className="px-2 py-1 border-b border-gray-200">
                    {item.phoneNumber}
                  </td>
                  <td className="px-2 py-1 border-b border-gray-200 truncate max-w-[120px]">
                    {item.email}
                  </td>
                  <td className="px-2 py-1 border-b border-gray-200">
                    {item.licenseNumber}
                  </td>
                  <td className="px-2 py-1 border-b border-gray-200">
                    {item.issueDate}
                  </td>
                  <td className="px-2 py-1 border-b border-gray-200">
                    {item.expiryDate}
                  </td>
                  {/* Delete Icon Column */}
                  <td className="px-2 py-1 border-b border-gray-200 text-center">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete Entry"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="px-3 py-4 text-center text-gray-500 text-sm"
                >
                  No license data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminSection;
