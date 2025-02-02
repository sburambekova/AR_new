// ar-numbers.js
// AR Number Experience - Camera-Relative Numbers

// Configuration Object
const ARConfig = {
    totalNumbers: 64,      // Total numbers to display
    circleRadius: 1.5,     // Radius of number circle (meters)
    baseScale: 0.25,       // Base size of numbers
    rotationSpeed: 0.5,    // Rotation speed (degrees per frame)
    colors: {              // Color settings
        hueStart: 0,
        hueEnd: 360,
        saturation: 100,
        lightness: 50
    },
    positionOffset: {      // Position relative to camera
        x: 0,
        y: 0,
        z: -1
    }
};

// Initialize AR Experience
function initARExperience() {
    // Get scene element
    const scene = document.querySelector('a-scene');
    
    // Create numbers container
    const numbersContainer = document.createElement('a-entity');
    numbersContainer.setAttribute('id', 'ar-numbers-container');
    numbersContainer.setAttribute('position', 
        `${ARConfig.positionOffset.x} ${ARConfig.positionOffset.y} ${ARConfig.positionOffset.z}`
    );
    
    // Create numbers in circular pattern
    for(let i = 0; i < ARConfig.totalNumbers; i++) {
        const angle = (i / ARConfig.totalNumbers) * Math.PI * 2;
        const x = Math.cos(angle) * ARConfig.circleRadius;
        const y = Math.sin(angle) * ARConfig.circleRadius;
        
        const number = createNumberElement(i + 1, x, y);
        numbersContainer.appendChild(number);
    }
    
    // Add animation system
    let rotation = 0;
    scene.addEventListener('renderstart', () => {
        scene.addEventListener('oneframe', (e) => {
            rotation += ARConfig.rotationSpeed;
            numbersContainer.setAttribute('rotation', `0 0 ${rotation}`);
        });
    });

    // Add to camera rig
    const cameraRig = document.querySelector('#camera-rig');
    cameraRig.appendChild(numbersContainer);
}

// Create Individual Number Element
function createNumberElement(value, x, y) {
    const number = document.createElement('a-text');
    const hue = (value / ARConfig.totalNumbers) * 
               (ARConfig.colors.hueEnd - ARConfig.colors.hueStart) + 
               ARConfig.colors.hueStart;
    
    number.setAttribute('value', value);
    number.setAttribute('position', `${x} ${y} 0`);
    number.setAttribute('color', `hsl(${hue}, ${ARConfig.colors.saturation}%, ${ARConfig.colors.lightness}%)`);
    number.setAttribute('scale', `${ARConfig.baseScale} ${ARConfig.baseScale} ${ARConfig.baseScale}`);
    number.setAttribute('look-at', '[camera]');
    number.setAttribute('class', 'ar-number');
    
    // Add click interaction
    number.addEventListener('click', () => {
        number.setAttribute('scale', '0.4 0.4 0.4');
        setTimeout(() => {
            number.setAttribute('scale', `${ARConfig.baseScale} ${ARConfig.baseScale} ${ARConfig.baseScale}`);
        }, 200);
    });
    
    return number;
}

// Wait for AR.js to initialize
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading message
    const loading = document.getElementById('loading');
    if(loading) loading.remove();
    
    // Error handling
    const scene = document.querySelector('a-scene');
    scene.addEventListener('arjs-error', (error) => {
        console.error('AR.js Error:', error.detail);
        alert('AR initialization failed: ' + error.detail);
    });

    // Start experience when ready
    scene.addEventListener('arjs-initialized', () => {
        try {
            initARExperience();
        } catch(error) {
            console.error('AR Experience Error:', error);
            alert('Failed to initialize AR experience');
        }
    });
});