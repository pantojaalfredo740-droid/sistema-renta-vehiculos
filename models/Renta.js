const mongoose = require("mongoose");

const rentaSchema = new mongoose.Schema({

    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
        required: true
    },

    vehiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehiculo",
        required: true
    },

    fechaRenta: {
        type: Date,
        required: true
    },

    fechaDevolucion: {
        type: Date,
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    estado: {
        type: String,
        default: "Activa"
    }

});

module.exports = mongoose.model("Renta", rentaSchema);