document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const caption = document.getElementById('caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    let currentIndex = 0;

    function checkVisibility() {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                element.classList.add('visible'); // Agrega clase para mostrar
            } else {
                element.classList.remove('visible'); // Elimina clase para ocultar
            }
        });
    }

    function openLightbox(index) {
        const images = document.querySelectorAll('[data-lightbox="gallery"]');
        lightbox.style.display = 'flex';
        lightboxImage.src = images[index].href;
        caption.innerText = images[index].querySelector('img').alt;
        currentIndex = index;
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    function showPrev() {
        const images = document.querySelectorAll('[data-lightbox="gallery"]');
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1; // Muestra la última imagen si está en la primera
        openLightbox(currentIndex);
    }

    function showNext() {
        const images = document.querySelectorAll('[data-lightbox="gallery"]');
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0; // Regresa a la primera imagen si está en la última
        openLightbox(currentIndex);
    }

    document.querySelectorAll('[data-lightbox="gallery"]').forEach((element, index) => {
        element.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    checkVisibility(); // Comprueba la visibilidad al cargar la página
});
