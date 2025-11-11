const plansData = {
    semilla: {
        name: '🌱 Plan Semilla',
        idealFor: 'Artistas emergentes o en etapa de exploración.',
        prices: { founder: 350000, regular: 450000 },
        saving: 600000,
        planKey: 'semilla',
        features: [
            '1 asesoría de 1 hora para orientación de proyecto (semestral)',
            '1 sesión fotográfica de estudio (50 fotos)',
            '1 hora de uso de estudio o salón multitasking',
            '10% de descuento en eventos y servicios seleccionados'
        ]
    },
    brote: {
        name: '🌿 Plan Brote',
        idealFor: 'Artistas en desarrollo que quieren avanzar con apoyo técnico y creativo.',
        prices: { founder: 550000, regular: 650000 },
        saving: 1050000,
        planKey: 'brote',
        features: [
            '1 asesoría integral semestral de 2 horas',
            'Registro de hasta 1 expediente al mes (hasta 10 obras)',
            '2 horas de uso de sala taller o estudio',
            '1 asesoría básica sobre redes sociales o identidad visual',
            '15% de descuento en servicios y eventos seleccionados'
        ]
    },
    // ===== EMOJI ACTUALIZADO AQUÍ =====
    raiz: {
        name: '🪴 Plan Raíz',
        idealFor: 'Artistas activos que buscan consolidar su presencia.',
        prices: { founder: 950000, regular: 1100000 },
        saving: 2550000,
        planKey: 'raiz',
        features: [
            'Asesoría integral semestral + seguimiento creativo',
            'Registro de hasta 2 expedientes al mes (hasta 20 obras)',
            '1 sesión fotográfica de estudio (80 fotos) y video promocional',
            '3 horas de uso de sala taller o estudio',
            'Asesoría sobre redes y estrategia digital + seguimiento',
            'Acceso preferencial sin costo a encuentros de miembros'
        ]
    },
    // ===== EMOJI ACTUALIZADO AQUÍ =====
    bosque: {
        name: '🌳 Plan Bosque',
        idealFor: 'Artistas profesionales, colectivos o proyectos con actividad constante.',
        prices: { founder: 1500000, regular: 1850000 },
        saving: 7100000,
        planKey: 'bosque',
        features: [
            'Asesoría integral trimestral + Acompañamiento mensual',
            'Registro de hasta 4 expedientes de obras mensuales',
            '4 horas de uso de sala taller o estudio',
            '1 sesión audiovisual completa (foto o video de campaña)',
            'Representación en eventos/booking (según condiciones)',
            'Diseño de pieza gráfica mensual para redes',
            '20% de descuento en servicios y participación prioritaria'
        ]
    }
};

let myChart;
let currentPriceType = 'founder';

const formatCurrency = (value) => new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG', maximumFractionDigits: 0 }).format(value);

const renderChart = (priceType) => {
    const ctx = document.getElementById('plansChart').getContext('2d');
    const labels = Object.values(plansData).map(p => p.name.split(' ')[1]);
    const investmentData = Object.values(plansData).map(p => p.prices[priceType]);
    const savingsData = Object.values(plansData).map(p => p.saving);

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Inversión Mensual',
                    data: investmentData,
                    backgroundColor: '#FF6600', 
                    borderColor: '#e65c00', 
                    borderWidth: 1
                },
                {
                    label: 'Ahorro Estimado',
                    data: savingsData,
                    backgroundColor: '#333333', 
                    borderColor: '#000000', 
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        // ===== FORMATO DE GRÁFICO ACTUALIZADO AQUÍ =====
                        callback: function(value, index, values) {
                            // Formatea el número con separadores de miles para Paraguay
                            return new Intl.NumberFormat('es-PY').format(value);
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                // Usa la función formatCurrency que ya incluye "Gs." o "PYG"
                                label += formatCurrency(context.parsed.y);
                            }
                            return label;
                        }
                    }
                },
                legend: {
                    position: 'top',
                }
            }
        }
    });
};

const renderPlanDetails = (planKey) => {
    const plan = plansData[planKey];
    const contentEl = document.getElementById('details-content');
    
    let audioButtonHtml = ''; 

    contentEl.innerHTML = `
        <div class="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200 transition-opacity duration-300">
            <h3 class="text-2xl font-bold text-brand-primary">${plan.name}</h3>
            <p class="text-gray-600 mb-4 italic">${plan.idealFor}</p>
            <div class="mb-6 text-center">
                <p class="text-gray-500 text-sm">Precio Fundador</p>
                <p class="text-4xl font-bold text-gray-800">${formatCurrency(plan.prices.founder)}<span class="text-lg font-normal text-gray-500">/mes</span></p>
                <p class="text-sm text-gray-500">Precio Regular: ${formatCurrency(plan.prices.regular)}</p>
            </div>
            <ul class="space-y-3">
                ${plan.features.map(feature => `
                    <li class="flex items-start">
                        <span class="text-green-500 mr-2 mt-1">✓</span>
                        <span>${feature}</span>
                    </li>
                `).join('')}
            </ul>
             <div class="mt-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-r-lg">
                <p class="font-bold">Ahorras en este plan aprox. ${formatCurrency(plan.saving)}</p>
            </div>
            ${audioButtonHtml}
        </div>
    `;
    
};

document.addEventListener('DOMContentLoaded', () => {
    renderChart(currentPriceType);
    renderPlanDetails('semilla');

    const founderBtn = document.getElementById('founderPriceBtn');
    const regularBtn = document.getElementById('regularPriceBtn');
    const planTabs = document.querySelectorAll('.plan-tab');
    const form = document.getElementById('pre-registration-form');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error'); 
    
    const spotsLeftEl = document.getElementById('spots-left');
    let spots = 20;
    const interval = setInterval(() => {
        if (spots > 14) {
            spots--;
            spotsLeftEl.textContent = spots;
        } else {
            clearInterval(interval);
        }
    }, 3000);

    founderBtn.addEventListener('click', () => {
        currentPriceType = 'founder';
        renderChart(currentPriceType);
        founderBtn.classList.add('bg-brand-primary', 'text-white');
        founderBtn.classList.remove('text-gray-600');
        regularBtn.classList.remove('bg-brand-primary', 'text-white');
        regularBtn.classList.add('text-gray-600');
    });

    regularBtn.addEventListener('click', () => {
        currentPriceType = 'regular';
        renderChart(currentPriceType);
        regularBtn.classList.add('bg-brand-primary', 'text-white');
        regularBtn.classList.remove('text-gray-600');
        founderBtn.classList.remove('bg-brand-primary', 'text-white');
        founderBtn.classList.add('text-gray-600');
    });
    
    planTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            planTabs.forEach(t => t.classList.remove('tab-active'));
            tab.classList.add('tab-active');
            const planKey = tab.getAttribute('data-plan');
            renderPlanDetails(planKey);
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');
            } else {
                errorMessage.classList.remove('hidden');
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            errorMessage.classList.remove('hidden');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
});