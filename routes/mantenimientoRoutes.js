const express = require("express");

const router = express.Router();

const {

    guardarMantenimiento,
    obtenerMantenimientos,
    actualizarMantenimiento,
    eliminarMantenimiento

} = require("../controllers/mantenimientoController");

router.get("/", obtenerMantenimientos);

router.post("/", guardarMantenimiento);

router.put("/:id", actualizarMantenimiento);

router.delete("/:id", eliminarMantenimiento);

module.exports = router;