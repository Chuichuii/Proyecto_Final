
        document.addEventListener('DOMContentLoaded', function() {
            // Control de filtros
            const precioInput = document.getElementById('precio');
            const precioValor = document.getElementById('precio-valor');
            const btnApply = document.getElementById('btn-apply');
            const btnReset = document.getElementById('btn-reset');
            const packagesCounter = document.getElementById('packages-counter');
            const packageCards = document.querySelectorAll('.package-card');
            
            // Actualizar el valor del precio al mover el slider
            precioInput.addEventListener('input', function() {
                precioValor.textContent = '$' + Number(this.value).toLocaleString();
            });
            
            // Aplicar filtros
            btnApply.addEventListener('click', function() {
                const destinoSeleccionado = document.getElementById('destino').value;
                const duracionSeleccionada = document.getElementById('duracion').value;
                const precioMaximo = parseInt(precioInput.value);
                const tipoSeleccionado = document.getElementById('tipo').value;
                
                let contadorVisibles = 0;
                
                packageCards.forEach(card => {
                    // Obtener datos del paquete
                    const destino = card.getAttribute('data-destino');
                    const duracion = parseInt(card.getAttribute('data-duracion'));
                    const precio = parseInt(card.getAttribute('data-precio'));
                    const tipo = card.getAttribute('data-tipo');
                    
                    // Verificar si cumple con los filtros
                    let cumpleDestino = destinoSeleccionado === '' || destino === destinoSeleccionado;
                    let cumpleDuracion = true;
                    
                    if (duracionSeleccionada !== '') {
                        const [min, max] = duracionSeleccionada.split('-');
                        if (max) {
                            cumpleDuracion = duracion >= parseInt(min) && duracion <= parseInt(max);
                        } else {
                            // Para el caso "15+"
                            cumpleDuracion = duracion >= parseInt(min.replace('+', ''));
                        }
                    }
                    
                    let cumplePrecio = precio <= precioMaximo;
                    let cumpleTipo = tipoSeleccionado === '' || tipo === tipoSeleccionado;
                    
                    // Mostrar u ocultar el paquete según los filtros
                    if (cumpleDestino && cumpleDuracion && cumplePrecio && cumpleTipo) {
                        card.style.display = 'block';
                        contadorVisibles++;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Actualizar contador de paquetes
                packagesCounter.textContent = contadorVisibles;
            });
            
            // Reiniciar filtros
            btnReset.addEventListener('click', function() {
                document.getElementById('destino').value = '';
                document.getElementById('duracion').value = '';
                document.getElementById('precio').value = 5000;
                precioValor.textContent = '$5,000';
                document.getElementById('tipo').value = '';
                
                packageCards.forEach(card => {
                    card.style.display = 'block';
                });
                
                packagesCounter.textContent = packageCards.length;
            });
            
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
