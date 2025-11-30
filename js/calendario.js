// calendario.js

// Inserta en body el calendario del año actual.
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    renderYear('miCalendario', year);
});

// Función para pintar un año.
// Uso: renderYear(target, year)
//   target: selector CSS o elemento DOM donde insertar el calendario
//   year: número (ej. 2025)

async function renderYear(target, year) {
    // Cargar días no lectivos y festivos
    let [nolectivos, festivos] = await diasEspeciales(year);

    // Calendario anual
    const id = '#' + target;
    document.querySelector(id) && document.querySelector(id).remove()

    const div = document.createElement('div');
    div.id = target;
    div.className = 'calendario-anual';
    document.body.appendChild(div);
    for (let month = 1; month <= 12; month++) {
        renderMonth(target, year, month, nolectivos, festivos, 'renderYear', 1, 12, month % 4 === 0);
    }
}
