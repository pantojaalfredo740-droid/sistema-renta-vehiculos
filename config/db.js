const mongoose = require("mongoose");

const conectarDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/rentaVehiculos");

        console.log("✅ MongoDB conectado correctamente");
    } catch (error) {
        console.log("❌ Error al conectar MongoDB");
        console.log(error);

        process.exit(1);
    }
};

module.exports = conectarDB;