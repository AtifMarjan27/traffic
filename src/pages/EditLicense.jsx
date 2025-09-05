import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditLicense() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return date.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    fullName: state?.fullName || "",
    parentName: state?.parentName || "",
    dateOfBirth: formatDate(state?.dateOfBirth),
    gender: state?.gender || "",
    nationality: state?.nationality || "",
    licenseType: state?.licenseType || "",
    issueDate: formatDate(state?.issueDate),
    expiryDate: formatDate(state?.expiryDate),
    licenseNumber: state?.licenseNumber || "",
    bloodGroup: state?.bloodGroup || "",
    cnicOrIdNumber: state?.cnicOrIdNumber || "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);

    try {
  
      const res = await api.updateLicense(id, formData); 

      if (res.success || res.message === "License updated successfully") {
        toast.success("License updated successfully!");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error(res.message || "Failed to update license");
      }
    } catch (err) {
      console.error("Error updating license:", err);
      toast.error("Something went wrong while updating");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-4xl p-6">
        <h2 className="text-[12px] font-bold text-gray-800 mb-6">
          Edit License Information
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="lg:flex lg:flex-row lg:gap-6">
            <div className="flex-1 space-y-4">
              {[
                { name: "fullName", label: "Full Name" },
                { name: "parentName", label: "Parent Name" },
                { name: "dateOfBirth", label: "Date of Birth", type: "date" },
                { name: "gender", label: "Gender" },
                { name: "nationality", label: "Nationality" },
                { name: "licenseType", label: "License Type" },
                { name: "cnicOrIdNumber", label: "CNIC/ID Number" },
                { name: "bloodGroup", label: "Blood Group" },
                { name: "licenseNumber", label: "License Number" },
                { name: "issueDate", label: "Issue Date", type: "date" },
                { name: "expiryDate", label: "Expiry Date", type: "date" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-[12px] font-medium text-black mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${field.label}`}
                    className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full mt-6 text-white py-2 rounded-md font-semibold transition text-[12px] ${
              submitting ? "bg-gray-500" : "bg-black hover:bg-gray-800"
            }`}
          >
            {submitting ? "Updating..." : "Update License"}
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}

export default EditLicense;
