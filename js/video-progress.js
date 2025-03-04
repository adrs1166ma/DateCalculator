document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("videoTrackingForm");
    const videoInicialInput = document.getElementById("video-inicial");
    const videoFinalInput = document.getElementById("video-final");
    const duracionInput = document.getElementById("duracion");
    const formatoHhmmss = document.getElementById("formato-hhmmss");
    const formatoMinutos = document.getElementById("formato-minutos");
    const tiempoHhmmss = document.getElementById("tiempo-hhmmss");
    const tiempoMinutos = document.getElementById("tiempo-minutos");

    // Función para alternar entre formatos de tiempo
    function toggleFormato() {
        if (formatoHhmmss.checked) {
            tiempoHhmmss.classList.remove("hidden");
            tiempoMinutos.classList.add("hidden");
            tiempoHhmmss.required = true;
            tiempoMinutos.required = false;
        } else {
            tiempoHhmmss.classList.add("hidden");
            tiempoMinutos.classList.remove("hidden");
            tiempoHhmmss.required = false;
            tiempoMinutos.required = true;
        }
    }

    // Agregar listeners para alternar el formato
    formatoHhmmss.addEventListener("change", toggleFormato);
    formatoMinutos.addEventListener("change", toggleFormato);

    // Validar formato hh:mm:ss
    tiempoHhmmss.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
        if (value.length > 6) value = value.slice(0, 6); // Limitar a 6 dígitos
        if (value.length >= 2) value = value.slice(0, 2) + ":" + value.slice(2);
        if (value.length >= 5) value = value.slice(0, 5) + ":" + value.slice(5);
        e.target.value = value;
    });

    // Manejador del evento 'submit'
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evitar recarga de la página

        // Obtener valores de los campos
        const videoInicial = parseInt(videoInicialInput.value.trim());
        const videoFinal = parseInt(videoFinalInput.value.trim());
        const duracion = parseFloat(duracionInput.value.trim());
        const tiempoReal = formatoHhmmss.checked
            ? convertirHHMMSSAMinutos(tiempoHhmmss.value.trim())
            : parseFloat(tiempoMinutos.value.trim());

        // Validar campos
        const errors = {};
        if (!videoInicial || isNaN(videoInicial) || videoInicial <= 0) {
            errors.videoInicial = "El video inicial debe ser un número válido mayor que 0.";
        }
        if (!videoFinal || isNaN(videoFinal) || videoFinal <= 0 || videoFinal < videoInicial) {
            errors.videoFinal = "El video final debe ser un número válido mayor o igual al video inicial.";
        }
        if (!duracion || isNaN(duracion) || duracion <= 0) {
            errors.duracion = "La duración del video debe ser un número válido mayor que 0.";
        }
        if (!tiempoReal || isNaN(tiempoReal) || tiempoReal <= 0) {
            errors.tiempoReal = "El tiempo real invertido debe ser un valor válido mayor que 0.";
        }

        // Mostrar errores visualmente
        mostrarErrores(errors);

        // Si no hay errores, procesar los datos
        if (Object.keys(errors).length === 0) {
            const registro = {
                rangoVideos: { inicio: videoInicial, fin: videoFinal },
                duracionVideo: duracion,
                tiempoRealInvertido: Math.floor(tiempoReal), // Truncar al minuto más cercano
            };

            // Imprimir datos en la consola
            console.log("Registro de Videos Vistos:", registro);

            // Feedback al usuario
            alert("Datos guardados correctamente. Revisa la consola para ver los detalles.");
        }
    });

    // Función para convertir hh:mm:ss a minutos
    function convertirHHMMSSAMinutos(hhmmss) {
        const partes = hhmmss.split(":").map(Number);
        if (partes.length !== 3 || partes.some(isNaN)) return null; // Formato inválido
        const [horas, minutos, segundos] = partes;
        return horas * 60 + minutos + Math.floor(segundos / 60); // Truncar segundos
    }

    // Función para mostrar errores visualmente
    function mostrarErrores(errors) {
        // Limpiar errores anteriores
        document.querySelectorAll(".error-message").forEach((el) => el.remove());

        // Mostrar nuevos errores
        Object.entries(errors).forEach(([campo, mensaje]) => {
            const input = document.getElementById(campo);
            if (input) {
                const errorDiv = document.createElement("p");
                errorDiv.className = "mt-1 text-sm text-red-600 error-message";
                errorDiv.textContent = mensaje;
                input.closest("div").appendChild(errorDiv);
            }
        });
    }

    // Limpiar el formulario para una nueva nota
    document.getElementById("nueva-nota-btn").addEventListener("click", () => {
        form.reset();
        toggleFormato(); // Asegurarse de que el formato predeterminado esté activo
    });

    // // Test para el formato hh:mm:ss
    // function testConvertirHHMMSSAMinutos() {
    //     const tests = [
    //         { input: "01:10:30", expected: 70 }, // 1 hora, 10 minutos, 30 segundos -> 70 minutos
    //         { input: "00:05:45", expected: 5 },  // 5 minutos, 45 segundos -> 5 minutos
    //         { input: "02:00:00", expected: 120 },// 2 horas -> 120 minutos
    //         { input: "invalid", expected: null },// Formato inválido -> null
    //     ];

    //     tests.forEach(({ input, expected }, index) => {
    //         const result = convertirHHMMSSAMinutos(input);
    //         console.log(
    //             `Test ${index + 1}: Input = "${input}", Result = ${result}, Expected = ${expected}, ${
    //                 result === expected ? "PASS" : "FAIL"
    //             }`
    //         );
    //     });
    // }

    // // Ejecutar el test al cargar la página
    // testConvertirHHMMSSAMinutos();
});