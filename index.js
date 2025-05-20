const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const clienteRoutes = require("./routes/cliente.routes");
const productoRoutes = require("./routes/productoRoutes");
const ventaRoutes = require("./routes/ventaRoutes");
const pagoRoutes = require("./routes/pagoRoutes");
const reporteRoutes = require("./routes/reporteRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/clientes", clienteRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/pagos", pagoRoutes);
app.use("/api/reportes", reporteRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
    );
  })
  .catch((error) => console.error("Error de conexión:", error));
