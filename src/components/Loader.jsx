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
        setStayVisible(false); // Make loader stay visible for 1.5s before fading out
        setTimeout(() => {
          setFadeOut(true); // Trigger fade-out animation
          setTimeout(() => {
            navigate("/venues"); // Navigate after fade-out
          }, 1000); // Wait for 1 second to complete the fade-out
        }, 1500); // Stay visible for 1.5 seconds
      }, 1000); // Hold for 1 second
    }

    // Third Loader
    if (currentText === "Tailoring venues to your requirements") {
      setTimeout(() => {
        setStayVisible(false); // Make loader stay visible for 1.5s before fading out
        setTimeout(() => {
          setFadeOut(true); // Trigger fade-out animation
          setTimeout(() => {
            navigate("/outro");
          }, 1000); // Navigate after fade-out
        }, 1500); // Stay visible for 1.5 seconds
      }, 1000); // Hold for 1 second
    }

    if (currentText === "Great, let our planners craft the perfect setting for your magical day.") {
      setTimeout(() => {
        setStayVisible(false); // Make loader stay visible for 1.5s before fading out
        setTimeout(() => {
          setFadeOut(true); // Trigger fade-out animation
          setTimeout(() => {
            navigate("/guests");
          }, 1000); // Navigate after fade-out
        }, 1000); // Stay visible for 1.5 seconds
      }, 1000); // Hold for 1 second
    }

  }, [currentText, navigate]);

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center loader-outer" style={{overflow : "hidden"}}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }} 
        animate={{
          opacity: fadeOut ? 0 : 1, // Fade out when fadeOut is true, otherwise fade in
          y: fadeOut ? 0 : "0%" // Only apply vertical movement for entrance
        }} 
        exit={{ opacity: 0 }} // Fade out when exiting without vertical movement
        transition={{ duration: 0.8 }} // Duration for entry and exit animations
        className="h-72 w-72 lg:h-96 lg:w-96 rounded-full flex flex-col justify-center items-center"
        style={{ borderColor: "white", boxShadow: "0 0 40px 20px rgba(255, 255, 255, 0.6)" }}
      >
        <img src={currentImage} className="mix-blend-darken w-8 lg:w-10" alt="eye" />
        <p style={{ color: "#B2AC87" }} className="px-10 text-center text-md md:text-lg lg:text-xl">
          {currentText}
        </p>
      </motion.div>
    </div>
  );
}

export default Loader;






// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// function Loader({ text, image }) {
//   const navigate = useNavigate();
//   const [currentText, setCurrentText] = useState(text);
//   const [currentImage, setCurrentImage] = useState(image);

//   useEffect(() => {
//     // First Loader
//     if (currentText === 'Shortlisting venues to accommodate your wedding party') {
//       setTimeout(() => {
//         setCurrentText('Curating styles that match your budget');
//         setCurrentImage('/images/House Icon.png');
//       }, 1500);
//     }

//     // Second Loader
//     if (currentText === 'Curating styles that match your budget') {
//       setTimeout(() => {
//         navigate('/venues');
//       }, 1500);
//     }

//     // Third Loader
//     if (currentText === 'Tailoring venues to your requirements') {
//       setTimeout(() => {
//         navigate('/outro');
//       }, 1500);
//     }

//   }, [currentText, navigate]);


//   return (
//     <div className="min-h-screen bg-cover bg-center flex justify-center items-center loader-outer">
//       <div
//         className="h-72 w-72 lg:h-96 lg:w-96 rounded-full flex flex-col justify-center items-center"
//         style={{ borderColor: "white", boxShadow: "0 0 40px 20px rgba(255, 255, 255, 0.6)" }}
//       >
//         <img src={currentImage} className="mix-blend-darken w-14 lg:w-20" alt="eye" />
//         <p style={{ color: "#B2AC87" }} className="px-10 text-center text-md md:text-lg lg:text-xl">
//           {currentText}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Loader;