// Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
    menuToggle.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('open');
  });
  // Allow keyboard toggle on Enter and Space
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      menuToggle.click();
    }
  });

  // Contact form simple validation & submit
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    // Simple email regex check
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    alert(`Gracias por contactarnos, ${name}! Pronto te responderemos.`);
    form.reset();
  });

  document.addEventListener('DOMContentLoaded', () => {
    const carruselContainer = document.querySelector('.carrusel-container');
    const testItems = document.querySelectorAll('.test-item');
    const prevButton = document.querySelector('.carrusel-prev');
    const nextButton = document.querySelector('.carrusel-next');

    let currentIndex = 0;

    function updateCarrusel() {
      carruselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : testItems.length - 1;
      updateCarrusel();
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex < testItems.length - 1) ? currentIndex + 1 : 0;
      updateCarrusel();
    });
  });