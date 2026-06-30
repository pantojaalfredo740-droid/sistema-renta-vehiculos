const express = require("express");

const router = express.Router();

const {
    guardarCliente,
    obtenerClientes,
    actualizarCliente,
    eliminarCliente
} = require("../controllers/clienteController");

// Ruta para guardar y obtener un cliente
router.get("/", obtenerClientes);

router.post("/", guardarCliente);

router.put("/:id", actualizarCliente);

router.delete("/:id", eliminarCliente);

module.exports = router;