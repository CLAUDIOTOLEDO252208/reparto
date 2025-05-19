const mongoose = require("mongoose");

const PagoSchema = new mongoose.Schema({
  codigoCliente: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
  monto: {
    type: Number,
    required: true,
    min: 0,
  },
  tipoPago: {
    type: String,
    required: true,
    enum: ["Efectivo", "Transferencia", "Otro"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pago", PagoSchema);
