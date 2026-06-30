const express = require("express");

const router = express.Router();

const {
    guardarVehiculo,
    obtenerVehiculos,
    actualizarVehiculo,
    eliminarVehiculo
} = require("../controllers/vehiculoController");

// Obtener vehículos
router.get("/", obtenerVehiculos);

// Guardar vehículo
router.post("/", guardarVehiculo);

// Actualizar vehículo
router.put("/:id", actualizarVehiculo);

// Eliminar vehículo
router.delete("/:id", eliminarVehiculo);

module.exports = router;