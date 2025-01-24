import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios"; 

import ProgressBar from "./ProgressBar";
import GuestSelector from "./GuestSelector";
import Header from "./Header";
import Loader from "./Loader";
import Title from "./Title";
import Decorator from "./Decorator";

function Guests() {
  const navigate = useNavigate();

  const [bigScreen, setBigScreen] = useState(window.innerWidth >= 1024);
  const [guestSize, setGuestSize] = useState("");
  const [initialGuestSize, setInitialGuestSize] = useState("");
  const [loading, setLoading] = useState(false);
  const guestOptions = [" < 100 ", " 100 - 250 ", " 250 - 500 ", " 500 - 1000 ", " > 1000 "];


  useEffect(() => {
    const fetchGuestSize = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}api/info/guestSize`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        setGuestSize(response.data.guestSize);
        setInitialGuestSize(response.data.guestSize);
      } catch (error) {
        console.error("Error fetching guest size : " + error);
      }
    };

    fetchGuestSize();

    const handleResize = () => {
      const width = window.innerWidth;
      setBigScreen(width >= 1024);
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflowX = "hidden"; 

    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);


  function handleGuestSize(size) {
    setGuestSize(size);
  }

  async function handleNext() {
    if (guestSize) {
      setLoading(true);

      if (guestSize !== initialGuestSize) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}api/info/updateGuestSize`,
            { guestSize: guestSize },
            { headers: { Authorization: `${localStorage.getItem("token")}` } }
          );

          console.log(
            "Guest size updated successfully: ",
            response.data.guestSize
          );
        } catch (error) {
          console.error("Error updating guest size:", error);
          alert("Failed to update guest size. Please try again.");
        }
      } else {
        console.log("No change in guest size, skipping the update");
      }
    } else {
      alert("Please select a guest size.");
    }
  }

  if (loading) {
    return (
      <Loader
        text={`Shortlisting venues to accommodate your wedding party`}
        image={`/images/Magnify glass.png`}
      />
    );
  }


  function handleBack() {
    navigate("/home");
  }

  return (
      <motion.div
        initial={{ opacity: 0.6 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="flex flex-col lg:flex-row min-h-screen guest"
      >
        {/* Left Div */}
        <div className="w-full lg:w-3/4 lg:p-6 min-h-screen flex flex-col">
          {bigScreen ? (
            <>
              <img
                src="/images/Back Button.png"
                width={30}
                onClick={handleBack}
                className="cursor-pointer"
                alt="Back"
              />
              <div className="pt-6">
                <ProgressBar currentStep={1} totalSteps={6} />
              </div>
            </>
          ) : (
            <>
              <div>
                <ProgressBar currentStep={1} totalSteps={6} />
              </div>
              <img
                src="/images/Back Button.png"
                width={30}
                onClick={handleBack}
                className="cursor-pointer ml-5"
                alt="Back"
              />
              <Header />
            </>
          )}

          <div className="flex justify-center items-center flex-grow">
            <div className="w-4/5 lg:w-2/5 text-center">
              {!bigScreen && (
                <div className="flex justify-center mb-4">
                  <img src="/images/Group Icon.png" alt="group" width={70} />
                </div>
              )}
              <div>
                <Title
                  step={`Step 1/6`}
                  title={`How many guests are you expecting?`}
                  subtitle={`Please choose the number of people attending your biggest function`}
                />
              </div>
              <div className="my-5">
                {guestOptions.map((option, index) => (
                  <GuestSelector
                    key={index}
                    text={option}
                    isSelected={guestSize === option}
                    onGuestClick={handleGuestSize}
                  />
                ))}
              </div>

              <button
                className="mt-2 bg-pink-600 hover:bg-pink-700 text-white px-24 py-4 rounded-lg mb-5"
                style={{ visibility: guestSize ? "visible" : "hidden" }}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Div */}
        <motion.div
          initial={{ x: "100%" }} 
          animate={{ x: 0 }} 
          transition={{ duration: 0.8 }}
          exit={{ x : "100%" }} 
          className="w-full lg:w-2/5 p-4 hidden lg:flex flex-col min-h-screen bg-white rounded-l-3xl"
          style={{ overflowX: "hidden" }} 
        >
          <Header />
          <div className="flex-grow flex justify-center items-center">
            <Decorator
              text={`In receptions, expect about 35% of guests in the floating crowd, and ensure ample standing and mingling space.`}
              image={`/images/Guest Page Decorator.png`}
              wid={`220rem`}
            />
          </div>
        </motion.div>
      </motion.div>
  );
}

export default Guests;
