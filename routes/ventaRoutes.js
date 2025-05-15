// routes/ventaRoutes.js
const express = require("express");
const router = express.Router();
const ventaController = require("../controllers/ventaController");

router.get("/", ventaController.getVentas);
router.post("/", ventaController.createVenta);
router.put("/:numero", ventaController.updateVenta);
router.delete("/:numero", ventaController.deleteVenta);

module.exports = router;
