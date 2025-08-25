import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import api from "../api";
import { DataContext } from "../context/DataContext";
import { formatDate } from "../util/Date";

// 🔹 Custom Loader
function Loader() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-3 text-blue-600 font-medium">Loading data...</span>
    </div>
  );
}

function AdminSection() {
  const { data, setData } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.getLicenses();
      setData(res.data || []);
    } catch (err) {
      console.error("Error fetching licenses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await api.deleteLicense(id);
    setData((prev) => prev.filter((item) => item._id !== id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
          License Management
        </h2>
        <button
          onClick={() => navigate("/newEntry")}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition"
        >
          + Add New Entry
        </button>
      </div>

      {/* Table (Always visible, white background) */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        {loading ? (
          <Loader />
        ) : data.length > 0 ? (
          <table className="w-full border-collapse text-[12px]">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 sticky top-0 z-10">
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
                  "Actions",
                ].map((header, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 border-b border-gray-300 text-left font-bold text-[12px]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((item, idx) => (
                <tr
                  key={item._id}
                  className={`transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50`}
                >
                  <td className="px-4 py-3 border-b text-center">
                    <img
                      src={item.licenseImage}
                      alt="avatar"
                      className="w-10 h-10 mx-auto rounded-full object-cover shadow-sm border"
                    />
                  </td>
                  <td className="px-4 py-3 border-b font-semibold text-gray-800 text-[12px]">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 border-b font-semibold text-[12px]">
                    {item.parentName}
                  </td>
                  <td className="px-4 py-3 border-b font-semibold text-[12px]">
                    {formatDate(item.dateOfBirth)}
                  </td>
                  <td className="px-4 py-3 border-b font-semibold text-[12px]">
                    {item.gender}
                  </td>
                  <td className="px-4 py-3 border-b font-semibold text-[12px]">
                    {item.nationality}
                  </td>
                  <td className="px-4 py-3 border-b font-semibold text-[12px]">
                    {item.phoneNumber}
                  </td>
                  <td className="px-4 py-3 border-b truncate max-w-[180px] font-semibold text-[12px]">
                    {item.email}
                  </td>
                  <td className="px-4 py-3 border-b font-semibold text-[12px]">
                    {item.licenseNumber}
                  </td>
                  <td className="px-4 py-3 border-b font-semibold text-[12px]">
                    {formatDate(item.issueDate)}
                  </td>
                  <td className="px-4 py-3 border-b font-semibold text-[12px]">
                    {formatDate(item.expiryDate)}
                  </td>
                  <td className="px-4 py-3 border-b text-center ">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 rounded-full text-red-600 hover:bg-red-100 hover:text-red-700 transition"
                      title="Delete Entry"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/edit/${item._id}`, { state: item })
                      }
                      className="p-2 rounded-full text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition"
                      title="Edit Entry"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 text-center text-gray-500 text-sm">
            <p>No license data available.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSection;
