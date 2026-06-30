const express = require("express");

const router = express.Router();

const {
    guardarRenta,
    obtenerRentas,
    actualizarRenta,
    eliminarRenta
} = require("../controllers/rentasController");

// Ruta para guardar y obtener rentas
router.get("/", obtenerRentas);

router.post("/", guardarRenta);

router.put("/:id", actualizarRenta);

router.delete("/:id", eliminarRenta);

module.exports = router;