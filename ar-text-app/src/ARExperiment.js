document.addEventListener('DOMContentLoaded', () => {
    // Wait for A-Frame to initialize
    window.addEventListener('arjs-nft-loaded', () => {
        // Remove loading message
        document.getElementById('loading').remove();

        // Create numbers container
        const numbersContainer = document.createElement('a-entity');
        numbersContainer.setAttribute('id', 'numbers-container');
        numbersContainer.setAttribute('position', '0 0 -1');
        document.querySelector('a-scene').appendChild(numbersContainer);

        // Number configuration
        const config = {
            totalNumbers: 50,
            radius: 1.2,
            baseScale: 0.25,
            rotationSpeed: 0.1
        };

        // Create numbers in circular pattern
        for(let i = 0; i < config.totalNumbers; i++) {
            const angle = (i / config.totalNumbers) * Math.PI * 2;
            const x = Math.cos(angle) * config.radius;
            const y = Math.sin(angle) * config.radius;
            
            const number = document.createElement('a-text');
            number.setAttribute('value', i + 1);
            number.setAttribute('position', `${x} ${y} 0`);
            number.setAttribute('color', `hsl(${(i/config.totalNumbers)*360}, 100%, 50%)`);
            number.setAttribute('scale', `${config.baseScale} ${config.baseScale} ${config.baseScale}`);
            number.setAttribute('look-at', '[camera]');
            
            numbersContainer.appendChild(number);
        }

        // Add animation
        let rotation = 0;
        document.querySelector('a-scene').addEventListener('renderstart', () => {
            setInterval(() => {
                rotation += config.rotationSpeed;
                numbersContainer.setAttribute('rotation', `0 0 ${rotation}`);
            }, 16);
        });
    });
});

