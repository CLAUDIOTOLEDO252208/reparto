const Pago = require("../models/Pago");
const Venta = require("../models/Venta");
const Cliente = require("../models/Cliente");

exports.registrarPago = async (req, res) => {
  try {
    const { codigoCliente, fecha, monto, tipoPago } = req.body;

    // Validar que el cliente exista
    const cliente = await Cliente.findOne({ codigo: codigoCliente });
    if (!cliente) {
      return res.status(404).json({
        success: false,
        error: "Cliente no encontrado",
      });
    }

    const nuevoPago = new Pago({
      codigoCliente,
      fecha: fecha || new Date(),
      monto,
      tipoPago,
    });

    await nuevoPago.save();

    res.status(201).json({
      success: true,
      data: nuevoPago,
      message: "Pago registrado exitosamente",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.obtenerPagosCliente = async (req, res) => {
  try {
    const { codigoCliente } = req.params;

    const pagos = await Pago.find({ codigoCliente }).sort({ fecha: -1 });

    res.json({
      success: true,
      data: pagos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.obtenerResumenCliente = async (req, res) => {
  try {
    const { codigoCliente } = req.params;

    // Obtener ventas del cliente
    const ventas = await Venta.find({ cliente: codigoCliente });
    const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0);

    // Obtener pagos del cliente
    const pagos = await Pago.find({ codigoCliente });
    const totalPagos = pagos.reduce((sum, p) => sum + p.monto, 0);

    // Calcular saldo
    const saldo = totalVentas - totalPagos;

    res.json({
      success: true,
      data: {
        cliente: await Cliente.findOne({ codigo: codigoCliente }),
        totalVentas,
        totalPagos,
        saldo,
        ventas,
        pagos,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.buscarClientes = async (req, res) => {
  try {
    const { query } = req.query;

    const clientes = await Cliente.find({
      $or: [
        { nombre: { $regex: query, $options: "i" } },
        { apellido: { $regex: query, $options: "i" } },
      ],
    }).limit(5);

    res.json({
      success: true,
      data: clientes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
