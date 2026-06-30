const boton = document.getElementById("btnGuardar");
const tabla = document.getElementById("tablaVehiculos");

let editando = null;

document.addEventListener("DOMContentLoaded", cargarVehiculos);

// Guardar / Actualizar
boton.addEventListener("click", async () => {

  const vehiculo = {
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    anio: document.getElementById("anio").value,
    placas: document.getElementById("placas").value,
    tipo: document.getElementById("tipo").value
  };

  if (editando) {
    await fetch(`http://localhost:3000/api/vehiculos/${editando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehiculo)
    });

    editando = null;
    boton.textContent = "Guardar";

  } else {
    await fetch("http://localhost:3000/api/vehiculos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehiculo)
    });
  }

  limpiar();
  cargarVehiculos();
});

// Cargar
async function cargarVehiculos() {
  const res = await fetch("http://localhost:3000/api/vehiculos");
  const data = await res.json();

  tabla.innerHTML = "";

  data.forEach(v => {
    tabla.innerHTML += `
      <tr>
        <td>${v.marca}</td>
        <td>${v.modelo}</td>
        <td>${v.anio}</td>
        <td>${v.placas}</td>
        <td>${v.tipo}</td>
        <td>
          <button onclick='editarVehiculo(${JSON.stringify(v)})'>Editar</button>
          <button onclick="eliminarVehiculo('${v._id}')">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// Editar
function editarVehiculo(v) {
  document.getElementById("marca").value = v.marca;
  document.getElementById("modelo").value = v.modelo;
  document.getElementById("anio").value = v.anio;
  document.getElementById("placas").value = v.placas;
  document.getElementById("tipo").value = v.tipo;

  editando = v._id;
  boton.textContent = "Actualizar";
}

// Eliminar
async function eliminarVehiculo(id) {
  await fetch(`http://localhost:3000/api/vehiculos/${id}`, {
    method: "DELETE"
  });

  cargarVehiculos();
}

// Limpiar
function limpiar() {
  document.getElementById("marca").value = "";
  document.getElementById("modelo").value = "";
  document.getElementById("anio").value = "";
  document.getElementById("placas").value = "";
  document.getElementById("tipo").value = "";
}