import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const App = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    // Generate an array of numbers from 1 to 100 (increase if needed)
    const generatedNumbers = Array.from({ length: 100 }, (_, i) => i + 1);
    setNumbers(generatedNumbers);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Scan QR for AR Text Experiment</h1>
      <QRCodeCanvas value="https://sburambekova.github.io/AR_new" size={200} />
      <p>Scan this QR code and look at the Hiro marker.</p>

      {/* AR.js Scene */}
      <a-scene embedded arjs style={{ width: "100%", height: "500px", margin: "20px auto" }}>
        <a-marker preset="hiro">
          <a-plane position="0 0 0" rotation="-90 0 0" width="4" height="6" color="white"></a-plane>
          
          {/* Display numbers in AR for readability testing */}
          {numbers.map((num, index) => (
            <a-text 
              key={num}
              value={`${num}`}
              position={`0 ${(index * 0.4) - 2} 0`} 
              align="center"
              color="black"
              scale="1.5 1.5 1"
              width="3"
            ></a-text>
          ))}
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default App;

