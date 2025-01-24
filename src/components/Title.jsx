import React from "react";

function Title({step, title, subtitle}) {
  return (
    <>
      <span style={{ color: "#CFCBA9" }} className="font-semibold">
        {step}
      </span>

      <p
        className="mt-3 font-semibold text-xl lg:text-3xl"
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        {title}
      </p>

      <p style={{ color: "#B7B39A" }} className="font-semibold mt-2">
        {subtitle}
      </p>
    </>
  );
}

export default Title;
