import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Loader({ text, image }) {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState(text);
  const [currentImage, setCurrentImage] = useState(image);
  const [fadeOut, setFadeOut] = useState(false); 
  // eslint-disable-next-line
  const [stayVisible, setStayVisible] = useState(true); 

  useEffect(() => {
    // First Loader
    if (currentText === "Shortlisting venues to accommodate your wedding party") {
      setTimeout(() => {
        setCurrentText("Curating styles that match your budget");
        setCurrentImage("/images/House Icon 2.png");
      }, 1500);
    }

    // Second Loader
    if (currentText === "Curating styles that match your budget") {
      setTimeout(() => {
        setStayVisible(false); 
        setTimeout(() => {
          setFadeOut(true); 
          setTimeout(() => {
            navigate("/venues"); 
          }, 400); 
        }, 600); 
      }, 400); 
    }

    // Third Loader
    if (currentText === "Tailoring venues to your requirements") {
      setTimeout(() => {
        setStayVisible(false); 
        setTimeout(() => {
          setFadeOut(true); 
          setTimeout(() => {
            navigate("/outro");
          }, 400); 
        }, 600); 
      }, 400); 
    }

    if (currentText === "Great, let our planners craft the perfect setting for your magical day.") {
      setTimeout(() => {
        setStayVisible(false); 
        setTimeout(() => {
          setFadeOut(true); 
          setTimeout(() => {
            navigate("/guests");
          }, 400); 
        }, 400); 
      }, 400); 
    }

  }, [currentText, navigate]);

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center loader-outer" style={{overflow : "hidden"}}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }} 
        animate={{
          opacity: fadeOut ? 0 : 1, 
          y: fadeOut ? 0 : "0%" 
        }} 
        exit={{ opacity: 0 }} 
        transition={{ duration: 0.3 }} 
        className="h-72 w-72 lg:h-96 lg:w-96 rounded-full flex flex-col justify-center items-center"
        style={{ borderColor: "white", boxShadow: "0 0 40px 20px rgba(255, 255, 255, 0.6)" }}
      >
        <img src={currentImage} className="mix-blend-darken w-8 lg:w-10" alt="" />
        <p style={{ color: "#B2AC87" }} className="px-10 text-center text-md md:text-lg lg:text-xl">
          {currentText}
        </p>
      </motion.div>
    </div>
  );
}

export default Loader;