document.addEventListener('DOMContentLoaded', () => {
  const messageEl = document.getElementById('message');
  const imgEl     = document.getElementById('apple');

  async function loadApple() {
    try {
      messageEl.textContent = 'Cargando…';
      // Llamada anónima a la API de Wikimedia Commons
      const resp = await fetch(
        'https://commons.wikimedia.org/w/api.php'
        + '?action=query'
        + '&generator=search'
        + '&gsrsearch=apple|manzana'
        + '&gsrlimit=20'
        + '&prop=imageinfo'
        + '&iiprop=url|extmetadata'
        + '&format=json'
        + '&origin=*'
      );
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const json = await resp.json();
      const pages = Object.values(json.query?.pages || {});

      // Filtrar sólo CC0 / Public Domain en metadatos
      const publicDomain = pages.filter(p => {
        const md  = p.imageinfo?.[0]?.extmetadata;
        const lic = md?.LicenseShortName?.value || '';
        return /public domain|cc0/i.test(lic);
      });

      if (publicDomain.length === 0) {
        throw new Error('No se encontraron manzanas públicas.');
      }

      // Elegir una al azar
      const pick = publicDomain[Math.floor(Math.random() * publicDomain.length)];
      const url  = pick.imageinfo[0].url;
      const title = pick.title || 'Manzana dominio público';

      // Mostrar imagen y ocultar mensaje
      imgEl.src = url;
      imgEl.alt = title;
      messageEl.style.display = 'none';

    } catch (err) {
      console.error('Error cargando la manzana:', err);
      messageEl.textContent = 'Error al cargar la imagen.';
    }
  }

  loadApple();
});
