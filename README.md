# Documentación breve: curso.html y calendario.html

## Resumen
Archivo README para describir el propósito, estructura y uso de los archivos `curso.html` y `calendario.html` presentes en este proyecto.

---

## Ubicación
- Ruta base del proyecto: `/calendario/`
- Archivos documentados:
    - `curso.html`
    - `calendario.html`

---

## curso.html
Propósito:
- Mostrar el calendario escolar de un curso concreto (p.ej. 2025-26).

---

## calendario.html
Propósito:
- Mostrar el calendario de un año concreto (p.ej. 2025).

---

## Dependencias y recursos
- En el directorio `data` se encuentran los ficheros que indican días festivos o días no lectivos de un año concreto.
- El nombre de cada fichero es `calendario9999.txt` siendo 9999 el año correspondiente.
- Dentro del fichero se indicarán las fechas línea a línea siguiendo la estructura: dd,mm,[festivo|nolectivo],descripción (p.ej. 1,1,festivo,año nuevo)

---

## Cómo probar localmente
1. Levantar servidor local (XAMPP) y colocar el proyecto `calendario` en la raíz del servidor.
2. Abrir:
     - http://localhost/calendario/curso.html
     - http://localhost/calendario/calendario.html

---

## Notas
- Se calculan automáticamente los días no lectivos correspondientes a navidades y semana santa
