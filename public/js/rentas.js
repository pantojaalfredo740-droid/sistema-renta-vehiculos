console.log("Rentas.js cargado");

const btnGuardar = document.getElementById("btnGuardar");

// Iniciar
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");

    cargarClientes();
    cargarVehiculos();
    cargarRentas();
});

// Cargar clientes
const cargarClientes = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/clientes");
        const data = await res.json();

        console.log("Clientes:", data);

        const select = document.getElementById("cliente");
        select.innerHTML = "<option value=''>Seleccione un cliente</option>";

        data.forEach(c => {
            const option = document.createElement("option");
            option.value = c._id;
            option.textContent = `${c.nombre} ${c.apellido || ""}`;
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar clientes:", error);
    }
};

// Cargar vehiculos
const cargarVehiculos = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/vehiculos");
        const data = await res.json();

        console.log("Vehículos:", data);

        const select = document.getElementById("vehiculo");
        select.innerHTML = "<option value=''>Seleccione un vehículo</option>";

        data.forEach(v => {
            const option = document.createElement("option");
            option.value = v._id;
            option.textContent = `${v.marca} ${v.modelo}`;
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar vehículos:", error);
    }
};

// Guardar renta
btnGuardar.addEventListener("click", async (e) => {

    e.preventDefault();

    const cliente = document.getElementById("cliente").value;
    const vehiculo = document.getElementById("vehiculo").value;
    const fechaRenta = document.getElementById("fechaRenta").value;
    const fechaDevolucion = document.getElementById("fechaDevolucion").value;
    const total = document.getElementById("total").value;

    if (!cliente || !vehiculo || !fechaRenta || !fechaDevolucion || !total) {
        alert("Completa todos los campos");
        return;
    }

    const renta = {
        cliente,
        vehiculo,
        fechaRenta,
        fechaDevolucion,
        total
    };

    try {

        const res = await fetch("http://localhost:3000/api/rentas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(renta)
        });

        const data = await res.json();

        alert(data.mensaje);

        cargarRentas();

    } catch (error) {

        console.error(error);

    }

});

// Mostar rentas
const cargarRentas = async () => {

    try {

        const res = await fetch("http://localhost:3000/api/rentas");
        const data = await res.json();

        const tabla = document.getElementById("tablaRentas");

        tabla.innerHTML = "";

        data.forEach(r => {

            tabla.innerHTML += `
                <tr>
                    <td>${r.cliente ? r.cliente.nombre : ""}</td>
                    <td>${r.vehiculo ? r.vehiculo.marca + " " + r.vehiculo.modelo : ""}</td>
                    <td>${r.fechaRenta}</td>
                    <td>${r.fechaDevolucion}</td>
                    <td>${r.total}</td>
                    <td>${r.vehiculo ? r.vehiculo.estado : ""}</td>
                    <td>
                        <button onclick="eliminarRenta('${r._id}')">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

};

// Eliminar
const eliminarRenta = async (id) => {

    if (!confirm("¿Eliminar renta?")) return;

    await fetch(`http://localhost:3000/api/rentas/${id}`, {
        method: "DELETE"
    });

    cargarRentas();
};