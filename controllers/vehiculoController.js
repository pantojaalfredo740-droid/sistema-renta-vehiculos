const Vehiculo = require("../models/Vehiculo");

// Guardar
const guardarVehiculo = async (req, res) => {
  try {
    req.body.anio = Number(req.body.anio); // 🔥 FIX IMPORTANTE

    const nuevo = new Vehiculo(req.body);
    await nuevo.save();

    res.status(201).json({ mensaje: "Vehículo guardado" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al guardar" });
  }
};

// Obtener
const obtenerVehiculos = async (req, res) => {
  try {
    const data = await Vehiculo.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener" });
  }
};

// Actualizar
const actualizarVehiculo = async (req, res) => {
  try {
    req.body.anio = Number(req.body.anio);

    await Vehiculo.findByIdAndUpdate(req.params.id, req.body);

    res.json({ mensaje: "Actualizado correctamente" });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar" });
  }
};

// Eliminar
const eliminarVehiculo = async (req, res) => {
  try {
    await Vehiculo.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar" });
  }
};

module.exports = {
  guardarVehiculo,
  obtenerVehiculos,
  actualizarVehiculo,
  eliminarVehiculo
};