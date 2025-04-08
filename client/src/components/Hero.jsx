import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-center bg-black text-yellow-400 py-16 px-6 sm:px-12">
      {/* Left side: Text */}
      <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start text-center sm:text-left bg-black">
        <p className="text-lg md:text-xl bg-black italic">
          Welcome to the Wizarding World
        </p>
        <h1 className="text-4xl sm:text-6xl font-harryPotter bg-black mt-4">
          The Magic Awaits
        </h1>
        <p className="mt-3 text-lg bg-black md:text-xl">
          Discover spellbinding collections and mystical artifacts.
        </p>
        <Link className="bg-black mt-2" to="/collection">
          <motion.button
            className={`px-8 py-3 bg-yellow-400 text-black text-lg rounded-2xl shadow-md transition duration-300 magical-glow ${
              isClicked ? "magic-click" : ""
            }`}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsClicked(true);
              setTimeout(() => setIsClicked(false), 1000);
            }}
          >
            Enter the Wizarding World
          </motion.button>
        </Link>
      </div>

      {/* Right side: Image */}
      <div className="w-full sm:w-1/2 flex justify-center">
        <img
          className="w-3/4 sm:w-full drop-shadow-lg"
          src={assets.harry}
          alt="Harry Potter Theme"
        />
      </div>

      {/* Magic Effect */}
      {isClicked && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1.5 }}
          exit={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.6 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-yellow-400 text-5xl font-bold"
        >
          ✨ Lumos! ✨
        </motion.div>
      )}
    </div>
  );
};

export default Hero;
