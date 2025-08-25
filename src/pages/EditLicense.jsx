import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import api from "../api";

function EditLicense() {
  const { id } = useParams();
  const { state } = useLocation(); 
  const navigate = useNavigate();

 
  const [formData, setFormData] = useState({
    fullName: state?.fullName || "",
    parentName: state?.parentName || "",
    dateOfBirth: state?.dateOfBirth || "",
    gender: state?.gender || "",
    nationality: state?.nationality || "",
    address: state?.address || "",
    phoneNumber: state?.phoneNumber || "",
    email: state?.email || "",
    licenseType: state?.licenseType || "",
    placeOfIssue: state?.placeOfIssue || "",
    issueDate: state?.issueDate || "",
    expiryDate: state?.expiryDate || "",
    licenseNumber: state?.licenseNumber || "",
    bloodGroup: state?.bloodGroup || "",
    cnicOrIdNumber: state?.cnicOrIdNumber || "",
    emergencyContact: state?.emergencyContact || "",
  });

  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(state?.licenseImage || null);
  const [submitting, setSubmitting] = useState(false);

  // handle inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // image upload / drag&drop
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let dataToSend;
      let isForm = false;

      if (image) {
        dataToSend = new FormData();
        Object.entries(formData).forEach(([k, v]) => dataToSend.append(k, v));
        dataToSend.append("licenseImage", image);
        isForm = true;
      } else {
        dataToSend = { ...formData };
      }

      const res = await api.updateLicense(id, dataToSend, isForm);
      if (res.success) {
        alert("License updated successfully");
        navigate("/dashboard");
      } else {
        alert(res.message || "Failed to update");
      }
    } catch (err) {
      console.error("Error updating license:", err);
      alert("Something went wrong while updating");
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
            {/* LEFT: all form inputs */}
            <div className="flex-1 space-y-4">
              {[
                { name: "fullName", label: "Full Name" },
                { name: "parentName", label: "Parent Name" },
                { name: "dateOfBirth", label: "Date of Birth", type: "date" },
                { name: "gender", label: "Gender" },
                { name: "nationality", label: "Nationality" },
                { name: "address", label: "Address" },
                { name: "phoneNumber", label: "Phone Number" },
                { name: "email", label: "Email Address", type: "email" },
                { name: "licenseType", label: "License Type" },
                { name: "placeOfIssue", label: "Place of Issue" },
                { name: "cnicOrIdNumber", label: "CNIC/ID Number" },
                { name: "bloodGroup", label: "Blood Group" },
                { name: "licenseNumber", label: "License Number" },
                { name: "issueDate", label: "Issue Date", type: "date" },
                { name: "expiryDate", label: "Expiry Date", type: "date" },
                {
                  name: "emergencyContact",
                  label: "Emergency Contact (optional)",
                },
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

            {/* RIGHT: Image upload */}
            <div className="lg:w-1/3">
              <label className="block text-[12px] font-medium text-black mb-1">
                License Image
              </label>
              <div
                className="border-dotted border-2 border-gray-400 rounded-md p-4 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition relative h-40"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="License Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer text-sm bg-gray-200 px-3 py-1 rounded"
                      >
                        Change Image
                      </label>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer text-gray-600 text-sm flex flex-col items-center justify-center h-full"
                  >
                    <FaUpload className="text-xl mb-2" />
                    Drag & drop or click to upload
                  </label>
                )}
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <div className="bg-gray-200 p-4 rounded-2xl mt-5">
                <h3 className="text-[12px] font-semibold mb-2">
                  Photo requirements
                </h3>
                <p className="text-[12px] text-gray-600">• Recent photo</p>
                <p className="text-[12px] text-gray-600">
                  • Clear, front-facing view
                </p>
                <p className="text-[12px] text-gray-600">• Plain background</p>
                <p className="text-[12px] text-gray-600">
                  • No hats or sunglasses
                </p>
              </div>
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
    </div>
  );
}

export default EditLicense;
