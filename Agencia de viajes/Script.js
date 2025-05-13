document.addEventListener('DOMContentLoaded', function() {
 
  initMobileNavigation();
  

  initContactForm();
  
 
  initSmoothScrolling();
});


function initMobileNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  
  if (!menuToggle || !nav) {
    console.error('Elementos de navegación no encontrados');
    return;
  }
  
 
  function toggleMenu() {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('open');
    

    if (!expanded && nav.querySelector('a')) {
      setTimeout(() => nav.querySelector('a').focus(), 100);
    }
  }
  
 
  menuToggle.addEventListener('click', toggleMenu);
  
  
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });
  

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && 
        !nav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      toggleMenu();
    }
  });
  
  // Cerrar el menú al redimensionar a pantalla grande
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('open')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    }
  });
}

/**
 * Inicializa el formulario de contacto con validación mejorada
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (!form) {
    console.error('Formulario de contacto no encontrado');
    return;
  }
  
  // Agregar validación en tiempo real
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', validateInput);
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validar todos los campos
    let isValid = true;
    inputs.forEach(input => {
      if (!validateInput({ target: input })) {
        isValid = false;
      }
    });
    
    if (!isValid) return;
    
    // Simulación de envío (aquí se enviaría a un servidor real)
    submitForm(form);
  });
}

/**
 * Valida un campo de entrada individual
 */
function validateInput(e) {
  const input = e.target;
  const value = input.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  // Eliminar mensajes de error anteriores
  const errorElement = input.parentNode.querySelector('.error-message');
  if (errorElement) {
    errorElement.remove();
  }
  
  // Validaciones específicas por tipo de campo
  if (input.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'Este campo es obligatorio';
  } else if (input.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Por favor, ingresa un correo electrónico válido';
    }
  }
  
  // Mostrar mensaje de error si es necesario
  if (!isValid) {
    const error = document.createElement('p');
    error.className = 'error-message';
    error.style.color = '#e11d48';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.textContent = errorMessage;
    input.parentNode.appendChild(error);
    input.setAttribute('aria-invalid', 'true');
  } else {
    input.setAttribute('aria-invalid', 'false');
  }
  
  return isValid;
}

/**
 * Procesa el envío del formulario
 */
function submitForm(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  // Deshabilitar el botón durante el envío
  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';
  
  // Simular retraso de red
  setTimeout(() => {
    const name = form.name.value.trim();
    
    // Mostrar mensaje de éxito
    alert(`¡Gracias por contactarnos, ${name}! Pronto te responderemos.`);
    form.reset();
    
    // Restaurar botón
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }, 1000);
  
  // En una implementación real, aquí iría código para enviar datos al servidor
  // fetch('/api/contact', {
  //   method: 'POST',
  //   body: new FormData(form)
  // }).then(...)
}

/**
 * Inicializa el desplazamiento suave para los enlaces de navegación
 */
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Ignorar si es solo # o no existe el elemento destino
      if (href === '#' || !document.querySelector(href)) return;
      
      e.preventDefault();
      
      const nav = document.getElementById('nav');
      const menuToggle = document.getElementById('menuToggle');
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      
      const targetElement = document.querySelector(href);
      const headerOffset = 60; // Altura aproximada del header
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
    });
  });
}

/**
 * Inicializa el carrusel de destinos
 */
function initDestinationCarousel() {
  const carousel = document.getElementById('destinationCarousel');
  if (!carousel) return;
  
  const slides = carousel.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  let currentSlide = 0;
  let interval;
  const autoplayTime = 5000; // Tiempo de cambio automático en ms
  
  // Elementos de control
  const prevButton = carousel.querySelector('.carousel-prev');
  const nextButton = carousel.querySelector('.carousel-next');
  const indicators = carousel.querySelector('.carousel-indicators');
  
  // Crear indicadores
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('button');
    indicator.classList.add('carousel-indicator');
    indicator.setAttribute('aria-label', `Ir al destino ${i + 1}`);
    indicator.setAttribute('tabindex', '0');
    indicator.addEventListener('click', () => goToSlide(i));
    indicators.appendChild(indicator);
  }
  
  const indicatorButtons = indicators.querySelectorAll('button');
  
  // Configurar primer slide como activo
  updateCarousel();
  
  // Configurar autoplay
  startAutoplay();
  
  // Event listeners para botones de navegación
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });
  }
  
  // Pausar autoplay cuando el mouse está sobre el carrusel
  carousel.addEventListener('mouseenter', () => {
    clearInterval(interval);
  });
  
  carousel.addEventListener('mouseleave', () => {
    startAutoplay();
  });
  
  // Event listeners para teclado
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentSlide - 1);
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(currentSlide + 1);
      resetAutoplay();
    }
  });
  
  // Soporte para gestos táctiles
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    // Deslizar a la izquierda (siguiente)
    if (touchStartX - touchEndX > swipeThreshold) {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    }
    // Deslizar a la derecha (anterior)
    if (touchEndX - touchStartX > swipeThreshold) {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    }
  }
  
  function goToSlide(index) {
    // Manejo circular de índices
    if (index < 0) {
      currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }
    
    updateCarousel();
  }
  
  function updateCarousel() {
    // Actualizar posición de los slides
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
      if (index === currentSlide) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      }
    });
    
    // Actualizar indicadores
    indicatorButtons.forEach((button, index) => {
      button.classList.toggle('active', index === currentSlide);
      button.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
    });
  }
  
  function startAutoplay() {
    interval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, autoplayTime);
  }
  
  function resetAutoplay() {
    clearInterval(interval);
    startAutoplay();
  }
}

// Agregar la inicialización del carrusel al resto de inicializaciones
document.addEventListener('DOMContentLoaded', function() {
  // Funciones existentes
  initMobileNavigation();
  initContactForm();
  initSmoothScrolling();
  
  // Nueva función para el carrusel
  initDestinationCarousel();
});

/**
 * Función genérica para inicializar carruseles
 * @param {string} carouselId - ID del contenedor del carrusel
 * @param {number} autoplayTime - Tiempo entre slides en milisegundos
 */
function initCarousel(carouselId, autoplayTime = 5000) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;
  
  const slides = carousel.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  let currentSlide = 0;
  let interval;
  
  // Elementos de control
  const prevButton = carousel.querySelector('.carousel-prev');
  const nextButton = carousel.querySelector('.carousel-next');
  const indicators = carousel.querySelector('.carousel-indicators');
  
  // Crear indicadores
  if (indicators) {
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement('button');
      indicator.classList.add('carousel-indicator');
      indicator.setAttribute('aria-label', `Ir al slide ${i + 1}`);
      indicator.setAttribute('tabindex', '0');
      indicator.addEventListener('click', () => goToSlide(i));
      indicators.appendChild(indicator);
    }
  }
  
  const indicatorButtons = indicators ? indicators.querySelectorAll('button') : [];
  
  // Configurar primer slide como activo
  updateCarousel();
  
  // Configurar autoplay
  startAutoplay();
  
  // Event listeners para botones de navegación
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });
  }
  
  // Pausar autoplay cuando el mouse está sobre el carrusel
  carousel.addEventListener('mouseenter', () => {
    clearInterval(interval);
  });
  
  carousel.addEventListener('mouseleave', () => {
    startAutoplay();
  });
  
  // Event listeners para teclado
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentSlide - 1);
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(currentSlide + 1);
      resetAutoplay();
    }
  });
  
  // Soporte para gestos táctiles
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    // Deslizar a la izquierda (siguiente)
    if (touchStartX - touchEndX > swipeThreshold) {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    }
    // Deslizar a la derecha (anterior)
    if (touchEndX - touchStartX > swipeThreshold) {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    }
  }
  
  function goToSlide(index) {
    // Manejo circular de índices
    if (index < 0) {
      currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }
    
    updateCarousel();
  }
  
  function updateCarousel() {
    // Actualizar posición de los slides
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
      if (index === currentSlide) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      }
    });
    
    // Actualizar indicadores
    if (indicatorButtons.length) {
      indicatorButtons.forEach((button, index) => {
        button.classList.toggle('active', index === currentSlide);
        button.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
      });
    }
  }
  
  function startAutoplay() {
    interval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, autoplayTime);
  }
  
  function resetAutoplay() {
    clearInterval(interval);
    startAutoplay();
  }
}

// Inicialización de carruseles al cargar el documento
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar navegación móvil y formulario de contacto
  if (typeof initMobileNavigation === 'function') initMobileNavigation();
  if (typeof initContactForm === 'function') initContactForm();
  if (typeof initSmoothScrolling === 'function') initSmoothScrolling();
  
  // Inicializar carruseles de manera genérica
  const destinationCarousel = document.getElementById('destinationCarousel');
  const testimonialsCarousel = document.getElementById('testimonialsCarousel');
  
  if (destinationCarousel) {
    initCarousel('destinationCarousel', 5000);
  }
  
  if (testimonialsCarousel) {
    initCarousel('testimonialsCarousel', 6000);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('testimonialsCarousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.testimonials-carousel-slide');
  const prevButton = carousel.querySelector('.testimonials-carousel-prev');
  const nextButton = carousel.querySelector('.testimonials-carousel-next');
  let currentSlide = 0;

  function showSlide(index) {
    // Ocultar todos los slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });

    // Manejar índice circular
    if (index < 0) {
      currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    // Mostrar slide actual
    slides[currentSlide].classList.add('active');
  }

  // Botón siguiente
  nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1);
  });

  // Botón anterior
  prevButton.addEventListener('click', () => {
    showSlide(currentSlide - 1);
  });

  // Cambio automático cada 5 segundos
  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
});

document.addEventListener('DOMContentLoaded', function() {
  const packageButtons = document.querySelectorAll('.btn-package');
  
  packageButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Obtener el título del paquete desde el elemento padre
      const packageCard = this.closest('.package-card');
      const packageTitle = packageCard.querySelector('.package-title').textContent;
      
      // Redirigir a la página de detalles
      window.location.href = 'detalle-paquete.html?paquete=' + encodeURIComponent(packageTitle);
    });
  });
});