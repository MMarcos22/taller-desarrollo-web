# Registro de participantes para un taller de Desarrollo Web

**Autor:** Jan Carlos René Marcos Marín · Carné 1390-22-21431
Universidad Mariano Gálvez de Guatemala · Repaso interactivo de Desarrollo Web

## Objetivo
Aplicación web que permite inscribir participantes a un taller. El formulario (HTML + CSS) captura nombre completo, correo, teléfono, taller y horario; JavaScript envía los datos con `fetch` en formato JSON a una API hecha con Node.js y Express; el servidor valida la información y devuelve el registro creado, que aparece en la lista sin recargar la página.

## Tecnologías
- HTML5 (formulario accesible con `label`, `for`/`id`, `required` y tipos `email` y `tel`).
- CSS3 (Flexbox, Grid y media queries para teléfonos).
- JavaScript (DOM, eventos, `fetch`, `JSON.stringify`).
- Node.js 18+ y Express 5.

## Requisitos
- Node.js 18 o superior (LTS) y Visual Studio Code.
- Conexión a internet la primera vez para instalar Express.

## Instalación e inicio
1. Abre esta carpeta en VS Code con **File → Open Folder**.
2. Abre **Terminal → New Terminal**.
3. Ejecuta `npm install` (instala Express dentro de `node_modules/`).
4. Ejecuta `npm start`.
5. Abre `http://localhost:3000` en el navegador.
6. Para detener el servidor presiona `Ctrl + C` en la terminal.

### Si PowerShell bloquea npm.ps1
```powershell
npm.cmd install
npm.cmd start
```
También puedes cambiar el perfil de la terminal a **Command Prompt**.

## Rutas de la API
| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| GET | `/api/inscripciones` | Devuelve el arreglo de inscripciones en JSON (al inicio `[]`). | 200 |
| POST | `/api/inscripciones` | Recibe `{ nombre, correo, telefono, taller, horario }`, valida y crea la inscripción. | 201 creado · 400 datos inválidos |
| DELETE | `/api/inscripciones/:id` | (Extensión) Elimina la inscripción con ese id. | 200 eliminado · 404 no existe |

## Cómo probar
- **Navegador:** llena el formulario y presiona *Registrar inscripción*; el registro aparece en la lista.
- **GET:** abre `http://localhost:3000/api/inscripciones`.
- **POST desde la consola del navegador (F12):**
```js
fetch("/api/inscripciones", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nombre: "Ana López", correo: "ana@ejemplo.com", telefono: "5555-1234", taller: "JavaScript", horario: "Tarde" })
}).then(r => r.json()).then(console.log);
```
- **Casos de error:** dejar un campo vacío o enviar un correo como `ana@correo` devuelve estado 400 con un mensaje claro y no se guarda nada.

## Nota
Los registros se guardan en un arreglo en memoria: se borran al detener el servidor. Con una base de datos SQL se conservarían de forma permanente.
