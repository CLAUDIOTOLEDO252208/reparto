const Cliente = require("../models/cliente");

exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: "Error al registrar cliente" });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findOneAndUpdate(
      { codigo: req.params.codigo },
      req.body,
      { new: true }
    );
    if (!cliente)
      return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar cliente" });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findOneAndDelete({
      codigo: req.params.codigo,
    });
    if (!cliente)
      return res.status(404).json({ error: "Cliente no encontrado" });
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar cliente" });
  }
};
