// ARExperiment.js
document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    const loading = document.getElementById('loading');
    let initialized = false;

    // Update loading message states
    function updateLoading(text) {
        loading.innerHTML = text;
    }

    // 1. Handle camera access
    scene.addEventListener('arjs-video-loaded', () => {
        updateLoading('Camera ready - waiting for motion permissions...');
        
        // 2. Request device motion permissions (iOS specific)
        if (typeof DeviceOrientationEvent !== 'undefined' && 
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permission => {
                    if (permission === 'granted') {
                        initializeAR();
                    } else {
                        updateLoading('Motion access required - reload and allow permissions');
                    }
                })
                .catch(error => {
                    console.error('Permission error:', error);
                    updateLoading('Error: ' + error.message);
                });
        } else {
            initializeAR();
        }
    });

    // 3. Initialize AR after permissions
    function initializeAR() {
        updateLoading('Initializing AR experience...');
        
        // Create numbers
        const numbersContainer = document.createElement('a-entity');
        for(let i = 0; i < 100; i++) {
            const number = document.createElement('a-text');
            number.setAttribute('value', i+1);
            number.setAttribute('position', {
                x: (Math.random() - 0.5) * 4,
                y: (Math.random() - 0.5) * 3,
                z: -3
            });
            number.setAttribute('color', `hsl(${(i/100)*360}, 100%, 50%)`);
            number.setAttribute('scale', '0.5 0.5 0.5');
            number.setAttribute('look-at', '[camera]');
            numbersContainer.appendChild(number);
        }
        scene.appendChild(numbersContainer);

        // 4. Final initialization
        scene.addEventListener('arjs-initialized', () => {
            initialized = true;
            loading.remove();
        });
    }

    // 5. Error handling
    scene.addEventListener('arjs-error', (event) => {
        console.error('AR Error:', event.detail);
        updateLoading(`AR Error: ${event.detail.error}`);
    });

    // Timeout fallback
    setTimeout(() => {
        if (!initialized) {
            updateLoading('Initialization timeout - check permissions and reload');
        }
    }, 10000);
});