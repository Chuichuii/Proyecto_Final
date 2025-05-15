
    document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos DOM
    const precioInput = document.getElementById('precio');
    const precioValor = document.getElementById('precio-valor');
    const btnApply = document.getElementById('btn-apply');
    const btnReset = document.getElementById('btn-reset');
    const packagesCounter = document.getElementById('packages-counter');
    const packageCards = document.querySelectorAll('.package-card');
    const destinoSelect = document.getElementById('destino');
    const duracionSelect = document.getElementById('duracion');
    const tipoSelect = document.getElementById('tipo');
    
    // Inicializar contador
    packagesCounter.textContent = packageCards.length;
    
    // Actualizar el valor del precio al mover el slider
    precioInput.addEventListener('input', function() {
        precioValor.textContent = '$' + Number(this.value).toLocaleString();
    });
    
    // Función para procesar el rango de duración
    function procesarDuracion(duracionSeleccionada, duracionPaquete) {
        if (!duracionSeleccionada) return true;
        
        // Parse duración del paquete
        const duracion = parseInt(duracionPaquete, 10);
        if (isNaN(duracion)) return true;
        
        // Procesar rango de duración
        if (duracionSeleccionada === '1-3') {
            return duracion >= 1 && duracion <= 3;
        } else if (duracionSeleccionada === '4-7') {
            return duracion >= 4 && duracion <= 7;
        } else if (duracionSeleccionada === '8-14') {
            return duracion >= 8 && duracion <= 14;
        } else if (duracionSeleccionada === '15+') {
            return duracion >= 15;
        }
        
        return true;
    }
    
    // Aplicar filtros
    function aplicarFiltros() {
        const destinoSeleccionado = destinoSelect.value;
        const duracionSeleccionada = duracionSelect.value;
        const precioMaximo = parseInt(precioInput.value, 10);
        const tipoSeleccionado = tipoSelect.value;
        
        let contadorVisibles = 0;
        
        packageCards.forEach(card => {
            try {
                // Obtener datos del paquete
                const destino = card.getAttribute('data-destino');
                const duracion = card.getAttribute('data-duracion');
                const precio = parseInt(card.getAttribute('data-precio'), 10);
                const tipo = card.getAttribute('data-tipo');
                
                // Verificar si cumple con los filtros
                let cumpleDestino = !destinoSeleccionado || destino === destinoSeleccionado;
                let cumpleDuracion = procesarDuracion(duracionSeleccionada, duracion);
                let cumplePrecio = !isNaN(precio) && precio <= precioMaximo;
                
                // Arreglo para detectar tanto el tipo en data-tipo como las clases de badge
                const tipoClass = card.querySelector('.package-badge').className;
                const tipoReal = tipo || '';
                let cumpleTipo = !tipoSeleccionado;
                
                if (tipoSeleccionado) {
                    // Comprobar tanto en data-tipo como en la clase del badge
                    cumpleTipo = tipoReal === tipoSeleccionado || 
                                tipoClass.includes('badge-' + tipoSeleccionado);
                }
                
                // Mostrar u ocultar el paquete según los filtros
                if (cumpleDestino && cumpleDuracion && cumplePrecio && cumpleTipo) {
                    card.style.display = 'block';
                    contadorVisibles++;
                } else {
                    card.style.display = 'none';
                }
            } catch (error) {
                console.error('Error al filtrar paquete:', error);
                card.style.display = 'block';
                contadorVisibles++;
            }
        });
        
        // Actualizar contador de paquetes
        packagesCounter.textContent = contadorVisibles;
        
        // Mostrar mensaje si no hay resultados
        if (contadorVisibles === 0) {
            // Opcionalmente, puedes mostrar un mensaje de "No se encontraron resultados"
            console.log('No se encontraron paquetes con los criterios seleccionados');
        }
    }
    
    // Reiniciar filtros
    function reiniciarFiltros() {
        destinoSelect.value = '';
        duracionSelect.value = '';
        precioInput.value = 5000;
        precioValor.textContent = '$5,000';
        tipoSelect.value = '';
        
        packageCards.forEach(card => {
            card.style.display = 'block';
        });
        
        packagesCounter.textContent = packageCards.length;
    }
    
    // Event listeners
    btnApply.addEventListener('click', aplicarFiltros);
    btnReset.addEventListener('click', reiniciarFiltros);
    
    // Botón volver arriba
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});