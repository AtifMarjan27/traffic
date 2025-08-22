import React, { useContext, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { DataContext } from "../context/DataContext";

function AddNew() {
  const [formData, setFormData] = useState({
    name: "",
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
    cnicNumber: "",
    emergencyContact: "",
  });

const {setData } = useContext(DataContext);


  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

 const handleSubmit = (e) => {
   e.preventDefault();

   const newLicense = {
     ...formData,
     image: image ? image.name : null,
   };


   setData((prevData) => [...prevData, newLicense]);

   console.log("License Added:", newLicense);

   
   setFormData({
     name: "",
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
     cnicNumber: "",
     emergencyContact: "",
   });
   setImage(null);
   setImagePreview(null);
 };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-4xl p-6">
        <h2
          className="text-[12px] font-bold text-gray-800 mb-6 relative
          before:content-[''] before:absolute before:left-0 before:top-7 before:w-35 before:h-[1px] before:bg-gray-500"
        >
          Global License Application
        </h2>

        <div className="lg:flex lg:flex-row lg:gap-6">
          <div className="flex-1 space-y-4">
           
            <div>
              <label className="block text-[12px] font-medium text-black mb-1">
                Full Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                required
              />
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
                required
              />
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
                required
              />
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
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

           
            <div>
              <label className="block text-[12px] font-medium text-black mb-1">
                Nationality*
              </label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                placeholder="Enter nationality"
                className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
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
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-black mb-1">
                CNIC/ID Number*
              </label>
              <input
                type="text"
                name="cnicNumber"
                value={formData.cnicNumber}
                onChange={handleInputChange}
                placeholder="Enter ID number"
                className="border border-black w-full px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 text-[12px]"
                required
              />
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
                required
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
              </select>
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
                  required
                />
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
                  required
                />
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
                required
              />
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
              <div className="relative w-full h-full">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="License Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity ${
                    imagePreview ? "" : "hidden"
                  }`}
                >
                  <p className="text-[12px] text-gray-200 mb-2">Change image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer text-xl font-medium bg-gray-200 flex items-center justify-center w-12 h-12 rounded-full"
                  >
                    <FaUpload className="text-gray-700 text-xl" />
                  </label>
                </div>
                {!imagePreview && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-[12px] text-gray-600 mb-2">
                      Drag and drop an image or click to upload
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer text-xl font-medium bg-gray-200 flex items-center justify-center w-12 h-12 rounded-full"
                    >
                      <FaUpload className="text-gray-700 text-xl" />
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-200 p-4 rounded-2xl mt-5">
              <h3 className="text-[12px] font-semibold mb-2">
                Photo requirements
              </h3>
              <p className="text-[12px] text-gray-500">
                • Recent passport-sized photo
              </p>
              <p className="text-[12px] text-gray-500">
                • Clear, front-facing view
              </p>
              <p className="text-[12px] text-gray-500">• Plain background</p>
              <p className="text-[12px] text-gray-500">
                • No hats or sunglasses
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition text-[12px]"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddNew;
