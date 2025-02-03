import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const App = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {/* <h1>Scan QR for AR Experiment</h1>


      <QRCodeCanvas value="https://sburambekova.github.io/AR_new/ar.html" size={200} />

      <p>Scan this QR code to see AR text without a marker.</p>
      */}
    <a-scene embedded arjs>
        <a-entity camera></a-entity>

        {/* Floating text in AR */}
        <a-text 
          value="AR Text without Hiro Marker"
          position="0 1 -3" 
          align="right"
          color="black"
          scale="1 1 0.5"
        ></a-text>
       {/* Display Numbers Dynamically */}
       <a-entity id="numbers-container">
          {[...Array(100)].map((_, i) => (
            <a-text 
              key={i}
              value={`${i + 1}`} 
              position={`${(i % 10) * 0.2 - 4} ${Math.floor(i / 10) * -0.8 + 3} -3`}
              align="center"
              color="black"
              scale="0.5 0.5 0.5"
            ></a-text>
          ))}
       </a-entity>
</a-scene>


    </div>
  );
};

export default App;
