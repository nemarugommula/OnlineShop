import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Toast({ toast, setToast }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast({
        color: null,
        message: null,
        show: false,
      });
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [setToast, toast]);
  return (
    <div className="absolute shadow-md bg-white rounded-sm top-10 ">
      {toast.show ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="font-light tracking-widest text-lg px-5 py-3">
            {toast.message}
          </div>
          <motion.div
            initial={{ width: "0px" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, delay: 1, type: "ease" }}
            className={`h-1 ${toast.color}`}
          ></motion.div>
        </motion.div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Toast;
