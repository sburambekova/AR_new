// ar-numbers.js
// AR Number Experience - Device Motion Controlled

const ARConfig = {
    totalNumbers: 64,
    sphereRadius: 2.0,
    baseScale: 0.3,
    movementFactor: 0.1,
    colors: {
        hueStart: 0,
        hueEnd: 360,
        saturation: 100,
        lightness: 50
    }
};

function initARExperience() {
    const scene = document.querySelector('a-scene');
    const numbersContainer = document.createElement('a-entity');
    numbersContainer.setAttribute('id', 'ar-numbers-container');

    // Create numbers in spherical pattern
    for(let i = 0; i < ARConfig.totalNumbers; i++) {
        const phi = Math.acos(-1 + (2 * i) / ARConfig.totalNumbers);
        const theta = Math.sqrt(ARConfig.totalNumbers * Math.PI) * phi;
        
        const x = ARConfig.sphereRadius * Math.cos(theta) * Math.sin(phi);
        const y = ARConfig.sphereRadius * Math.sin(theta) * Math.sin(phi);
        const z = ARConfig.sphereRadius * Math.cos(phi);
        
        const number = createNumberElement(i + 1, x, y, z);
        numbersContainer.appendChild(number);
    }

    scene.appendChild(numbersContainer);

    // Add device motion handling
    let beta = 0, gamma = 0;
    window.addEventListener('deviceorientation', (event) => {
        beta = event.beta * ARConfig.movementFactor; // Front/back tilt
        gamma = event.gamma * ARConfig.movementFactor; // Left/right tilt
        
        numbersContainer.setAttribute('rotation', 
            `${beta} ${gamma} 0`
        );
    });
}

function createNumberElement(value, x, y, z) {
    const number = document.createElement('a-text');
    const hue = (value / ARConfig.totalNumbers) * 360;
    
    number.setAttribute('value', value);
    number.setAttribute('position', `${x} ${y} ${z}`);
    number.setAttribute('color', `hsl(${hue}, 100%, 50%)`);
    number.setAttribute('scale', `${ARConfig.baseScale} ${ARConfig.baseScale} ${ARConfig.baseScale}`);
    number.setAttribute('look-at', '[camera]');
    number.setAttribute('animation', {
        property: 'scale',
        to: `${ARConfig.baseScale * 1.5} ${ARConfig.baseScale * 1.5} ${ARConfig.baseScale * 1.5}`,
        dir: 'alternate',
        dur: 2000,
        loop: true
    });

    return number;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loading').remove();
    const scene = document.querySelector('a-scene');
    
    scene.addEventListener('arjs-initialized', () => {
        if (typeof DeviceOrientationEvent !== 'undefined' && 
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permission => {
                    if (permission === 'granted') {
                        initARExperience();
                    }
                });
        } else {
            initARExperience();
        }
    });
});