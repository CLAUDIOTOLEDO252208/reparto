// // controllers/ventaController.js
// const Venta = require("../models/Venta");

// exports.getVentas = async (req, res) => {
//   try {
//     const ventas = await Venta.find();
//     res.json(ventas);
//   } catch (error) {
//     res.status(500).json({ error: "Error al obtener ventas" });
//   }
// };

// exports.createVenta = async (req, res) => {
//   try {
//     const venta = new Venta(req.body);
//     await venta.save();
//     res.status(201).json(venta);
//   } catch (error) {
//     res.status(400).json({ error: "Error al crear venta", details: error });
//   }
// };

// exports.updateVenta = async (req, res) => {
//   try {
//     const updatedVenta = await Venta.findOneAndUpdate(
//       { numero: req.params.numero },
//       req.body,
//       { new: true }
//     );
//     res.json(updatedVenta);
//   } catch (error) {
//     res.status(400).json({ error: "Error al actualizar venta" });
//   }
// };

// exports.deleteVenta = async (req, res) => {
//   try {
//     await Venta.findOneAndDelete({ numero: req.params.numero });
//     res.json({ message: "Venta eliminada correctamente" });
//   } catch (error) {
//     res.status(500).json({ error: "Error al eliminar venta" });
//   }
// };
const Venta = require("../models/Venta");

exports.getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find();
    res.json({ success: true, data: ventas });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error al obtener ventas" });
  }
};

exports.createVenta = async (req, res) => {
  try {
    const venta = new Venta(req.body);
    await venta.save();
    res.status(201).json({ success: true, data: venta });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Error al crear venta",
      details: error.message,
    });
  }
};

exports.updateVenta = async (req, res) => {
  try {
    const updatedVenta = await Venta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedVenta) {
      return res
        .status(404)
        .json({ success: false, error: "Venta no encontrada" });
    }

    res.json({ success: true, data: updatedVenta });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Error al actualizar venta",
      details: error.message,
    });
  }
};

exports.deleteVenta = async (req, res) => {
  try {
    const deletedVenta = await Venta.findByIdAndDelete(req.params.id);

    if (!deletedVenta) {
      return res
        .status(404)
        .json({ success: false, error: "Venta no encontrada" });
    }

    res.json({
      success: true,
      data: {
        _id: deletedVenta._id,
        message: "Venta eliminada correctamente",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al eliminar venta",
      details: error.message,
    });
  }
};
