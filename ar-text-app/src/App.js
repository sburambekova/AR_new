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

        function requestMotionPermission() {
          if (
            typeof DeviceMotionEvent !== "undefined" &&
            typeof DeviceMotionEvent.requestPermission === "function"
          ) {
            DeviceMotionEvent.requestPermission()
              .then((permission) => {
                if (permission === "granted") {
                  console.log("Motion permission granted");
                  setupMotionTracking();
                }
              })
              .catch(console.error);
          } else {
            console.log("Motion permission not required");
            setupMotionTracking();
          }
        }

        function setupMotionTracking() {
          console.log("✅ Motion tracking started!");

          // ✅ Use device motion & orientation to detect movement
          window.addEventListener("devicemotion", (event) => {
            let accX = event.accelerationIncludingGravity.x || 0;
            let accY = event.accelerationIncludingGravity.y || 0;

            console.log(`📌 Motion detected: accX=${accX}, accY=${accY}`);
            container.setAttribute("position", `${accX / 10} ${accY / 10} -3`);
          });

          window.addEventListener("deviceorientation", (event) => {
            let beta = event.beta || 0; // Forward-Back tilt
            let gamma = event.gamma || 0; // Left-Right tilt

            console.log(`📌 Orientation detected: beta=${beta}, gamma=${gamma}`);
            container.setAttribute("position", `${gamma / 20} ${beta / 20} -3`);
          });
        }

        document.addEventListener("click", requestMotionPermission, {
          once: true,
        });
      }
    }, 500);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>AR Experiment: Moving Numbers</h1>
      <p>Tap the screen to enable motion controls.</p>

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
