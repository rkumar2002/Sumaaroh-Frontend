import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "./Loader";
import Header from "./Header";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowX = "hidden"; 

    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);


  const handleButtonClick = () => {
    setPageLoaded(false);
    setTimeout(() => {
      setLoading(true); 
    }, 1000); 
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    navigate("/login");
  };

  if (loading) {
    return (
      <Loader
        image={`/images/Blinking Eye 1.gif`}
        text={`Great, let our planners craft the perfect setting for your magical day.`}
      />
    );
  }

  return (
      <motion.div
        className={`min-h-screen bg-cover bg-center`}
        style={{
          backgroundImage: "url('/images/Background.png')",
          backgroundRepeat: "no-repeat",
          overflowX: "hidden", 
        }}
        initial={{ x: 0 }} 
        animate={{ x: pageLoaded ? 0 : "100%" }} 
        transition={{ duration: 1, ease: "easeInOut" }} 
      >
        <Header />

        <img
          src="/images/Profile Icon.png"
          alt="profile"
          width={35}
          style={{ position: "absolute", left: "10px", top: "20px" }}
          className="cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <img
          src="/images/Sign Out Icon.png"
          alt="sign out"
          width={25}
          style={{ position: "absolute", right: "10px", top: "20px" }}
          className="cursor-pointer"
          onClick={handleSignOut}
        />

        <div className="mt-5 w-full flex flex-col md:flex-row">
          <div className="flex-1 flex justify-center items-center">
            <img
              src="/images/Wedding Planner.png"
              alt="Wedding Planner"
              width={570}
              className="mix-blend-darken w-2/3"
            />
          </div>

          <div className="flex-1 mt-5 md:mt-3 flex flex-col justify-center items-center text-center px-10 lg:px-8">
            <div className="rounded-xl w-full max-w-md mb-2">
              <span
                style={{ color: "#4B483E" }}
                className="text-2xl lg:text-3xl font-semibold block text-left"
              >
                {localStorage.name || "Anita"}, let our expert planners craft your special day
              </span>
            </div>

            <div
              style={{ backgroundColor: "#FDFDFD" }}
              className="rounded-3xl mt-3 py-5 px-4 lg:px-8 w-full max-w-md shadow-md"
            >
              <div className="flex items-center">
                <img
                  src="/images/Pointer.png"
                  alt="*"
                  className="mr-3"
                  width={20}
                />
                <span>Unlock best venues, decors & more</span>
              </div>
              <p
                style={{ color: "#B4B4B4" }}
                className="mt-2 font-semibold text-left"
              >
                Tell us about your dream day & get a perfect proposal in your
                budget for FREE
              </p>
            </div>

            <div
              style={{ backgroundColor: "#FDFDFD" }}
              className="rounded-3xl mt-3 py-5 px-4 lg:px-8 w-full max-w-md shadow-md"
            >
              <div className="flex items-center">
                <img
                  src="/images/Pointer.png"
                  alt="*"
                  className="mr-3"
                  width={20}
                />
                <span>800+ Flawless Celebrations</span>
              </div>
              <p
                style={{ color: "#B4B4B4" }}
                className="mt-2 font-semibold text-left"
              >
                Enjoy a perfect, stress-free wedding from the first visit to the
                final goodbyes
              </p>
            </div>

            <button
              onClick={handleButtonClick}
              style={{
                backgroundColor: "#FD5A90",
                color: "#F7C8DC",
                border: "2px solid #EC7478",
                boxShadow: "0 6px 10px 0 #f1deb9, 0 -6px 10px 0 #f1deb9",
              }}
              className="mt-5 mb-8 rounded-full px-14 py-3 w-full max-w-md"
            >
              Get My FREE Proposal
            </button>
          </div>
        </div>
      </motion.div>
  );
};

export default HomePage;