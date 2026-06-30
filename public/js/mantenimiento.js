let editando = null;

const btnGuardar = document.getElementById("btnGuardar");

// Iniciar
document.addEventListener("DOMContentLoaded", () => {

    cargarVehiculos();
    cargarMantenimientos();

});

// Cargar vehiculos
const cargarVehiculos = async () => {

    try {

        const res = await fetch("http://localhost:3000/api/vehiculos");
        const data = await res.json();

        const select = document.getElementById("vehiculo");

        select.innerHTML = "<option value=''>Seleccione un vehículo</option>";

        data.forEach(v => {

            const option = document.createElement("option");

            option.value = v._id;
            option.textContent = `${v.marca} ${v.modelo}`;

            select.appendChild(option);

        });

    } catch (error) {

        console.log(error);

    }

};

// Guardar
btnGuardar.addEventListener("click", async () => {

    const mantenimiento = {

        vehiculo: document.getElementById("vehiculo").value,
        fecha: document.getElementById("fecha").value,
        descripcion: document.getElementById("descripcion").value,
        costo: document.getElementById("costo").value,
        estado: document.getElementById("estado").value

    };

    if (editando == null) {

        await fetch("http://localhost:3000/api/mantenimientos", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(mantenimiento)

        });

    } else {

        await fetch(`http://localhost:3000/api/mantenimientos/${editando}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(mantenimiento)

        });

        editando = null;

        btnGuardar.textContent = "Guardar Mantenimiento";

    }

    limpiarFormulario();

    cargarMantenimientos();

});

// Mostrar
const cargarMantenimientos = async () => {

    const res = await fetch("http://localhost:3000/api/mantenimientos");

    const data = await res.json();

    const tabla = document.getElementById("tablaMantenimientos");

    tabla.innerHTML = "";

    data.forEach(m => {

        tabla.innerHTML += `
        <tr>

            <td>${m.vehiculo.marca} ${m.vehiculo.modelo}</td>

            <td>${m.fecha.substring(0,10)}</td>

            <td>${m.descripcion}</td>

            <td>$${m.costo}</td>

            <td>${m.estado}</td>

            <td>

                <button onclick="editar('${m._id}')">
                    Editar
                </button>

                <button onclick="eliminar('${m._id}')">
                    Eliminar
                </button>

            </td>

        </tr>
        `;

    });

};

// Editar
const editar = async (id) => {

    const res = await fetch("http://localhost:3000/api/mantenimientos");

    const data = await res.json();

    const mantenimiento = data.find(m => m._id === id);

    document.getElementById("vehiculo").value = mantenimiento.vehiculo._id;
    document.getElementById("fecha").value = mantenimiento.fecha.substring(0,10);
    document.getElementById("descripcion").value = mantenimiento.descripcion;
    document.getElementById("costo").value = mantenimiento.costo;
    document.getElementById("estado").value = mantenimiento.estado;

    editando = id;

    btnGuardar.textContent = "Actualizar Mantenimiento";

};

// Eliminar
const eliminar = async (id) => {

    if (!confirm("¿Deseas eliminar este mantenimiento?")) return;

    await fetch(`http://localhost:3000/api/mantenimientos/${id}`, {

        method: "DELETE"

    });

    cargarMantenimientos();

};

// Limpiar
const limpiarFormulario = () => {

    document.getElementById("vehiculo").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("costo").value = "";
    document.getElementById("estado").value = "Pendiente";

};