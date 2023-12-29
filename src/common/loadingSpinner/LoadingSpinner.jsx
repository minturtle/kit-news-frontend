import React, { useEffect } from "react";
import "./styles/LoadingSpinner.css";
import { SyncLoader } from "react-spinners";

const LoadingSpinner = () => {
  useEffect(() => {
    document.body.style.cssText = `
              position: fixed; 
              top: -${window.scrollY}px;
              overflow-y: scroll;
              width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div className="loading-container">
      <div className="loading">
        <SyncLoader
          color="#325F95"
          loading
          margin={5}
          size={10}
          speedMultiplier={1}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
