import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      const container = document.getElementById("numbers-container");

      if (container) {
        function createNumbers() {
          for (let i = 1; i <= 100; i++) {
            let num = document.createElement("a-text");
            num.setAttribute("value", i);
            num.setAttribute(
              "position",
              `${(i % 10) * 0.4 - 2} ${(Math.floor(i / 10) * -0.4) + 1.5} -3`
            );
            num.setAttribute("align", "center");
            num.setAttribute("color", "black");
            num.setAttribute("scale", "1.2 1.2 1");
            container.appendChild(num);
          }
        }
        createNumbers();

        // Move numbers based on device motion
        window.addEventListener("deviceorientation", (event) => {
          let beta = event.beta / 20; // Front-Back tilt
          let gamma = event.gamma / 20; // Left-Right tilt

          container.setAttribute("position", `${gamma} ${beta} -3`);
        });
      }
    }, 500);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>AR Experiment: Moving Numbers</h1>
      <p>Move your phone to see numbers shift dynamically.</p>

      {/* ✅ Inject A-Frame AR scene */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
          <a-scene embedded arjs>
            <a-entity camera look-controls="enabled: false"></a-entity>

            <a-text 
              value="AR Experiment"
              position="0 2 -3"  
              align="center"
              color="black"
              scale="1.5 1.5 1"
            ></a-text>

            <a-entity id="numbers-container"></a-entity>
          </a-scene>
          `,
        }}
      />
    </div>
  );
};

export default App;
