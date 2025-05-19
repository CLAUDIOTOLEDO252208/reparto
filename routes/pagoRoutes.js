const express = require("express");
const router = express.Router();
const pagoController = require("../controllers/pagoController");

// Registrar un nuevo pago
router.post("/", pagoController.registrarPago);

// Obtener pagos de un cliente
router.get("/cliente/:codigoCliente", pagoController.obtenerPagosCliente);

// Obtener resumen completo de un cliente
router.get("/resumen/:codigoCliente", pagoController.obtenerResumenCliente);

// Buscar clientes por nombre/apellido
router.get("/buscar-clientes", pagoController.buscarClientes);

module.exports = router;
