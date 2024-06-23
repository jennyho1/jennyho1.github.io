import gsap from 'gsap';

const attractElements = document.querySelectorAll('.attract');

attractElements.forEach(button => {
    const container = button.closest('.attract-container');

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const buttonX = button.offsetLeft + button.offsetWidth / 2;
        const buttonY = button.offsetTop + button.offsetHeight / 2;

        const distanceX = mouseX - buttonX;
        const distanceY = mouseY - buttonY;

        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        const attractionDistance = 150; // Distance at which button starts following cursor

        if (distance < attractionDistance) {
            const offsetX = distanceX * 0.15; // Adjust speed
            const offsetY = distanceY * 0.15; // Adjust speed

            gsap.to(button, {
                x: offsetX,
                y: offsetY,
                duration: 0.1
            });
        } else {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.3
            });
        }
    });

    container.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.3
        });
    });
});
