import React, { useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const ARExperiment = () => {
  useEffect(() => {
    // Ensure the scene is loaded before adding elements
    const sceneEl = document.querySelector("a-scene");
    if (sceneEl) {
      sceneEl.addEventListener("loaded", () => {
        const gridEl = document.getElementById("number-grid");
        gridEl.innerHTML = ""; // Clear old elements

        const rows = 10;
        const cols = 10;
        const spacing = 0.5;

        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const number = i * cols + j + 1;
            const textEl = document.createElement("a-text");

            // Position calculation
            const x = (j - cols / 2) * spacing;
            const y = (rows / 2 - i) * spacing;
            const z = -2; // Position slightly in front of the camera

            textEl.setAttribute("position", `${x} ${y} ${z}`);
            textEl.setAttribute("value", number);
            textEl.setAttribute("align", "center");
            textEl.setAttribute("color", "#FF0000");
            textEl.setAttribute("scale", "0.8 0.8 0.8");
            gridEl.appendChild(textEl);
          }
        }
      });
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Scan QR for AR Experiment</h1>

      {/* QR Code */}
      <QRCodeCanvas value="https://sburambekova.github.io/AR_new/" size={200} />

      <p>Scan this QR code to see the AR number grid.</p>

      {/* AR Scene */}
      <a-scene
        embedded
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false"
        vr-mode-ui="enabled: false"
        style={{ width: "100%", height: "400px", margin: "20px auto" }}
      >
        {/* White background */}
        <a-plane
          position="0 0 -5"
          width="20"
          height="20"
          color="white"
          material="shader: flat"
        ></a-plane>

        {/* Grid of numbers */}
        <a-entity id="number-grid" position="0 0 -2"></a-entity>

        {/* AR Camera */}
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default ARExperiment;

