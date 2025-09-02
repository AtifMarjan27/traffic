import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
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
    address: "",
    phoneNumber: "",
    email: "",
    licenseType: "",
    placeOfIssue: "",
    issueDate: "",
    expiryDate: "",
    licenseNumber: "",
    bloodGroup: "",
    cnicOrIdNumber: "",
    emergencyContact: "",
  });

  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };


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


  const validateForm = () => {
    const requiredKeys = Object.keys(formData).filter(
      (k) => k !== "emergencyContact" 
    );
    const newErrors = {};
    requiredKeys.forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });
    if (!image) newErrors.image = "License image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit
 const handleSubmit = async (e) => {
   e.preventDefault();

   if (!validateForm()) return;

   setSubmitting(true);

   try {
     const data = new FormData();
     Object.entries(formData).forEach(([k, v]) => data.append(k, v));
     if (image) data.append("licenseImage", image);

     const res = await api.createLicense(data);
     if (res.success) {
       toast.success("Submitted successfully!");
       setFormData({
         fullName: "",
         parentName: "",
         dateOfBirth: "",
         gender: "",
         nationality: "",
         address: "",
         phoneNumber: "",
         email: "",
         licenseType: "",
         placeOfIssue: "",
         issueDate: "",
         expiryDate: "",
         licenseNumber: "",
         bloodGroup: "",
         cnicOrIdNumber: "",
         emergencyContact: "",
       });
       setImage(null);
       setImagePreview(null);

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
              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  Parent Name*
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  placeholder="Enter parent name"
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                />
                {errors.parentName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.parentName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  Date of Birth*
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  Gender*
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  Nationality*
                </label>
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                >
                  <option value="" disabled>
                    Select nationality
                  </option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="India">India</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="SriLanka">SriLanka</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Nepal">Nepal</option>
                </select>
                {errors.nationality && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nationality}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  Address*
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter full address"
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  Phone Number*
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  License Type*
                </label>
                <select
                  name="licenseType"
                  value={formData.licenseType}
                  onChange={handleInputChange}
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                >
                  <option value="" disabled>
                    Select license type
                  </option>
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Car">Car</option>
                  <option value="Commercial">Commercial</option>
                  <option value="LTV">LTV</option>
                  <option value="HTV">HTV</option>
                </select>
                {errors.licenseType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.licenseType}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  Place of Issue*
                </label>
                <input
                  type="text"
                  name="placeOfIssue"
                  value={formData.placeOfIssue}
                  onChange={handleInputChange}
                  placeholder="Enter place of issue"
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                />
                {errors.placeOfIssue && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.placeOfIssue}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  CNIC/ID Number*
                </label>
                <input
                  type="text"
                  name="cnicOrIdNumber"
                  value={formData.cnicOrIdNumber}
                  onChange={handleInputChange}
                  placeholder="Enter ID number"
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                />
                {errors.cnicOrIdNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.cnicOrIdNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  Blood Group*
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                >
                  <option value="" disabled>
                    Select blood group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="N/A">N/A</option>
                </select>
                {errors.bloodGroup && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bloodGroup}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[12px] font-medium text-black mb-1">
                    Issue Date*
                  </label>
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                  />
                  {errors.issueDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.issueDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-black mb-1">
                    Expiry Date*
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  License Number*
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  placeholder="Enter license number"
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                />
                {errors.licenseNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.licenseNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-black mb-1">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  placeholder="Enter emergency contact number"
                  className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                />
                {errors.emergencyContact && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emergencyContact}
                  </p>
                )}
              </div>
            </div>

            <div className="lg:w-1/3">
              <label className="block text-[12px] font-medium text-black mb-1">
                License Image*
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
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image}</p>
              )}

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
