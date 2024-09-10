// script.js
document.addEventListener('DOMContentLoaded', () => {
    const botonGuardarHora = document.getElementById('guardarHoraBtn');
    const horaGuardada = document.getElementById('horaGuardada');
    const listaHoras = document.getElementById('listaHoras');
    const botonVerRegistros = document.getElementById('verRegistrosBtn');

    // Función para mostrar todas las horas guardadas
    function mostrarHorasGuardadas() {
        // Obtiene las horas guardadas desde el localStorage
        const horas = JSON.parse(localStorage.getItem('horasGuardadas')) || [];

        // Limpia la lista antes de agregar las horas
        listaHoras.innerHTML = '';

        // Muestra cada hora en la lista
        horas.forEach(hora => {
            const li = document.createElement('li');
            li.textContent = hora;
            listaHoras.appendChild(li);
        });
    }

    // Muestra las horas guardadas al cargar la página
    mostrarHorasGuardadas();

    // Añade un listener para el evento 'click' en el botón de guardar hora
    botonGuardarHora.addEventListener('click', () => {
        // Obtiene la hora actual
        const ahora = new Date();
        const horaFormateada = ahora.toLocaleTimeString();

        // Recupera las horas guardadas desde el localStorage
        const horas = JSON.parse(localStorage.getItem('horasGuardadas')) || [];

        // Si hay menos de 30 horas, añade la nueva hora
        if (horas.length < 30) {
            horas.push(horaFormateada);
            localStorage.setItem('horasGuardadas', JSON.stringify(horas));
            horaGuardada.textContent = `Hora guardada: ${horaFormateada}`;
            mostrarHorasGuardadas();
        } else {
            horaGuardada.textContent = 'El límite de 30 horas se ha alcanzado.';
        }
    });

    // Añade un listener para el evento 'click' en el botón de ver registros
    botonVerRegistros.addEventListener('click', () => {
        // Recupera las horas guardadas desde el localStorage
        const horas = JSON.parse(localStorage.getItem('horasGuardadas')) || [];

        // Crea un archivo JSON para descargar
        const blob = new Blob([JSON.stringify(horas, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'horas_guardadas.json';
        a.click();
        URL.revokeObjectURL(url);
    });
});
