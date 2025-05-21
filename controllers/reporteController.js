// const Venta = require("../models/Venta");

// exports.getVentasPorCliente = async (req, res) => {
//   const { clienteId, fechaInicio, fechaFin } = req.query;

//   if (!clienteId || !fechaInicio || !fechaFin) {
//     return res.status(400).json({ error: "Faltan datos para el reporte." });
//   }

//   try {
//     const inicio = new Date(fechaInicio + "T00:00:00");
//     const fin = new Date(fechaFin + "T23:59:59");

//     const ventas = await Venta.find({
//       cliente: clienteId,
//       fecha: {
//         $gte: inicio.toISOString().split("T")[0],
//         $lte: fin.toISOString().split("T")[0],
//       },
//     });

//     if (ventas.length === 0) {
//       return res.status(404).json({ mensaje: "No se encontraron ventas." });
//     }

//     res.json(ventas);
//   } catch (error) {
//     console.error("Error al obtener ventas:", error);
//     res.status(500).json({ error: "Error al obtener ventas del cliente" });
//   }
// };
// // controllers/reporteController.js
// const Venta = require("../models/Venta");

// exports.getVentasPorCliente = async (req, res) => {
//   const { clienteId, fechaInicio, fechaFin } = req.query;

//   if (!clienteId || !fechaInicio || !fechaFin) {
//     return res.status(400).json({ error: "Faltan datos para el reporte." });
//   }

//   try {
//     const ventas = await Venta.find({
//       cliente: { $regex: new RegExp(clienteId, "i") }, // insensible a mayúsculas
//       fecha: {
//         $gte: fechaInicio,
//         $lte: fechaFin,
//       },
//     });

//     if (!ventas.length) {
//       return res.status(404).json({ mensaje: "No se encontraron ventas." });
//     }

//     res.json(ventas);
//   } catch (error) {
//     console.error("Error al obtener ventas:", error);
//     res.status(500).json({ error: "Error al obtener ventas del cliente" });
//   }
// };

// ✅ BACKEND - controllers/reporteController.js

const Cliente = require("../models/Cliente");
const Venta = require("../models/Venta");

exports.getVentasPorCliente = async (req, res) => {
  const { clienteId, fechaInicio, fechaFin } = req.query;

  if (!clienteId || !fechaInicio || !fechaFin) {
    return res.status(400).json({ error: "Faltan datos para el reporte." });
  }

  try {
    const ventas = await Venta.find({
      cliente: clienteId,
      fecha: { $gte: fechaInicio, $lte: fechaFin },
    });

    if (!ventas.length) {
      return res.status(404).json({ mensaje: "No se encontraron ventas." });
    }

    res.json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ error: "Error al obtener ventas del cliente" });
  }
};
