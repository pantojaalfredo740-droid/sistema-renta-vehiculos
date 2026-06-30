const express = require("express");
const path = require("path");
const cors = require("cors");

const conectarDB = require("./config/db");

// Rutas
const clienteRoutes = require("./routes/clienteRoutes");
const vehiculoRoutes = require("./routes/vehiculoRoutes");
const rentaRoutes = require("./routes/rentaRoutes");
const choferRoutes = require("./routes/choferRoutes");
const mantenimientoRoutes = require("./routes/mantenimientoRoutes"); // NUEVO

const app = express();

conectarDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// API
app.use("/api/clientes", clienteRoutes);
app.use("/api/vehiculos", vehiculoRoutes);
app.use("/api/rentas", rentaRoutes);
app.use("/api/choferes", choferRoutes);
app.use("/api/mantenimientos", mantenimientoRoutes); // NUEVO

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});