// ar-numbers.js
// AR Number Experience - Device Motion Controlled
// ARExperiment.js
document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    const numbersContainer = document.getElementById('numbers-container');
    let beta = 0, gamma = 0;

    // Configuration
    const config = {
        totalNumbers: 100,
        baseZ: -3,
        moveSensitivity: 0.1,
        scale: 0.4,
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']
    };

    // Create numbers with motion
    function createNumbers() {
        for(let i = 0; i < config.totalNumbers; i++) {
            const number = document.createElement('a-text');
            number.setAttribute('value', i+1);
            number.setAttribute('color', config.colors[i%config.colors.length]);
            number.setAttribute('scale', `${config.scale} ${config.scale} ${config.scale}`);
            number.setAttribute('look-at', '[camera]');
            number.setAttribute('class', 'ar-number');
            
            // Initial random position
            number.setAttribute('position', {
                x: (Math.random() - 0.5) * 5,
                y: (Math.random() - 0.5) * 3,
                z: config.baseZ
            });

            numbersContainer.appendChild(number);
        }
    }

    // Update number positions based on device motion
    function updateNumbers() {
        const numbers = document.querySelectorAll('.ar-number');
        numbers.forEach((number, index) => {
            const position = number.getAttribute('position');
            const newX = position.x + (gamma * config.moveSensitivity);
            const newY = position.y + (beta * config.moveSensitivity);
            
            number.setAttribute('position', {
                x: newX,
                y: newY,
                z: config.baseZ + (Math.sin(Date.now()/1000 + index)*0.5)
            });
        });
    }

    // Device motion handler
    window.addEventListener('deviceorientation', (e) => {
        beta = e.beta * 0.01;  // Front/back tilt
        gamma = e.gamma * 0.01; // Left/right tilt
    });

    // Animation loop
    function animate() {
        updateNumbers();
        requestAnimationFrame(animate);
    }

    // Initialize
    scene.addEventListener('arjs-initialized', () => {
        document.getElementById('loading').remove();
        createNumbers();
        animate();
    });
});