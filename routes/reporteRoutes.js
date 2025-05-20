const express = require("express");
const router = express.Router();
const { getVentasPorCliente } = require("../controllers/reporteController");

router.get("/cliente", getVentasPorCliente);

module.exports = router;
