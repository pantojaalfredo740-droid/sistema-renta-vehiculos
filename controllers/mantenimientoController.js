const Mantenimiento = require("../models/Mantenimiento");
const Vehiculo = require("../models/Vehiculo");

// Guardar

const guardarMantenimiento = async (req, res) => {

    try {

        const nuevo = new Mantenimiento(req.body);

        await nuevo.save();

        // Cambiar estado del vehículo
        await Vehiculo.findByIdAndUpdate(req.body.vehiculo, {
            estado: "Mantenimiento"
        });

        res.status(201).json({
            mensaje: "Mantenimiento guardado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al guardar"
        });

    }

};

// Obtener

const obtenerMantenimientos = async (req, res) => {

    try {

        const mantenimientos = await Mantenimiento.find()
            .populate("vehiculo");

        res.json(mantenimientos);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener"
        });

    }

};

// Actualizar

const actualizarMantenimiento = async (req, res) => {

    try {

        await Mantenimiento.findByIdAndUpdate(req.params.id, req.body);

        // Si el mantenimiento terminó,
        // el vehículo vuelve a Disponible
        if (req.body.estado === "Finalizado") {

            await Vehiculo.findByIdAndUpdate(req.body.vehiculo, {
                estado: "Disponible"
            });

        }

        res.json({
            mensaje: "Mantenimiento actualizado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al actualizar"
        });

    }

};

// Eliminar

const eliminarMantenimiento = async (req, res) => {

    try {

        const mantenimiento = await Mantenimiento.findById(req.params.id);

        if (mantenimiento) {

            await Vehiculo.findByIdAndUpdate(mantenimiento.vehiculo, {
                estado: "Disponible"
            });

        }

        await Mantenimiento.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: "Mantenimiento eliminado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al eliminar"
        });

    }

};

module.exports = {
    guardarMantenimiento,
    obtenerMantenimientos,
    actualizarMantenimiento,
    eliminarMantenimiento
};