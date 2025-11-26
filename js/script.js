document.addEventListener('DOMContentLoaded', function () {
    // =================================================================
    // MENÚ DE NAVEGACIÓN RESPONSIVE
    // =================================================================
    const botonDesplegar = document.getElementById("desplegar-menu");
    const menuDesplegable = document.querySelector(".menu-desplegable");

    if (botonDesplegar && menuDesplegable) {
        const toggleMenu = () => {
            menuDesplegable.style.display = (menuDesplegable.style.display === "block") ? "none" : "block";
        };

        botonDesplegar.addEventListener("mouseover", () => {
            if (window.innerWidth >= 768) { // Solo en escritorio
                 menuDesplegable.style.display = "block";
            }
        });

        menuDesplegable.addEventListener("mouseleave", () => {
             if (window.innerWidth >= 768) {
                menuDesplegable.style.display = "none";
             }
        });

        botonDesplegar.addEventListener("click", (event) => {
            if (window.innerWidth < 768) { // Solo en móvil
                event.stopPropagation();
                toggleMenu();
            }
        });
         document.addEventListener("click", (event) => {
            if (window.innerWidth < 768 && !menuDesplegable.contains(event.target) && event.target !== botonDesplegar) {
                menuDesplegable.style.display = "none";
            }
        });
    }

    // =================================================================
    // FORMULARIO DE CONTACTO (Página: sugerencias.html)
    // (LÓGICA ACTUALIZADA PARA USAR FETCH CON FORMSPREE)
    // =================================================================
    const sugerenciaForm = document.getElementById('sugerencia-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');

    if (sugerenciaForm) {
        sugerenciaForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const formData = new FormData(sugerenciaForm);
            const submitButton = sugerenciaForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent; // Guarda el texto original del botón

            if (successMessage) successMessage.style.display = 'none';
            if (errorMessage) errorMessage.style.display = 'none';
            
            submitButton.disabled = true;
            // Busca el <p> dentro del botón para cambiar el texto
            const buttonTextElement = submitButton.querySelector('p');
            if(buttonTextElement) buttonTextElement.textContent = 'Enviando...';

            try {
                const response = await fetch(sugerenciaForm.action, {
                    method: sugerenciaForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // RECOMENDACIÓN: No ocultar el formulario, solo resetearlo
                    // sugerenciaForm.style.display = 'none'; // <-- LÍNEA ORIGINAL COMENTADA
                    sugerenciaForm.reset(); // <-- LÍNEA AÑADIDA
                    
                    if (successMessage) successMessage.style.display = 'block';
                    
                    // RECOMENDACIÓN: Restaurar el botón también en caso de éxito
                    submitButton.disabled = false;
                    if(buttonTextElement) buttonTextElement.textContent = originalButtonText;

                } else {
                    if (errorMessage) errorMessage.style.display = 'block';
                    submitButton.disabled = false;
                    if(buttonTextElement) buttonTextElement.textContent = originalButtonText; // Restaura el texto original
                }
            } catch (error) {
                console.error('Error al enviar formulario:', error);
                if (errorMessage) errorMessage.style.display = 'block';
                submitButton.disabled = false;
                if(buttonTextElement) buttonTextElement.textContent = originalButtonText; // Restaura el texto original
            }
        });
    }

    // =================================================================
    // DESPLEGABLE DE SERVICIOS (Página: servicios.html)
    // =================================================================
    $('.servicio-toggle-btn').on('click', function() {
        // Encuentra el contenido detallado
        var $detail = $(this).next('.servicio-detail');
        
        // Muestra u oculta el contenido con una animación suave
        $detail.slideToggle();
        
        // Cambia el texto del botón y la clase
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).text('Ver menos');
        } else {
            $(this).text('Ver más');
        }
    });

// BOTÓN VOLVER ARRIBA
const btnBackToTop = document.getElementById("btn-back-to-top");

if(btnBackToTop) {
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            btnBackToTop.style.display = "block";
        } else {
            btnBackToTop.style.display = "none";
        }
    };

    btnBackToTop.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
});