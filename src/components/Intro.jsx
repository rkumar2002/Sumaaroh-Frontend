import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Intro() {
  const navigate = useNavigate();
  const [exitAnimationTriggered, setExitAnimationTriggered] = useState(false);
  const [cardPosition, setCardPosition] = useState({ top: 0 }); 
  const envelopeRef = useRef(null);
  const cardRef = useRef(null); 

  // Calculate the position of the envelope and adjust card position 
  useEffect(() => {
    const envelopeRect = envelopeRef.current?.getBoundingClientRect();
    if (envelopeRect) {
      setCardPosition({
        top: envelopeRect.top - envelopeRect.height * 0.35, 
      });
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden"; 

    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, []);

  // Envelope animation
  const envelopeVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  // Card animation
  const cardVariants = {
    hidden: { opacity: 0, y: "100%" },
    popOut: {
      y: "-25%",
      opacity: 1,
      transition: { delay: 1.5, duration: 1, ease: "easeOut" },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  // Trigger exit animation for both card and envelope
  const handleExit = () => {
    setExitAnimationTriggered(true);
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Background.png')",
          backgroundRepeat: "no-repeat",
          overflow: "hidden", 
        }}
      >
        <Header />
        <div
          className="relative flex items-center justify-center min-h-screen"
          style={{ overflow: "hidden" }}
        >
          {/* Envelope animation */}
          <motion.img
            ref={envelopeRef} 
            src="/images/Letter.png"
            alt="envelope"
            variants={envelopeVariants}
            initial="hidden"
            animate={exitAnimationTriggered ? "exit" : "visible"}
            style={{
              width: "35vw", 
              maxWidth: "350px",
              position: "relative", 
            }}
          />

          {/* Card animation */}
          <motion.img
            ref={cardRef} 
            src="/images/Card.png"
            alt="card"
            variants={cardVariants}
            initial="hidden"
            animate={exitAnimationTriggered ? "exit" : "popOut"}
            style={{
              width: "30vw",
              maxWidth: "300px",
              position: "absolute", 
              top: `${cardPosition.top}px`, 
              zIndex: 1, 
            }}
            onAnimationComplete={() => handleExit()}
          />
        </div>
      </div>
    </>
  );
}

export default Intro;
