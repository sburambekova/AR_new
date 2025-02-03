// import React, { useEffect } from 'react';
// import 'aframe';
// import 'ar.js';

// const App = () => {
//   useEffect(() => {
//     const scene = document.querySelector('a-scene');
    
//     const createNumbers = () => {
//       const container = document.getElementById("numbers-container");
//       const rows = 10;
//       const cols = 10;
//       const spacing = 0.8;

//       for(let i = 0; i < rows; i++) {
//         for(let j = 0; j < cols; j++) {
//           const number = document.createElement('a-text');
//           const num = i * cols + j + 1;
          
//           number.setAttribute('value', num);
//           number.setAttribute('position', {
//             x: (j - cols/2) * spacing,
//             y: (rows/2 - i) * spacing,
//             z: -3
//           });
//           number.setAttribute('color', '#00FF00');
//           number.setAttribute('scale', '0.5 0.5 0.5');
//           number.setAttribute('look-at', '[camera]');
//           container.appendChild(number);
//         }
//       }
//     };

//     // Handle device motion
//     const setupMotionTracking = () => {
//       let beta = 0, gamma = 0;

//       window.addEventListener('deviceorientation', (event) => {
//         beta = event.beta * 0.05;
//         gamma = event.gamma * 0.05;
        
//         scene.camera.el.object3D.rotation.set(
//           THREE.MathUtils.degToRad(beta),
//           THREE.MathUtils.degToRad(gamma),
//           0
//         );
//       });
//     };

//     // iOS permission handling
//     const handlePermissions = () => {
//       if (typeof DeviceOrientationEvent !== 'undefined' && 
//           typeof DeviceOrientationEvent.requestPermission === 'function') {
//         DeviceOrientationEvent.requestPermission()
//           .then(permission => {
//             if (permission === 'granted') {
//               createNumbers();
//               setupMotionTracking();
//             }
//           });
//       } else {
//         createNumbers();
//         setupMotionTracking();
//       }
//     };

//     scene.addEventListener('arjs-initialized', handlePermissions);

//   }, []);

//   return (
//     <div style={{ textAlign: 'center', marginTop: '20px' }}>
//       <h1>AR Moving Numbers</h1>
//       <p>Move your phone to explore numbers in space</p>
      
//       <a-scene
//         embedded
//         arjs="sourceType: webcam; debugUIEnabled: false"
//         renderer="logarithmicDepthBuffer: true;"
//       >
//         <a-camera 
//           arjs-device-orientation-controls 
//           look-controls="enabled: false"
//         ></a-camera>
        
//         <a-entity id="numbers-container"></a-entity>
        
//         <a-light type="ambient" color="#445"></a-light>
//         <a-light type="point" intensity="2" position="0 2 0"></a-light>
//       </a-scene>
//     </div>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const App = () => {
 
  const arPageUrl = "https://sburambekova.github.io/AR_new/ar.html";
  useEffect(() => {
        const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@ar-js-org/ar.js@3.3.2/aframe/build/aframe-ar.min.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Scan QR for AR Experiment</h1>

 

      <QRCodeCanvas value="https://sburambekova.github.io/AR_new/" size={200} />
      
      <p>Scan this QR code to see AR text without a marker.</p>

      <a-scene embedded arjs>
    <a-entity camera></a-entity>

    {/* Floating text in AR (Centered) */}
    <a-text 
      value="AR Text without Hiro Marker"
      position="0 2 -3" 
      align="center"
      color="black"
      scale="1.5 1.5 1"
    ></a-text>


    <a-entity id="numbers-container">
        {[...Array(100)].map((_, i) => (
            <a-text 
              key={i}
              value={`${i + 1}`} 
              position={`${(i % 10) * 0.4 - 2} ${Math.floor(i / 10) * -0.4 + 1.5} -2.5`}  
              align="center"
              color="black"
              scale="1.2 1.2 1"
            ></a-text>
        ))}
    </a-entity>
</a-scene>

    </div>
    );
    };

export default App;