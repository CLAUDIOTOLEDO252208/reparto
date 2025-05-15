const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  direccion: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String, required: true },
  estado: { type: String, enum: ["activo", "inactivo"], default: "activo" },
});

module.exports = mongoose.model("Cliente", clienteSchema);
