import React, { useState } from "react";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddNew() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    parentName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    licenseType: "",
    issueDate: "",
    expiryDate: "",
    licenseNumber: "",
    bloodGroup: "",
    cnicOrIdNumber: "",
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
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));

      const res = await api.createLicense(data);

      if (res.success) {
        toast.success("Submitted successfully!");
        setFormData({
          fullName: "",
          parentName: "",
          dateOfBirth: "",
          gender: "",
          nationality: "",
          licenseType: "",
          issueDate: "",
          expiryDate: "",
          licenseNumber: "",
          bloodGroup: "",
          cnicOrIdNumber: "",
        });

        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        toast.error(res.message || "Failed to submit");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while submitting");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-4xl p-6">
        <h2 className="text-[12px] font-bold text-gray-800 mb-6">
          Global License Application
        </h2>

        {errors._global && (
          <div className="mb-4 text-red-600 text-sm">{errors._global}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="lg:flex lg:flex-row lg:gap-6">
            <div className="flex-1 space-y-4">
              {[
                { name: "fullName", label: "Full Name", type: "text" },
                { name: "parentName", label: "Parent Name", type: "text" },
                { name: "dateOfBirth", label: "Date of Birth", type: "date" },
                {
                  name: "gender",
                  label: "Gender",
                  type: "select",
                  options: ["Male", "Female", "Other"],
                },
                {
                  name: "nationality",
                  label: "Nationality",
                  type: "select",
                  options: [
                    "Pakistan",
                    "India",
                    "Bangladesh",
                    "SriLanka",
                    "Philippines",
                    "Nepal",
                  ],
                },
                {
                  name: "licenseType",
                  label: "License Type",
                  type: "select",
                  options: ["Motorcycle", "Car", "Commercial", "LTV", "HTV"],
                },
                {
                  name: "cnicOrIdNumber",
                  label: "CNIC/ID Number",
                  type: "text",
                },
                {
                  name: "bloodGroup",
                  label: "Blood Group",
                  type: "select",
                  options: [
                    "A+",
                    "A-",
                    "B+",
                    "B-",
                    "AB+",
                    "AB-",
                    "O+",
                    "O-",
                    "N/A",
                  ],
                },
                { name: "issueDate", label: "Issue Date", type: "date" },
                { name: "expiryDate", label: "Expiry Date", type: "date" },
                {
                  name: "licenseNumber",
                  label: "License Number",
                  type: "text",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-[12px] font-medium text-black mb-1">
                    {field.label}*
                  </label>

                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                    >
                      <option value="" disabled>
                        Select {field.label.toLowerCase()}
                      </option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                    />
                  )}

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
            {submitting ? "Submitting..." : "Submit"}
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

export default AddNew;
