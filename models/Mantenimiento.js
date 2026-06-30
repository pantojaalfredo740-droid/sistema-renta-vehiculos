const mongoose = require("mongoose");

const mantenimientoSchema = new mongoose.Schema({

    vehiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehiculo",
        required: true
    },

    fecha: {
        type: Date,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    costo: {
        type: Number,
        required: true
    },

    estado: {
        type: String,
        default: "Pendiente"
    }

});

module.exports = mongoose.model("Mantenimiento", mantenimientoSchema);