const Chofer = require("../models/Chofer");

// Guardar un chofer
const guardarChofer = async (req, res) => {

    try {

        const nuevoChofer = new Chofer(req.body);

        await nuevoChofer.save();

        res.status(201).json({
            mensaje: "Chofer guardado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al guardar el chofer"
        });

    }

};

// Obtener todos los choferes
const obtenerChoferes = async (req, res) => {

    try {

        const choferes = await Chofer.find();

        res.json(choferes);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener los choferes"
        });

    }

};

// Actualizar un chofer
const actualizarChofer = async (req, res) => {

    try {

        const { id } = req.params;

        await Chofer.findByIdAndUpdate(id, req.body);

        res.json({
            mensaje: "Chofer actualizado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al actualizar el chofer"
        });

    }

};

// Eliminar un chofer
const eliminarChofer = async (req, res) => {

    try {

        const { id } = req.params;

        await Chofer.findByIdAndDelete(id);

        res.json({
            mensaje: "Chofer eliminado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al eliminar el chofer"
        });

    }

};

module.exports = {
    guardarChofer,
    obtenerChoferes,
    actualizarChofer,
    eliminarChofer
};