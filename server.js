const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Este arreglo guarda los registros solo mientras el servidor está activo.
const inscripciones = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Esta ruta ya permite consultar la lista.
app.get("/api/inscripciones", (req, res) => {
  res.json(inscripciones);
});

// Contador para generar un id único en cada registro.
let siguienteId = 1;

app.post("/api/inscripciones", (req, res) => {
  // 1: Extrae nombre, correo, telefono, taller y horario de req.body.
  const { nombre, correo, telefono, taller, horario } = req.body ?? {};
  const campos = { nombre, correo, telefono, taller, horario };

  // 2: Revisa que todos los campos existan y no estén vacíos.
  const faltantes = Object.keys(campos).filter(
    (campo) => typeof campos[campo] !== "string" || campos[campo].trim() === ""
  );
  if (faltantes.length > 0) {
    return res.status(400).json({ mensaje: `Faltan datos obligatorios: ${faltantes.join(", ")}.` });
  }

  // 3: Comprueba que el correo tenga un formato válido.
  const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoCorreo.test(correo.trim())) {
    return res.status(400).json({ mensaje: "El correo no tiene un formato válido." });
  }

  // 4: Crea un objeto con id y los cinco datos; agrégalo a inscripciones.
  const nuevaInscripcion = {
    id: siguienteId++,
    nombre: nombre.trim(),
    correo: correo.trim(),
    telefono: telefono.trim(),
    taller: taller.trim(),
    horario: horario.trim()
  };
  inscripciones.push(nuevaInscripcion);

  // 5: Responde con estado 201 y el registro creado.
  res.status(201).json(nuevaInscripcion);
});

// Extensión: elimina una inscripción por su id.
app.delete("/api/inscripciones/:id", (req, res) => {
  const id = Number(req.params.id);
  const posicion = inscripciones.findIndex((registro) => registro.id === id);
  if (posicion === -1) {
    return res.status(404).json({ mensaje: `No existe una inscripción con id ${req.params.id}.` });
  }
  const [eliminada] = inscripciones.splice(posicion, 1);
  res.json({ mensaje: `Se eliminó la inscripción de ${eliminada.nombre}.` });
});

app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});
