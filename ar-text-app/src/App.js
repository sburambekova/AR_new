import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const App = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Scan QR for AR Experiment</h1>
      
      {/* ✅ QR Code will open the AR page */}
      <QRCodeCanvas value="https://sburambekova.github.io/AR_new/ar-text-app/ar.html" size={200} />


      <p>Scan this QR code to see AR text without a marker.</p>

      {/* ✅ Markerless AR: No Hiro marker required */}
      <a-scene embedded arjs vr-mode-ui="enabled: false">
        <a-entity camera></a-entity>
        
        {/* Floating text in AR */}
        <a-text 
          value="📌 AR Text without Hiro Marker"
          position="0 1 -3" 
          align="center"
          color="black"
          scale="1.5 1.5 1"
        ></a-text>

        {/* Display Numbers Dynamically */}
        {[...Array(50)].map((_, i) => (
          <a-text 
            key={i}
            value={`${i + 1}`} 
            position={`0 ${(i * 0.4) - 2} -3`} 
            align="center"
            color="blue"
            scale="1.5 1.5 1"
          ></a-text>
        ))}
      </a-scene>
    </div>
  );
};

export default App;
