import React from "react";

function SearchModel({ closeModal, result }) {
  const flags = {
    Pakistani: "https://flagcdn.com/w320/pk.png",
    Bangladesh: "https://flagcdn.com/w320/bd.png",
    SriLanka: "https://flagcdn.com/w320/lk.png",
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      {/* Fullscreen Flag Background */}
      <div className="absolute inset-0">
        <img
          src={flags[result.nationality] || ""}
          alt={result.nationality}
          className="w-full h-full object-cover"
        />
        {/* Fullscreen Blur Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* Modal Content */}
      <div
        className="relative z-10 w-full max-w-md p-6 rounded-xl shadow-xl text-white"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white px-2 py-1 rounded"
        >
          ✕
        </button>

        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{result.name}</h3>
          <p className="text-sm">
            <strong>License No:</strong> {result.licenseNumber}
          </p>
          <p className="text-sm">
            <strong>Nationality:</strong> {result.nationality}
          </p>
          <p className="text-sm">
            <strong>DOB:</strong> {result.dateOfBirth}
          </p>
          <p className="text-sm">
            <strong>Expiry:</strong> {result.expiryDate}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchModel;
