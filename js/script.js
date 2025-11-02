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
    // La lógica del 'theme-switch' se ha eliminado.


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
    // CARRUSEL DE CLIENTES (Página: galeria-imagenes.html)
    // =================================================================
    const carrusel = document.getElementById('carrusel');

    if (carrusel) {
        // Contenido actualizado con los clientes del PDF
        // RECUERDA: Debes agregar estas imágenes a tu carpeta 'img/clientes/'
        const imagenes = [
          {
            "url": "img/clientes/mr-hydelml.jpg",
            "nombre": "mr.hydelml",
            "descripcion": "Cliente de PulsArt Media"
          },
          {
            "url": "img/clientes/gobekli-tepepy.jpg",
            "nombre": "Gobekli.tepepy",
            "descripcion": "Cliente de PulsArt Media"
          },
          {
            "url": "img/clientes/karmapy.jpg",
            "nombre": "Karmapy",
            "descripcion": "Cliente de PulsArt Media"
          },
          {
            "url": "img/clientes/decibelespy.jpg",
            "nombre": "Decibelespy",
            "descripcion": "Cliente de PulsArt Media"
          },
          {
            "url": "img/clientes/livio-sanchez.jpg",
            "nombre": "Livio Sanchez",
            "descripcion": "Cliente de PulsArt Media"
          },
          {
            "url": "img/clientes/doc-ayala.jpg",
            "nombre": "Doc.Ayala",
            "descripcion": "Cliente de PulsArt Media"
          }
        ];

        const atras = document.getElementById('atras');
        const adelante = document.getElementById('adelante');
        const imagen = document.getElementById('img');
        const puntos = document.getElementById('puntos');
        const texto = document.getElementById('texto');
        let actual = 0;

        const mostrarImagenActual = () => {
            if (imagen && texto && puntos) {
                imagen.innerHTML = `<img class="img animate__animated animate__fadeIn" src="${imagenes[actual].url}" alt="${imagenes[actual].nombre}" loading="lazy">`;
                texto.innerHTML = `<h3 class="animate__animated animate__fadeIn">${imagenes[actual].nombre}</h3><p class="animate__animated animate__fadeIn">${imagenes[actual].descripcion}</p>`;
                
                puntos.innerHTML = "";
                for (let i = 0; i < imagenes.length; i++) {
                    puntos.innerHTML += `<p class="${i === actual ? 'bold' : ''}">.<p>`;
                }
            }
        }

        if (adelante) {
            adelante.addEventListener('click', () => {
                actual = (actual + 1) % imagenes.length;
                mostrarImagenActual();
            });
        }

        if (atras) {
            atras.addEventListener('click', () => {
                actual = (actual - 1 + imagenes.length) % imagenes.length;
                mostrarImagenActual();
            });
        }
        
        mostrarImagenActual();
    }
});