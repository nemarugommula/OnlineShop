import React from "react";
import { motion } from "framer-motion";

function Toast() {
  return (
    <motion.div
      initial={{ opacity: 0, top: -10 }}
      animate={{ top: 10, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute shadow-md bg-white rounded-sm top-10"
    >
      <div className="font-light text-lg px-5 py-3">This is a toast</div>
      <motion.div
        initial={{ width: "0px" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2 }}
        class="h-1 bg-gradient-to-r from-cyan-500 to-blue-500"
      ></motion.div>
    </motion.div>
  );
}

export default Toast;
