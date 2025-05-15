const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    codigo: { type: String, unique: true, required: true },
    descripcion: { type: String, required: true },
    costo: { type: Number, required: false },
    rentabilidad: { type: Number, required: false },
    precioFinal: { type: Number, required: true },
    rentabilidadMayor: { type: Number, required: false },
    precioMayorFinal: { type: Number, required: true },
    stockMax: { type: Number, required: true },
    stockMin: { type: Number, required: true },
    stockActual: { type: Number, required: true },
    estado: { type: String, enum: ["activo", "inactivo"], required: true },
    categoria: {
      type: String,
      enum: ["panificado", "especialidades"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Producto", productoSchema);
// Este modelo define la estructura de un producto en la base de datos.
// Incluye campos como código, descripción, costo, rentabilidad, precio final,
// stock máximo, stock mínimo, stock actual, estado y categoría.
