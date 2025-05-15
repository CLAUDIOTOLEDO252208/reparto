const express = require("express");
const router = express.Router();
const clienteCtrl = require("../controllers/cliente.controller");

router.get("/", clienteCtrl.getClientes);
router.post("/", clienteCtrl.createCliente);
router.put("/:codigo", clienteCtrl.updateCliente);
router.delete("/:codigo", clienteCtrl.deleteCliente);

module.exports = router;
