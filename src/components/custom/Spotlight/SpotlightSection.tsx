"use client";

import useMousePosition from "@/hooks/useMousePointer";
import { motion } from "framer-motion";
const SpotlightSection = () => {
  const mousePosition = useMousePosition();
  return (
    <div>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 bg-purple-500 blur-md scale-150 rounded-full pointer-events-none z-50"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
    </div>
  );
};

export default SpotlightSection;
