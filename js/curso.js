// curso.js

// Inserta en body el calendario del año actual.
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const year = today.getFullYear();
    renderCourse('miCalendario', today.getMonth() < 7 ? year - 1 : year);
});

// Función para pintar un curso escolar.
// Uso: renderYear(target, year)
//   target: selector CSS o elemento DOM donde insertar el calendario
//   year: número (ej. 2025 para curso 2025-2026)

async function renderCourse(target, year) {
    // Cargar días no lectivos y festivos
    let [nolectivosYear, festivosYear] = await diasEspeciales(year);
    let [nolectivosNext, festivosNext] = await diasEspeciales(year + 1);

    // Calendario del curso escolar (septiembre a junio)
    const id = '#' + target;
    document.querySelector(id) && document.querySelector(id).remove()

    const div = document.createElement('div');
    div.id = target;
    div.className = 'calendario-anual';
    document.body.appendChild(div);
    for (let month = 9; month <= 12; month++) {
        renderMonth(target, year, month, nolectivosYear, festivosYear, 'renderCourse', 9, 6, month === 12);
    }
    for (let month = 1; month <= 6; month++) {
        renderMonth(target, year + 1, month, nolectivosNext, festivosNext, 'renderCourse', 9, 6, month === 4);
    }
}
