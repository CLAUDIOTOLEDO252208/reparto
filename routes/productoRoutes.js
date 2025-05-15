const express = require("express");
const router = express.Router();
const {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} = require("../controllers/productoController");

router.get("/", getProductos);
router.post("/", createProducto);
router.put("/:codigo", updateProducto);
router.delete("/:codigo", deleteProducto);

module.exports = router;
