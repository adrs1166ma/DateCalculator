// Obtener elementos del DOM
const form = document.getElementById('courseConfigForm');
const totalVideosInput = document.getElementById('totalVideos');
const totalDurationInput = document.getElementById('totalDuration');
const errorTotalVideos = document.getElementById('errorTotalVideos');
const errorTotalDuration = document.getElementById('errorTotalDuration');

// Función de validación genérica
function validateField(value, fieldName) {
    if (!value || isNaN(value) || parseFloat(value) <= 0) {
        return `El campo "${fieldName}" debe ser un número válido mayor que 0.`;
    }
    return null; // No hay errores
}

// Función para mostrar/ocultar errores
function toggleError(element, message) {
    if (message) {
        element.textContent = message;
        element.classList.remove('hidden');
    } else {
        element.textContent = '';
        element.classList.add('hidden');
    }
}

// Manejador del evento 'submit'
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar recarga de la página

    // Validar campos
    const totalVideos = totalVideosInput.value.trim();
    const totalDuration = totalDurationInput.value.trim();

    const errors = {
        totalVideos: validateField(totalVideos, 'Total de Videos'),
        totalDuration: validateField(totalDuration, 'Duración Total')
    };

    // Mostrar errores si existen
    toggleError(errorTotalVideos, errors.totalVideos);
    toggleError(errorTotalDuration, errors.totalDuration);

    // Si no hay errores, procesar los datos
    if (!errors.totalVideos && !errors.totalDuration) {
        const courseData = {
            totalVideos: parseInt(totalVideos),
            totalDuration: parseFloat(totalDuration)
        };

        // Imprimir datos en la consola
        console.log('Datos del Curso:', courseData);

        // Opcional: Guardar en localStorage
        localStorage.setItem('courseConfig', JSON.stringify(courseData));

        // Feedback al usuario
        alert('Configuración guardada correctamente. Revisa la consola para ver los datos.');
    }
});

// Cargar datos previamente guardados (opcional)
window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('courseConfig');
    if (savedData) {
        const { totalVideos, totalDuration } = JSON.parse(savedData);
        totalVideosInput.value = totalVideos;
        totalDurationInput.value = totalDuration;
    }
});