import React, { useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const App = () => {
  // Initialize AR scene after component mounts
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
      <h1>Scan QR for AR Experiment</h1>
      <QRCodeCanvas 
        value="https://sburambekova.github.io/AR_new/ar-text-app/ar.html" 
        size={200} 
      />
      <p>Scan this QR code to see AR text without a marker.</p>

      {/* AR Scene */}
      <a-scene 
        embedded 
        arjs="sourceType: webcam; debugUIEnabled: false"
        vr-mode-ui="enabled: false"
        style={{ width: '100%', height: '400px' }}
      >
        {/* Camera setup */}
        <a-camera gps-camera rotation-reader></a-camera>

        {/* Main text */}
        <a-text 
          value="📌 AR Text without Hiro Marker"
          position="0 1.5 -3" 
          align="center"
          color="black"
          scale="1.5 1.5 1"
        ></a-text>

        {/* Number sequence */}
        {[...Array(50)].map((_, i) => (
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
  );
};

export default App;