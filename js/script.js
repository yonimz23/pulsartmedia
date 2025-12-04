document.addEventListener('DOMContentLoaded', function () {
    // =================================================================
    // MENÚ DE NAVEGACIÓN RESPONSIVE (CON ANIMACIÓN DE ÍCONO)
    // =================================================================
    const botonDesplegar = document.getElementById("desplegar-menu");
    const menuDesplegable = document.querySelector(".menu-desplegable");

    if (botonDesplegar && menuDesplegable) {
        const toggleMenu = () => {
            // Alternar visibilidad del menú
            menuDesplegable.style.display = (menuDesplegable.style.display === "block") ? "none" : "block";
            // Alternar clase para la animación del ícono (X)
            botonDesplegar.classList.toggle("open"); 
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
            // Eliminamos el IF para que funcione en cualquier tamaño
            event.stopPropagation();
            toggleMenu();
        });
        
        // Cierra el menú al hacer clic fuera
         document.addEventListener("click", (event) => {
            if (window.innerWidth < 768 && !menuDesplegable.contains(event.target) && event.target !== botonDesplegar) {
                menuDesplegable.style.display = "none";
                botonDesplegar.classList.remove("open"); // Resetea la animación del ícono
            }
        });
    }

    // =================================================================
    // FORMULARIO DE CONTACTO (Página: sugerencias.html)
    // =================================================================
    const sugerenciaForm = document.getElementById('sugerencia-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');

    if (sugerenciaForm) {
        sugerenciaForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const formData = new FormData(sugerenciaForm);
            const submitButton = sugerenciaForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent; 

            if (successMessage) successMessage.style.display = 'none';
            if (errorMessage) errorMessage.style.display = 'none';
            
            submitButton.disabled = true;
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
                    sugerenciaForm.reset(); 
                    if (successMessage) successMessage.style.display = 'block';
                    
                    submitButton.disabled = false;
                    if(buttonTextElement) buttonTextElement.textContent = originalButtonText;

                } else {
                    if (errorMessage) errorMessage.style.display = 'block';
                    submitButton.disabled = false;
                    if(buttonTextElement) buttonTextElement.textContent = originalButtonText; 
                }
            } catch (error) {
                console.error('Error al enviar formulario:', error);
                if (errorMessage) errorMessage.style.display = 'block';
                submitButton.disabled = false;
                if(buttonTextElement) buttonTextElement.textContent = originalButtonText; 
            }
        });
    }

    // =================================================================
    // DESPLEGABLE DE SERVICIOS (Página: servicios.html)
    // =================================================================
    if (typeof $ !== 'undefined') { // Verifica que jQuery esté cargado
        $('.servicio-toggle-btn').on('click', function() {
            var $detail = $(this).next('.servicio-detail');
            $detail.slideToggle();
            
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                $(this).text('Ver menos');
            } else {
                $(this).text('Ver más');
            }
        });
    }

    // =================================================================
    // BOTÓN VOLVER ARRIBA
    // =================================================================
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

    // =================================================================
    // ANIMACIONES AL HACER SCROLL (Intersection Observer)
    // =================================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll('.bloque-inicio, .summary-card, .persona, .proyecto-card, section h2, .membership-content, .hero-box, .chart-card, .details-card, .benefit-item, .aliado-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
});