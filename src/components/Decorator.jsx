import React from "react";

function Decorator({text, image, wid}) {
  return (
    <div className="h-96 w-96 flex flex-col items-center pt-24 px-6 text-center guest-page-decoration">
      <img src="/images/Light Bulb.png" alt="bulb" width={30} />
      <p className="mt-2" style={{ color: "#747052" }}>
        {text}
      </p>

      <img
        src={image}
        alt=""
        className="decorator"
        width={wid}
      />
    </div>
  );
}

export default Decorator;
