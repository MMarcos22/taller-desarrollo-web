const formulario = document.querySelector("#formulario-registro");
const lista = document.querySelector("#lista-inscripciones");
const mensaje = document.querySelector("#mensaje");

// Muestra un aviso debajo del formulario (verde si todo salió bien, rojo si hubo error).
function mostrarMensaje(texto, esError = false) {
  mensaje.textContent = texto;
  mensaje.classList.toggle("error", esError);
}

// Dibuja la lista de participantes usando textContent (nunca innerHTML con datos del usuario).
function dibujarLista(inscripciones) {
  lista.innerHTML = "";

  if (inscripciones.length === 0) {
    const vacio = document.createElement("li");
    vacio.className = "vacio";
    vacio.textContent = "Aún no hay inscripciones.";
    lista.appendChild(vacio);
    return;
  }

  inscripciones.forEach((registro) => {
    const item = document.createElement("li");

    const datos = document.createElement("div");
    datos.className = "datos-inscripcion";

    const nombre = document.createElement("strong");
    nombre.textContent = registro.nombre;

    const detalle = document.createElement("span");
    detalle.textContent = `${registro.taller} · ${registro.horario}`;

    const contacto = document.createElement("span");
    contacto.textContent = `${registro.correo} · ${registro.telefono}`;

    datos.append(nombre, detalle, contacto);

    // Extensión: botón para quitar la inscripción (DELETE /api/inscripciones/:id)
    const quitar = document.createElement("button");
    quitar.type = "button";
    quitar.className = "boton-quitar";
    quitar.textContent = "Quitar";
    quitar.addEventListener("click", () => eliminarInscripcion(registro.id));

    item.append(datos, quitar);
    lista.appendChild(item);
  });
}

async function cargarInscripciones() {
  // Solicita GET /api/inscripciones con fetch().
  try {
    const respuesta = await fetch("/api/inscripciones");
    const inscripciones = await respuesta.json();
    // Limpia la lista y dibuja cada registro recibido.
    dibujarLista(inscripciones);
  } catch (error) {
    mostrarMensaje("No se pudo cargar la lista. ¿Está encendido el servidor?", true);
  }
}

async function eliminarInscripcion(id) {
  const respuesta = await fetch(`/api/inscripciones/${id}`, { method: "DELETE" });
  const resultado = await respuesta.json();
  mostrarMensaje(resultado.mensaje, !respuesta.ok);
  cargarInscripciones();
}

formulario.addEventListener("submit", async (evento) => {
  // 1: Evita que el formulario recargue la página.
  evento.preventDefault();

  // 2: Obtén los valores del formulario.
  const valores = new FormData(formulario);
  const datos = {
    nombre: valores.get("nombre").trim(),
    correo: valores.get("correo").trim(),
    telefono: valores.get("telefono").trim(),
    taller: valores.get("taller"),
    horario: valores.get("horario")
  };

  try {
    // 3: Envía los cinco datos como JSON con POST /api/inscripciones.
    const respuesta = await fetch("/api/inscripciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    const resultado = await respuesta.json();

    // 4: Muestra confirmación o el mensaje de error del servidor.
    if (!respuesta.ok) {
      mostrarMensaje(resultado.mensaje, true);
      return;
    }
    mostrarMensaje(`Inscripción registrada: ${resultado.nombre} (${resultado.taller}, ${resultado.horario}).`);

    // 5: Si se guardó, limpia el formulario y vuelve a cargar la lista.
    formulario.reset();
    cargarInscripciones();
  } catch (error) {
    mostrarMensaje("No se pudo conectar con el servidor.", true);
  }
});

cargarInscripciones();
