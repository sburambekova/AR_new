document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    const loading = document.getElementById('loading');

  
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

    function startAR() {
        tapOverlay.remove();

  
        if (typeof DeviceOrientationEvent !== 'undefined' && 
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            
            loading.textContent = 'Please allow motion access in the next dialog...';
            
            DeviceOrientationEvent.requestPermission()
                .then(permission => {
                    if (permission === 'granted') {
                        loading.remove();
                    } else {
                        loading.textContent = 'Motion access required - reload and allow permissions';
                    }
                })
                .catch(error => {
                    console.error('Permission error:', error);
                    loading.textContent = 'Error requesting motion access';
                });
        }
    }


    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.appendChild(tapOverlay);
        document.addEventListener('click', startAR, { once: true });
    }
});
