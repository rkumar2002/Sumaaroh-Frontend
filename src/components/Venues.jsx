import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import ProgressBar from "./ProgressBar";
import Header from "./Header";
import Title from "./Title";
import Decorator from "./Decorator";
import VenueSelector from "./VenueSelector";
import Loader from "./Loader";

function Venues() {
  const navigate = useNavigate();
  
  const [bigScreen, setBigScreen] = useState(window.innerWidth >= 1024);
  const [selectedVenues, setSelectedVenues] = useState([]); 
  const [intitalSelectedVenues, setIntitalSelectedVenues] = useState([]);
  const [loading, setLoading] = useState(false);

  const venueOptions = [
    {
      image: "/images/5 Star Hotel.png",
      title: "5 Star Hotels",
      subtitle: "High end amenities and exceptional service",
    },
    {
      image: "/images/Resort.png",
      title: "Resort",
      subtitle: "Picturesque settings with luxury guest accommodation",
    },
    {
      image: "/images/Convention Hall.png",
      title: "Convention Hall",
      subtitle: "Indoor Halls for Grand Weddings",
    },
    {
      image: "/images/3 Star Hotel.png",
      title: "3 Star Hotels",
      subtitle: "Affordable venues with good service.",
    },
    {
      image: "/images/Farm House.png",
      title: "Farm Houses",
      subtitle: "Green, open spaces for affordable outdoor Weddings",
    },
    {
      image: "/images/Kalyan Mantapa.png",
      title: "Kalyan Mantapas",
      subtitle: "Indoor halls for traditional weddings",
    },
  ];

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}api/info/venues`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        setSelectedVenues(response.data.venues);
        setIntitalSelectedVenues(response.data.venues);
      } catch (error) {
        console.error("Error fetching venues : " + error);
      }
    };

    fetchVenues();

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

  function handleVenueSelect(title) {
    setSelectedVenues((prevSelectedVenues) => {
      if (prevSelectedVenues.includes(title)) {
        return prevSelectedVenues.filter((venue) => venue !== title);
      } else {
        return [...prevSelectedVenues, title];
      }
    });
  }

  function handleBack() {
    navigate("/guests");
  }

  async function handleNext() {
    if (selectedVenues) {
      setLoading(true);

      if (JSON.stringify(selectedVenues.sort()) !== JSON.stringify(intitalSelectedVenues.sort())) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}api/info/updateVenues`,
            { venues: selectedVenues },
            { headers: { Authorization: `${localStorage.getItem("token")}` } }
          );

          console.log("Venues updated successfully: ", response.data.venues);

        } catch (error) {
          console.error("Error updating venues : ", error);
          alert("Failed to update venue. Please try again.");
        }
      } else {
        console.log("No change in venues, skipping the update");
      }
    } else {
      alert("Please select a venue.");
    }
  }

  if (loading) {
    return (
      <Loader
        text={`Tailoring venues to your requirements`}
        image={`/images/Stack Icon.png`}
      />
    );
  }

  return (
      <motion.div
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="flex flex-col lg:flex-row min-h-screen guest">
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
                <ProgressBar currentStep={3} totalSteps={6} />
              </div>
            </>
          ) : (
            <>
              <div>
                <ProgressBar currentStep={3} totalSteps={6} />
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
            <div className="w-4/5 lg:w-3/5 text-center mt-5">
              <div>
                <Title
                  step={`Step 3/6`}
                  title={`What type of venues would you like?`}
                  subtitle={`Select all options that you like.`}
                />
              </div>

              <div className="my-5 grid grid-cols-2 xl:grid-cols-3 gap-4">
                {venueOptions.map((option, index) => (
                  <VenueSelector
                    key={index}
                    image={option.image}
                    title={option.title}
                    subtitle={option.subtitle}
                    isSelected={selectedVenues.includes(option.title)}
                    onSelect={() => handleVenueSelect(option.title)}
                  />
                ))}
              </div>
              <button
                className="mt-5 bg-pink-600 hover:bg-pink-700 text-white px-24 py-4 rounded-full mb-5 w-3/5"
                style={{ visibility: selectedVenues.length > 0 ? "visible" : "hidden" }}
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
          transition={{ duration: 1 }} 
          className="w-full lg:w-2/5 p-4 hidden lg:flex flex-col min-h-screen bg-white rounded-l-3xl"
          style={{ overflow: "hidden" }} 
        >
          <Header />
          <div className="flex-grow flex justify-center items-center">
            <Decorator
              text={`People tend to choose airy outdoor venues like resorts for daytime weddings, and elegant indoor settings like convention halls for evening celebrations.`}
              image={`/images/Venue Page Decorator.png`}
              wid={`260rem`}
            />
          </div>
        </motion.div>
      </motion.div>
  );
}

export default Venues;