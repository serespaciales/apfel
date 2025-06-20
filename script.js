document.addEventListener('DOMContentLoaded', () => {
    const messageEl = document.getElementById('message');
    const bgEl      = document.getElementById('bg');
  
    function loadApple() {
      // Para forzar imagen nueva en cada recarga
      const ts = Date.now();
  
      // Usamos el ancho y alto actual para pedir la resolución óptima
      const w = window.innerWidth;
      const h = window.innerHeight;
  
      // Fuente: Unsplash Source API, sin claves ni configuración
      const url = `https://source.unsplash.com/${w}x${h}/?apple&${ts}`;
  
      // Asignamos como fondo
      bgEl.style.backgroundImage = `url('${url}')`;
  
      // Cuando la imagen esté en caché (aprox), ocultamos el mensaje
      const img = new Image();
      img.onload = () => {
        messageEl.style.display = 'none';
      };
      img.onerror = () => {
        messageEl.textContent = 'Error al cargar la manzana.';
      };
      img.src = url;
    }
  
    loadApple();
  
    // (Opcional) Si quieres que cambie al rotar o redimensionar la ventana:
    window.addEventListener('resize', loadApple);
  });
  