import React from "react";

function VenueSelector({ image, title, subtitle, isSelected, onSelect }) {
  return (
    <div
      className={`p-4 rounded-3xl text-center flex flex-col items-center cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-[#e9dcb7] shadow-[0px_4px_15px_1px_rgba(227,208,144,0.6)]"
          : "border-[#FDFBEC] shadow-none"
      }`}
      style={{
        backgroundColor: "#fdfdfd",
        width: "100%",
        height: "100%",
        borderWidth: "3px", 
      }}
      onClick={onSelect}
    >
      <img src={image} alt="" width={90} />

      <p className="mt-2 font-semibold text-lg text-center text-gray-700 break-words">
        {title}
      </p>

      <p
        className="mt-2 text-sm text-center text-gray-500 break-words whitespace-normal"
        style={{ maxWidth: "90%" }}
      >
        {subtitle}
      </p>
    </div>
  );
}

export default VenueSelector;