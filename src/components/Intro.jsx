import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Intro() {
  const navigate = useNavigate();
  const [exitAnimationTriggered, setExitAnimationTriggered] = useState(false);
  const [cardPosition, setCardPosition] = useState({ top: 0 }); // For dynamic card positioning
  const envelopeRef = useRef(null); // Ref to track envelope position
  const cardRef = useRef(null); // Ref to track card position

  // Calculate the position of the envelope and adjust card position accordingly
  useEffect(() => {
    const envelopeRect = envelopeRef.current?.getBoundingClientRect();
    if (envelopeRect) {
      // Adjust the card to be slightly above the envelope
      setCardPosition({
        top: envelopeRect.top - envelopeRect.height * 0.35, // Adjust to 35% above the envelope's height
      });
    }
  }, []);

  // Disable scrollbars globally
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Ensure body doesn't scroll

    return () => {
      document.body.style.overflow = "auto"; // Re-enable scroll when component unmounts
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
          overflow: "hidden", // Ensure the container doesn't scroll
        }}
      >
        <Header /> {/* Header stays fixed at the top */}
        <div
          className="relative flex items-center justify-center min-h-screen"
          style={{ overflow: "hidden" }}
        >
          {/* Envelope animation */}
          <motion.img
            ref={envelopeRef} // Use ref to track envelope position
            src="/images/Letter.png"
            alt="envelope"
            variants={envelopeVariants}
            initial="hidden"
            animate={exitAnimationTriggered ? "exit" : "visible"}
            style={{
              width: "35vw", // Responsive sizing for envelope
              maxWidth: "350px",
              position: "relative", // Relative to keep the card in sync
            }}
          />

          {/* Card animation */}
          <motion.img
            ref={cardRef} // Use ref for card as well
            src="/images/Card.png"
            alt="card"
            variants={cardVariants}
            initial="hidden"
            animate={exitAnimationTriggered ? "exit" : "popOut"}
            style={{
              width: "30vw", // Responsive sizing for card
              maxWidth: "300px",
              position: "absolute", // Absolute to stick on the envelope
              top: `${cardPosition.top}px`, // Dynamically set card position based on envelope
              zIndex: 1, // Ensure card appears in front of the envelope
            }}
            onAnimationComplete={() => handleExit()} // Start exit animation after popOut
          />
        </div>
      </div>
    </>
  );
}

export default Intro;
