import React from 'react';
import { useNavigate } from 'react-router-dom';

function OutroPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/home", { replace: true });
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 text-blue-500 font-semibold hover:text-blue-700"
      >
        &#8592; Back to Home
      </button>
      <div className='w-3/4 flex flex-col items-center text-center'>
        <img src='/images/Outro Tick.gif' alt='tick' width={100} className='mix-blend-lighten'/>
        <p className="text-2xl lg:text-5xl my-2" style={{ fontFamily: "Times New Roman, serif" }}>
          Our top recommended venues for you
        </p>
        <p style={{ color: "#8e8e8e" }}>
          Shortlist the venues you like so that our planner can understand your tastes better
        </p>
      </div>
    </div>
  );
}

export default OutroPage;