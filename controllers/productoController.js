const Producto = require("../models/producto-model");

const generarCodigo = async () => {
  for (let i = 1; i <= 1000; i++) {
    const codigo = i.toString().padStart(3, "0");
    const existe = await Producto.findOne({ codigo });
    if (!existe) return codigo;
  }
  throw new Error("Se alcanzó el límite de 1000 productos");
};

exports.getProductos = async (req, res) => {
  const productos = await Producto.find().sort({ createdAt: -1 });
  res.json(productos);
};

exports.createProducto = async (req, res) => {
  try {
    const codigo = await generarCodigo();
    const newProducto = new Producto({ ...req.body, codigo });
    await newProducto.save();
    res.status(201).json(newProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const { codigo } = req.params;
    const updated = await Producto.findOneAndUpdate({ codigo }, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProducto = async (req, res) => {
  try {
    const { codigo } = req.params;
    const deleted = await Producto.findOneAndDelete({ codigo });
    if (!deleted)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
