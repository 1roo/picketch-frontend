import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation.json";

const LoadingAnimation: React.FC = () => {
  return (
    <div style={containerStyle}>
      <Lottie animationData={animationData} autoplay loop style={lottieStyle} />
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#101010",
  zIndex: 9999,
};

const lottieStyle: React.CSSProperties = {
  width: 350,
  height: 350,
};

export default LoadingAnimation;
