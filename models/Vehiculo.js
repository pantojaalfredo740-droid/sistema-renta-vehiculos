const mongoose = require("mongoose");

const vehiculoSchema = new mongoose.Schema({

    marca: {
        type: String,
        required: true
    },

    modelo: {
        type: String,
        required: true
    },

    anio: {
        type: Number,
        required: true
    },

    placas: {
        type: String,
        required: true
    },

    tipo: {
        type: String,
        required: true
    },

    estado: {
        type: String,
        default: "Disponible"
    }

});

module.exports = mongoose.model("Vehiculo", vehiculoSchema);