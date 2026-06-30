const mongoose = require("mongoose");

const choferSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    apellido: {
        type: String,
        required: true
    },

    telefono: {
        type: String,
        required: true
    },

    licencia: {
        type: String,
        required: true
    },

    direccion: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Chofer", choferSchema);