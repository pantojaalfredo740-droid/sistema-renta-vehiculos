const Cliente = require("../models/Cliente");

// Guardar un cliente
const guardarCliente = async (req, res) => {

    try {

        const nuevoCliente = new Cliente(req.body);

        await nuevoCliente.save();

        res.status(201).json({
            mensaje: "Cliente guardado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al guardar el cliente"
        });

    }

};

// Obtener todos los clientes
const obtenerClientes = async (req, res) => {

    try {

        const clientes = await Cliente.find();

        res.json(clientes);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener los clientes"
        });

    }

};

// Actualizar un cliente
const actualizarCliente = async (req, res) => {

    try {

        const { id } = req.params;

        await Cliente.findByIdAndUpdate(id, req.body);

        res.json({
            mensaje: "Cliente actualizado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al actualizar el cliente"
        });

    }

};

// Eliminar un cliente
const eliminarCliente = async (req, res) => {

    try {

        const { id } = req.params;

        await Cliente.findByIdAndDelete(id);

        res.json({
            mensaje: "Cliente eliminado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al eliminar el cliente"
        });

    }

};

module.exports = {
    guardarCliente,
    obtenerClientes,
    actualizarCliente,
    eliminarCliente
};