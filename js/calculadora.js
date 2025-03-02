// Constantes globales
const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    establecerFechaActual();
    mostrarZonaHorariaYActualizacion();
    configurarEnter();
});

function establecerFechaActual() {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    document.getElementById('fechaInicial').value = `${año}-${mes}-${dia}`;
}

function mostrarZonaHorariaYActualizacion() {
    document.getElementById('zonaHoraria').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('ultimaActualizacion').textContent = new Date().toLocaleString('es-ES');
}

function configurarEnter() {
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita el comportamiento predeterminado del formulario
            calcularFecha();
        }
    });
}

function calcularFecha() {
    const fechaInicialSeleccionada = document.getElementById('fechaInicial').value;
    const cantidadDiasIngresada = document.getElementById('numeroDias').value;

    if (!validarEntradas(fechaInicialSeleccionada, cantidadDiasIngresada)) {
        return;
    }

    const fechaInicial = parsearFecha(fechaInicialSeleccionada);
    const dias = parseInt(cantidadDiasIngresada);
    const fechaResultado = calcularNuevaFecha(fechaInicial, dias);

    mostrarResultados(fechaInicial, dias, fechaResultado);
}

function validarEntradas(fechaInicial, numeroDias) {
    if (!fechaInicial || isNaN(numeroDias) || numeroDias.trim() === '') {
        alert('Por favor, ingrese una fecha inicial válida y un número de días.');
        return false;
    }
    return true;
}

function parsearFecha(fechaInput) {
    const [año, mes, dia] = fechaInput.split('-').map(Number);
    return new Date(año, mes - 1, dia); // Meses son base 0
}

function calcularNuevaFecha(fechaInicial, dias) {
    const nuevaFecha = new Date(fechaInicial);
    nuevaFecha.setDate(fechaInicial.getDate() + dias);
    return nuevaFecha;
}

function formatearFecha(fecha) {
    const formatearNumero = (num) => String(num).padStart(2, '0');
    const dia = formatearNumero(fecha.getDate());
    const mes = formatearNumero(fecha.getMonth() + 1);
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
}

function formatearFechaLarga(fecha) {
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    return `${diaSemana}, ${dia} de ${mes} del ${año}`;
}

function mostrarResultados(fechaInicial, dias, fechaResultado) {
    document.getElementById('fechaInicialResultado').textContent = formatearFecha(fechaInicial);
    document.getElementById('diasAgregados').textContent = dias;
    document.getElementById('fechaResultadoNumerico').textContent = formatearFecha(fechaResultado);
    document.getElementById('fechaResultadoTexto').textContent = formatearFechaLarga(fechaResultado);
    document.getElementById('resultados').style.display = 'block';
}

function limpiarCampos() {
    document.getElementById('fechaInicial').value = '';
    document.getElementById('numeroDias').value = '';
    document.getElementById('resultados').style.display = 'none';
}