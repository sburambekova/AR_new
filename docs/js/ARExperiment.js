document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    const loading = document.getElementById('loading');
    let initialized = false;

    // New: Add tap-to-start overlay
    const tapOverlay = document.createElement('div');
    tapOverlay.style = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    tapOverlay.innerHTML = `<h3>Tap anywhere to start AR experience</h3>`;
    
    // New: Handle iOS permission flow
    function startAR() {
        // Remove tap overlay
        tapOverlay.remove();
        
        // iOS Motion Permission Flow
        if (typeof DeviceOrientationEvent !== 'undefined' && 
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            
            loading.textContent = 'Please allow motion access in the next dialog...';
            
            DeviceOrientationEvent.requestPermission()
                .then(permission => {
                    if (permission === 'granted') {
                        initializeAR();
                    } else {
                        loading.textContent = 'Motion access required - reload and allow permissions';
                    }
                })
                .catch(error => {
                    console.error('Permission error:', error);
                    loading.textContent = 'Error requesting motion access';
                });
        } else {
            initializeAR();
        }
    }

    // Existing initialization code
    function initializeAR() {
        // Your existing AR initialization code
        loading.remove();
        // Create numbers, setup motion listeners, etc...
    }

    // Show tap overlay on iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.appendChild(tapOverlay);
        document.addEventListener('click', startAR, { once: true });
    } else {
        initializeAR();
    }

    // Error handling
    scene.addEventListener('arjs-error', (error) => {
        console.error('AR Error:', error.detail);
        loading.textContent = `AR Error: ${error.detail.error}`;
    });
});