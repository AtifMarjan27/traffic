import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import api from "../api";
import { DataContext } from "../context/DataContext";
import { formatDate } from "../util/Date";

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
  const [deleteId, setDeleteId] = useState(null); // For modal
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

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await api.deleteLicense(deleteId);
      setData((prev) => prev.filter((item) => item._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-700 tracking-tight">
          Licenses Data
        </h2>
        <button
          onClick={() => navigate("/newEntry")}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition"
        >
          + Add New Entry
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        {loading ? (
          <Loader />
        ) : data.length > 0 ? (
          <table className="w-full border-collapse text-[12px]">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 sticky top-0 z-10">
              <tr>
                {[
                  "Avatar",
                  "Name",
                  "FatherName",
                  "DOB",
                  "Gender",
                  "Nationality",
                  "Phone",
                  "Address",
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
                    {item.fullName}
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
                    {item.address}
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
                  <td className="px-4 py-3 border-b text-center">
                    <button
                      onClick={() => setDeleteId(item._id)}
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

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this license?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSection;
