import React, { useEffect, useState } from "react";
import { FiCheckCircle, FiAlertTriangle, FiClock } from "react-icons/fi";

const Alert = ({ message, Description, type = "info", onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false); // State to manage exit animation

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsExiting(true); // Trigger exit animation
      setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
        setIsExiting(false); // Reset exit state after the alert disappears
      }, 500); // Wait for the exit animation to complete before fully hiding
    }, 5000); // Auto-close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  // Determine icon and border color based on the alert type
  const iconMap = {
    success: <FiCheckCircle className="text-green-600 w-6 h-6" />,
    warning: <FiAlertTriangle className="text-yellow-600 w-6 h-6" />,
    info: <FiClock className="text-blue-600 w-6 h-6" />,
  };

  const borderColorMap = {
    success: "border-green-600",
    warning: "border-yellow-600",
    info: "border-blue-600",
  };

  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-white ${borderColorMap[type]} border-l-4 p-5 rounded-lg shadow-lg z-50 max-w-lg flex items-center gap-4 ${isExiting ? "animate-slide-out" : "animate-slide-in"}`}
        >
          {iconMap[type]}
          <div>
            <h3 className="text-lg font-semibold mb-1">{message}</h3>
            <p className="text-gray-600">{Description}</p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default Alert;
