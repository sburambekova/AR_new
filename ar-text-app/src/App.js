

// import React, { useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";

// const App = () => {
//   // Initialize AR scene after component mounts
//   useEffect(() => {
//     // Add AR.js script dynamically
//     const script = document.createElement('script');
//     script.src = "https://ar-js-org.github.io/AR.js/aframe/build/aframe-ar.min.js";
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h1>Scan QR for AR Experiment</h1>
//       <QRCodeCanvas value="https://sburambekova.github.io/AR_new/ar.html" size={200} />

//       <p>Scan this QR code to see AR text without a marker.</p>

//       {/* AR Scene */}
//       <a-scene 
//         embedded 
//         arjs="sourceType: webcam; debugUIEnabled: false"
//         vr-mode-ui="enabled: false"
//         style={{ width: '100%', height: '400px' }}
//       >
//         {/* Camera setup */}
//         <a-camera gps-camera rotation-reader></a-camera>

//         {/* /* Main text
//         <a-text 
//           value="📌 AR Text without Hiro Marker"
//           position="0 1.5 -3" 
//           align="center"
//           color="black"
//           scale="1.5 1.5 1"
//         ></a-text> */ }

//         {/* Number sequence */}
//         {[...Array(100)].map((_, i) => (
//           <a-text 
//             key={i}
//             value={`${i + 1}`} 
//             position={`${(i % 10) * 0.5 - 2} ${Math.floor(i / 10) * -0.5 + 1} -3`}
//             align="center"
//             color="blue"
//             scale="0.8 0.8 0.8"
//           ></a-text>
//         ))}
//       </a-scene>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const App = () => {
 
  const arPageUrl = "https://sburambekova.github.io/AR_new/ar.html";

  return (
    <div style={{ 
      textAlign: "center", 
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "30px" }}>
        AR Number Visibility Experiment
      </h1>
      
      <div style={{ 
        backgroundColor: "white", 
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <QRCodeCanvas 
          value={arPageUrl} 
          size={256}
          style={{ marginBottom: "20px" }}
        />
        
        <p style={{ 
          color: "#7f8c8d",
          fontSize: "1.1em",
          lineHeight: "1.6",
          marginTop: "20px"
        }}>
          Scan this QR code with your mobile device's camera to launch the AR experience. 
          When prompted, allow camera access and move your device slowly to see numbers 
          floating in 3D space.
        </p>
      </div>
    </div>
  );
};

export default App;