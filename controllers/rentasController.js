const Renta = require("../models/Renta");
const Vehiculo = require("../models/Vehiculo");

// Guardar una renta
const guardarRenta = async (req, res) => {

    try {

        const nuevaRenta = new Renta(req.body);

        await nuevaRenta.save();

        // Cambiar el estado del vehículo a Rentado
        await Vehiculo.findByIdAndUpdate(req.body.vehiculo, {
            estado: "Rentado"
        });

        res.status(201).json({
            mensaje: "Renta guardada correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al guardar la renta"
        });

    }

};

// Obtener todas las rentas
const obtenerRentas = async (req, res) => {

    try {

        const rentas = await Renta.find()
            .populate("cliente")
            .populate("vehiculo");

        res.json(rentas);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener las rentas"
        });

    }

};

// Actualizar una renta
const actualizarRenta = async (req, res) => {

    try {

        const { id } = req.params;

        await Renta.findByIdAndUpdate(id, req.body);

        res.json({
            mensaje: "Renta actualizada correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al actualizar la renta"
        });

    }

};

// Eliminar una renta
const eliminarRenta = async (req, res) => {

    try {

        const { id } = req.params;

        // Buscar la renta
        const renta = await Renta.findById(id);

        // Cambiar el vehículo a Disponible
        await Vehiculo.findByIdAndUpdate(renta.vehiculo, {
            estado: "Disponible"
        });

        // Eliminar la renta
        await Renta.findByIdAndDelete(id);

        res.json({
            mensaje: "Renta eliminada correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al eliminar la renta"
        });

    }

};

module.exports = {
    guardarRenta,
    obtenerRentas,
    actualizarRenta,
    eliminarRenta
};