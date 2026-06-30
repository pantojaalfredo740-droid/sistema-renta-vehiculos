const express = require("express");

const router = express.Router();

const {
    guardarChofer,
    obtenerChoferes,
    actualizarChofer,
    eliminarChofer
} = require("../controllers/choferController");

// Obtener todos los choferes
router.get("/", obtenerChoferes);

// Guardar un chofer
router.post("/", guardarChofer);

// Actualizar un chofer
router.put("/:id", actualizarChofer);

// Eliminar un chofer
router.delete("/:id", eliminarChofer);

module.exports = router;