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

app.post("/api/inscripciones", (req, res) => {
  // TODO 1: Extrae nombre, correo, telefono, taller y horario de req.body.
  // TODO 2: Revisa que todos los campos existan y no estén vacíos.
  // TODO 3: Comprueba que el correo tenga un formato válido.
  // TODO 4: Crea un objeto con id y los cinco datos; agrégalo a inscripciones.
  // TODO 5: Responde con estado 201 y el registro creado.
  // Si los datos no son válidos, responde con estado 400 y un mensaje claro.
  res.status(501).json({ mensaje: "Completa la ruta POST como indica la consigna." });
});

app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});
