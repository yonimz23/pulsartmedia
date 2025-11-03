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
    // MODO OSCURO / CLARO (Eliminado)
    // =================================================================


    // =================================================================
    // FORMULARIO DE CONTACTO (Página: sugerencias.html)
    // =================================================================
    const sugerenciaForm = document.getElementById('sugerencia-form');

    if (sugerenciaForm) {
        sugerenciaForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita que el formulario se envíe por defecto

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            if (!nombre || !email || !mensaje) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }

            // RECUERDA: Reemplaza "TU_SERVICE_ID" y "TU_TEMPLATE_ID" por tus propios IDs de EmailJS
            const SERVICE_ID = "TU_SERVICE_ID"; 
            const TEMPLATE_ID = "TU_TEMPLATE_ID";

            // Envía el formulario utilizando EmailJS
            emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                from_name: nombre,
                message: mensaje,
                email_id: email
            }).then(function (response) {
                const modal = document.getElementById('modal');
                if(modal) modal.style.display = 'block';
                sugerenciaForm.reset();
            }).catch(function (error) {
                alert('Hubo un error al enviar el formulario. Verifica tus IDs de EmailJS.');
                console.log('Error:', error);
            });
        });

        const modal = document.getElementById('modal');
        const closeBtn = document.querySelector('.close');
        if (modal && closeBtn) {
            closeBtn.addEventListener('click', function () {
                modal.style.display = 'none';
            });
        }
    }


    // =================================================================
    // CARRUSEL DE CLIENTES (Eliminado)
    // =================================================================

});