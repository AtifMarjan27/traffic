import React from "react";
import { formatDate } from "../util/Date";

function SearchModel({ closeModal, result }) {
  const flags = {
    Pakistan: "https://flagcdn.com/w320/pk.png",
    India: "https://flagcdn.com/w320/in.png",
    Bangladesh: "https://flagcdn.com/w320/bd.png",
    "Sri Lanka": "https://flagcdn.com/w320/lk.png",
    Philippines: "https://flagcdn.com/w320/ph.png",
    Nepal: "https://flagcdn.com/w320/np.png",
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div className="absolute inset-0">
        <img
          src={flags[result.nationality] || ""}
          alt={result.nationality}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      <div
        className="relative z-10 w-full max-w-md p-6 rounded-xl shadow-xl text-white bg-black/70"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white px-2 py-1 rounded"
        >
          ✕
        </button>

        <div className="p-4 space-y-3">
          {[
            { label: "License Number", value: result.licenseNumber },
            { label: "Name", value: result.name },
            { label: "Father Name", value: result.fatherName },
            { label: "License Type", value: result.licenseType },
            { label: "Issue Date", value: formatDate(result.issueDate) },
            { label: "Expiry Date", value: formatDate(result.expiryDate) },
            { label: "Nationality", value: result.nationality },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-500 pb-1"
            >
              <span className="font-medium">{item.label}:</span>
              <span>{item.value || "N/A"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchModel;
