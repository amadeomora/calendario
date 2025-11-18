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
    pascuaNoLectivos(year).forEach(element => nolectivos.add(element));
    navidadNoLectivos(year).forEach(element => nolectivos.add(element));

    // Calendario anual
    const id = '#' + target;
    document.querySelector(id) && document.querySelector(id).remove()

    const div = document.createElement('div');
    div.id = target;
    div.className = 'calendario-anual';
    document.body.appendChild(div);
    for (let month = 1; month <= 12; month++) {
        renderMonth(target, year, month, nolectivos, festivos);
        if (month % 4 === 0) {
            const br = document.createElement('br');
            document.querySelector('#'+target).appendChild(br);
        }
    }
}

// Función para pintar un mes.
// Uso: renderMonth(target, year, month)
//   target: selector CSS o elemento DOM donde insertar el calendario
//   year: número (ej. 2025)
//   month: 1-12 (enero=1, diciembre=12)

function renderMonth(target, year, month, nolectivos, festivos) {
    const monthNames = [
        'Enero','Febrero','Marzo','Abril','Mayo','Junio',
        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
    ];
    //const dayNames = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
    const dayNames = ['L','M','Mi','J','V','S','D'];

    const table = document.createElement('table');
    table.className = 'calendario';
    const thead = document.createElement('thead');
    // encabezado con nombre del mes y año
    const trCaption = document.createElement('tr');
    const thCaption = document.createElement('th');
    thCaption.className = 'calendario-caption';
    thCaption.colSpan = 7;
    thCaption.textContent = `${monthNames[month - 1]} ${year}`;
    if (month === 1) {
        // enlace al año anterior
        const onclick = `renderYear('${target}', ${year-1}); return false;`;
        thCaption.innerHTML = `<a href="#" onclick="${onclick}">&#9664;</a> ` + thCaption.innerHTML;
    }
    if (month === 12) {
        // enlace al año siguiente
        const onclick = `renderYear('${target}', ${year+1}); return false;`;
        thCaption.innerHTML += ` <a href="#" onclick="${onclick}">&#9654;</a>`;
    }
    trCaption.appendChild(thCaption);
    thead.appendChild(trCaption);
    // fila con nombres de los días
    const trHead = document.createElement('tr');
    dayNames.forEach(d => {
        const th = document.createElement('th');
        th.textContent = d;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    // cálculo de días
    const firstDate = new Date(year, month - 1, 1);
    const firstDay = firstDate.getDay(); // 0=Dom,1=Lun,...6=Sáb
    const leadingEmpty = (firstDay + 6) % 7; // convierte para que 0=Lun
    const daysInMonth = new Date(year, month, 0).getDate();

    let day = 1;
    const today = new Date();

    // generar filas de semanas
    while (day <= daysInMonth) {
        const tr = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            const td = document.createElement('td');
            if (day === 1 && i < leadingEmpty) {
                // primeras celdas vacías
                td.className = 'empty';
                td.textContent = '';
            } else if (day > daysInMonth) {
                // celdas vacías al final
                td.className = 'empty';
                td.textContent = '';
            } else {
                td.textContent = String(day);
                const hoy = new Date(year, month - 1, day);
                // resaltar hoy si corresponde
                if (hoy.toDateString() === today.toDateString()) {
                    td.classList.add('today');
                }
                // día no lectivo
                if (nolectivos.has(hoy.toDateString())) {
                    td.classList.add('nolectivo');
                }
                // día festivo
                if (festivos.has(hoy.toDateString())) {
                    td.classList.add('festivo');
                }
                // domingo
                if (i === 6) {
                    td.classList.add('domingo');
                }
                day++;
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    
    document.querySelector('#' + target).appendChild(table);
}

// Cálculo de la fecha de Pascua
// Entrada: year (número, ej. 2025)
// Salida: Date
// Ejemplo de uso: let fechaPascua = pascua(2025);

function pascua(year) {
    let day, month;
	const vm = 24;
	const vn = 5;
	const va = year % 19;
	const vb = year % 4;
	const vc = year % 7;
	const vd = (19 * va + vm) % 30;
	const ve = (2 * vb + 4 * vc + 6 * vd + vn) % 7;
	if (vd + ve < 10) {
		day = vd + ve + 22;
		month = 3; //marzo
	} else {
		day = vd + ve - 9;
		month = 4; //abril
	}
	// Casos especiales
	if (day == 26 && month == 4) day = 19;
	if (day == 25 && month == 4 && vd == 28 && ve == 6 && va > 10) day = 18;
	//
	return new Date(year, month - 1, day)
}

// Generar días no lectivos alrededor de Pascua (Semana Santa escolar)
// Entrada: year (número, ej. 2025)
// Salida: Set de fechas (Date) no lectivas

function pascuaNoLectivos(year) {    
    const holidays = new Set();

    let fecha = new Date(pascua(year));
    fecha.setDate(fecha.getDate() - 9)
    for (i = 0; i < 11; i++) {
        holidays.add(fecha.toDateString());
        fecha.setDate(fecha.getDate() + 1);
    }
    
    return holidays;
}

// Generar días no lectivos en Navidad (24/12 al 6/1)
// Entrada: year (número, ej. 2025)
// Salida: Set de fechas (Date) no lectivas 

function navidadNoLectivos(year) {
    const holidays = new Set();

    let fecha = new Date(year, 11, 24); // 24 diciembre
    for (i = 0; i < 8; i++) {
        holidays.add(fecha.toDateString());
        fecha.setDate(fecha.getDate() + 1);
    }

    fecha = new Date(year, 0, 1); // 1 enero
    for (i = 0; i < 7; i++) {
        holidays.add(fecha.toDateString());
        fecha.setDate(fecha.getDate() + 1);
    }   

    return holidays;  
}

// Lee un archivo de texto externo y devuelve su contenido como texto
// Uso: let data = await fetchFile(url)

async function fetchFile(url) {
    const response = await fetch(url)
    //if (!response.ok) console.log(response)
    return await response.text()
}

// Carga los días no lectivos y festivos desde un archivo de texto externo
// Uso: let [nolectivos, festivos] = await loadDiasEspeciales(year)

async function diasEspeciales(year) {
    const data = await fetchFile('./data/calendario' + year + '.txt')
    const nolectivos = new Set()
    const festivos = new Set()

    if (!data) return

    const lines = data.split('\n')
    for (const line of lines) {
        const [day, month, type] = line.split(',').map(s => s.trim())
        if (day && month && type) {
            const date = new Date(year, parseInt(month) - 1, parseInt(day))
            if (type === 'nolectivo') {
                nolectivos.add(date.toDateString())
            } else if (type === 'festivo') {
                festivos.add(date.toDateString())
            }
        }
    }

    return [ nolectivos, festivos ]
}