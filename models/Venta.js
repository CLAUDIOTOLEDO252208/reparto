// models/Venta.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  codigo: String,
  descripcion: String,
  cantidad: Number,
  precio: Number,
  cambio: Number,
  devolucion: Number,
  queda: Number,
  subtotal: Number,
});

const VentaSchema = new mongoose.Schema({
  numero: { type: String, unique: true },
  tipo: String, // presupuesto, factura, etc.
  cliente: String,
  formaPago: String,
  fecha: String,
  total: Number,
  items: [ItemSchema],
});

module.exports = mongoose.model("Venta", VentaSchema);
