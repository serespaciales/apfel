document.addEventListener('DOMContentLoaded', () => {
    const messageEl = document.getElementById('message');
    const bgEl = document.getElementById('bg');

    if (!messageEl || !bgEl) {
        console.error('Element not found: #message or #bg');
        return;
    }

    function loadApple() {
        const ts = Date.now();
        const w = window.innerWidth;
        const h = window.innerHeight;
        const url = `https://source.unsplash.com/${w}x${h}/?apple&${ts}`;

        bgEl.style.backgroundImage = `url('${url}')`;

        const img = new Image();
        img.onload = () => {
            messageEl.style.display = 'none';
        };
        img.onerror = () => {
            console.error('Failed to load image from:', url);
            messageEl.textContent = 'Error al cargar la manzana.';
        };
        setTimeout(() => {
            if (messageEl.style.display !== 'none') {
                messageEl.textContent = 'La imagen está tomando demasiado tiempo en cargar.';
            }
        }, 5000);
        img.src = url;
    }

    loadApple();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(loadApple, 500);
    });
});