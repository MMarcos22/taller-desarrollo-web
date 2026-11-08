# Bitácora de repaso de Desarrollo Web

**Estudiante:** Jan Carlos René Marcos Marín · Carné 1390-22-21431

Completa una ficha por tema con tus palabras. No copies párrafos de los sitios consultados.

## Flujo web (actividad 3)
- ¿Qué presenta los campos? El HTML del formulario (`index.html`), con el orden y apariencia que le da el CSS.
- ¿Qué evita que el navegador recargue la página? JavaScript, con `evento.preventDefault()` dentro del evento `submit`.
- ¿Qué componente recibe el JSON? El servidor Express, en la ruta `POST /api/inscripciones`, gracias a `express.json()`.
- ¿Qué parte puede guardar el registro? La base de datos; en este proyecto, un arreglo en memoria del servidor.
- ¿Por qué validar el correo también en el servidor? Porque la validación del navegador se puede saltar (desactivar JavaScript, editar el HTML o mandar la petición directo con otra herramienta). El servidor es la última defensa.

## HTML
- Resumen propio (2–3 frases): HTML es el lenguaje que da la estructura y el significado al contenido de una página. Con etiquetas indico qué es cada cosa: un encabezado, una sección, un formulario o un campo. El navegador lo interpreta y lo muestra.
- Dos términos clave y su explicación:
  - **Etiqueta semántica:** etiqueta que dice qué tipo de contenido tiene, como `<main>` (contenido principal) o `<header>` (presentación de la página o sección).
  - **Atributo:** dato extra dentro de la etiqueta de apertura que cambia su comportamiento, como `required` o `type="email"`.
- Ejemplo de código explicado:
  ```html
  <label for="telefono">Teléfono</label>
  <input id="telefono" name="telefono" type="tel" required>
  ```
  El `for` del label coincide con el `id` del input, así al hacer clic en el texto se activa el campo y los lectores de pantalla lo anuncian. `name` es la clave con la que se envía el valor, `type="tel"` muestra el teclado numérico en el celular y `required` no deja enviar el formulario vacío.
- ¿Qué hacen `name`, `type` y `required`? `name` identifica el dato al enviarlo; `type` dice qué clase de dato se espera (texto, correo, teléfono…); `required` lo vuelve obligatorio.
- ¿Cuándo usar `type="email"` y `type="tel"`? `email` cuando el dato debe tener formato de correo (el navegador revisa la @); `tel` para números de teléfono: no valida formato por sí solo, pero en el teléfono abre el teclado numérico.
- Diferencia entre elemento y atributo: el elemento es la pieza completa (`<input ...>`); el atributo es una propiedad dentro de ella (`type`, `id`).
- Pregunta que podría aparecer en el examen: ¿Qué conecta un `label` con su campo y por qué es importante para la accesibilidad?

## CSS
- Resumen propio (2–3 frases): CSS controla cómo se ve la página: colores, tamaños, espacios y la posición de los elementos. Funciona con reglas formadas por un selector y declaraciones de propiedad y valor. Con media queries la misma página se adapta a pantallas pequeñas.
- Dos términos clave y su explicación:
  - **Modelo de caja:** cada elemento es una caja con contenido, padding (espacio interno), borde y margin (espacio externo).
  - **Media query:** regla que solo se aplica cuando se cumple una condición, por ejemplo cuando el ancho es de 640 px o menos.
- Ejemplo de código explicado (regla propia):
  ```css
  .boton-quitar { min-height: 36px; padding: .4rem .8rem; background: #b42318; }
  ```
  Selecciona todos los elementos con `class="boton-quitar"` (el punto indica clase) y les da alto mínimo, espacio interno y fondo rojo.
- Padding vs. margin: al aumentar `padding` del `.panel` el borde se alejó del texto (el espacio creció por dentro); al agregar `margin` el panel se separó de los demás paneles (el espacio creció por fuera).
- Flexbox Froggy: usé `justify-content` (mueve los elementos en el eje principal, horizontal) y `align-items` (los mueve en el eje cruzado, vertical). También `flex-direction: row-reverse` invierte el orden.
- Propiedad de Flexbox en el proyecto: `justify-content: space-between` en cada `li` deja los datos a la izquierda y el botón Quitar a la derecha.
- Media query del proyecto: `@media (max-width: 640px)` cambia la tarjeta a `flex-direction: column`, así en el teléfono el botón baja debajo de los datos y ocupa todo el ancho.
- Pregunta que podría aparecer en el examen: ¿Cuál es la diferencia entre `padding` y `margin`, y entre un selector de clase (`.`) y uno de id (`#`)?

## JavaScript y DOM
- Resumen propio (2–3 frases): JavaScript le da comportamiento a la página: guarda datos en variables, toma decisiones y reacciona a lo que hace la persona. El DOM es la representación de la página como objetos que JavaScript puede buscar y modificar. Con eventos ejecuto funciones cuando alguien hace clic o envía un formulario.
- Dos términos clave y su explicación:
  - **`querySelector`:** busca en el DOM el primer elemento que coincide con un selector CSS, como `#formulario-registro`.
  - **`addEventListener`:** asocia una función a un evento (`submit`, `click`, `input`) para que se ejecute cuando ocurra.
- Ejemplo de código explicado:
  ```js
  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const valores = new FormData(formulario);
    console.log(valores.get("nombre"));
  });
  ```
  Cuando se envía el formulario, `preventDefault()` evita que el navegador recargue la página, `FormData` junta los valores de los campos por su `name` y luego leo el nombre.
- Reto de lectura (cupos): con `inscritos = 20`, `hayCupo()` devuelve `false` porque 20 no es menor que 20, así que `inscritos++` no se ejecuta.
- `const` vs. `let`: `const cuposMaximos = 20` porque el límite no cambia; `let inscritos = 0` porque el contador aumenta con cada inscripción.
- Práctica de arreglos: creé `const inscripciones = ["Ana", "Luis", "Marta"]` y una función `contar()` que devuelve `inscripciones.length` (3) y lo escribe en un párrafo.
- Pregunta que podría aparecer en el examen: ¿Para qué sirve `preventDefault()` en el evento `submit` de un formulario?

## Node.js, Express y API
- Resumen propio (2–3 frases): Node.js permite ejecutar JavaScript fuera del navegador, en el servidor. Express es una librería que facilita crear rutas que reciben solicitudes HTTP y devuelven respuestas, normalmente en JSON. Una API es el conjunto de esas rutas que el frontend usa para pedir o enviar información.
- Dos términos clave y su explicación:
  - **Ruta:** combinación de un método HTTP y una dirección (`POST /api/inscripciones`) asociada a una función que responde.
  - **Código de estado HTTP:** número que indica el resultado: 200 OK, 201 creado, 400 datos inválidos, 404 no encontrado.
- Diferencia entre Node.js, npm y VS Code: Node.js ejecuta el código; npm descarga e instala librerías (como Express); VS Code es solo el editor donde escribo.
- ¿Por qué `node_modules` aparece al instalar y no se sube? `npm install` lo crea con todas las dependencias descargadas; pesa mucho y se puede regenerar con `package.json`, por eso está en `.gitignore`.
- `JSON.stringify()` vs. `response.json()`: el primero convierte un objeto de JS en texto JSON para enviarlo; el segundo lee el texto JSON de la respuesta y lo convierte otra vez en objeto. El estado 201 indica que se creó un recurso nuevo.
- Ejemplo de ruta o solicitud explicado:
  - GET: `app.get("/api/inscripciones", (req, res) => res.json(inscripciones));` devuelve la lista (200).
  - POST: `app.post("/api/inscripciones", ...)` lee `req.body`, valida los cinco campos y el correo; si algo falla responde `400` con un mensaje, si todo está bien guarda y responde `201` con el registro.
  - Al abrir `localhost:3000/api/inscripciones` al inicio apareció `[]`.
- Pregunta que podría aparecer en el examen: ¿Qué hace `express.json()` y qué pasaría con `req.body` si no se usara?

## SQL
- Resumen propio (2–3 frases): SQL es el lenguaje para trabajar con bases de datos relacionales, donde la información vive en tablas de filas y columnas. Con él se crean tablas y se agregan, consultan, modifican o eliminan registros.
- Explica SELECT, INSERT, UPDATE y DELETE: `SELECT` consulta filas; `INSERT` agrega una fila nueva; `UPDATE` cambia valores de filas existentes (con `WHERE` para elegir cuáles); `DELETE` borra filas (también con `WHERE`).
- DDL y DML: DDL define la estructura (`CREATE TABLE talleres (...)`); DML manipula los datos (`INSERT INTO talleres ...`). En la práctica, después del `DELETE ... WHERE id = 1` la fila del taller "Desarrollo Web" desapareció y el `SELECT` quedó vacío.
- ¿Qué son una clave primaria y una clave foránea? La clave primaria (PK) identifica cada fila de forma única, como `talleres.id`. La clave foránea (FK) guarda el id de una fila de otra tabla para relacionarlas, como `inscripciones.taller_id`.
- Pregunta que podría aparecer en el examen: ¿Qué pasa si ejecuto `DELETE FROM talleres;` sin `WHERE`?

## Git y GitHub
- Resumen propio (2–3 frases): Git es un sistema de control de versiones que guarda el historial de cambios de un proyecto en mi computadora. Cada commit es una "foto" del proyecto con un mensaje. GitHub es un sitio donde se suben esos repositorios para compartirlos y respaldarlos.
- Explica add, commit y push: `git add` pasa los cambios al área de preparación (stage); `git commit -m "..."` guarda esa versión en el historial local; `git push` envía los commits locales al repositorio remoto en GitHub.
- Un buen mensaje de commit dice qué cambió y para qué, en pocas palabras, por ejemplo "Completa formulario y estilos".
- Diferencia entre Git y GitHub: Git es la herramienta que registra versiones; GitHub es el servicio en línea que aloja los repositorios.
- Pregunta que podría aparecer en el examen: ¿Por qué un commit no aparece en GitHub hasta que haces `git push`?
