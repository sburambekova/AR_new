//ARExperiment.js (No Motion Permissions)
//Initialize AR scene after component mounts
import React, { useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";

const App = () => {  
useEffect(() => {
    // Add AR.js script dynamically
    const script = document.createElement('script');
    script.src = "https://ar-js-org.github.io/AR.js/aframe/build/aframe-ar.min.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {/* AR Scene */}
      <a-scene 
        embedded 
        arjs="sourceType: webcam; debugUIEnabled: false"
        vr-mode-ui="enabled: false"
        style={{ width: '100%', height: '400px' }}
      >
        {/* Camera setup */}
        <a-camera gps-camera rotation-reader></a-camera>

        {/* Number sequence */}
        {[...Array(100)].map((_, i) => (
          <a-text 
            key={i}
            value={`${i + 1}`} 
            position={`${(i % 10) * 0.5 - 2} ${Math.floor(i / 10) * -0.5 + 1} -3`}
            align="center"
            color="blue"
            scale="0.8 0.8 0.8"
          ></a-text>
        ))}
      </a-scene>
    </div>

)};
