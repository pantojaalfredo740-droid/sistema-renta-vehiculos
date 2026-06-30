const boton = document.getElementById("btnGuardar");
let clienteEditando = null;

// Guardar o eliminar
boton.addEventListener("click", async () => {

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    const direccion = document.getElementById("direccion").value;

    const cliente = {
        nombre,
        apellido,
        telefono,
        correo,
        direccion
    };

    try {

        let respuesta;

        if (clienteEditando) {

            // Editar
            respuesta = await fetch("http://localhost:3000/api/clientes/" + clienteEditando, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente)
            });

        } else {

            // Guardar
            respuesta = await fetch("http://localhost:3000/api/clientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente)
            });

        }

        const datos = await respuesta.json();

        alert(datos.mensaje);

        clienteEditando = null;

        limpiarFormulario();
        cargarClientes();

    } catch (error) {
        console.log(error);
        alert("Ocurrió un error");
    }

});


// Cargar clientes
async function cargarClientes() {

    try {

        const respuesta = await fetch("http://localhost:3000/api/clientes");
        const clientes = await respuesta.json();

        const tabla = document.getElementById("tablaClientes");
        tabla.innerHTML = "";

        clientes.forEach(cliente => {

            tabla.innerHTML += `
                <tr>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.apellido}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.correo}</td>
                    <td>${cliente.direccion}</td>

                    <td>
                        <button onclick="editarCliente('${cliente._id}')">Editar</button>
                        <button onclick="eliminarCliente('${cliente._id}')">Eliminar</button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {
        console.log(error);
    }

}


// Editar cliente
async function editarCliente(id) {

    try {

        const respuesta = await fetch("http://localhost:3000/api/clientes");
        const clientes = await respuesta.json();

        const cliente = clientes.find(c => c._id === id);

        if (!cliente) {
            alert("Cliente no encontrado");
            return;
        }

        document.getElementById("nombre").value = cliente.nombre;
        document.getElementById("apellido").value = cliente.apellido;
        document.getElementById("telefono").value = cliente.telefono;
        document.getElementById("correo").value = cliente.correo;
        document.getElementById("direccion").value = cliente.direccion;

        clienteEditando = id;

    } catch (error) {
        console.log(error);
    }

}


// Eliminar cliente
async function eliminarCliente(id) {

    const confirmar = confirm("¿Deseas eliminar este cliente?");

    if (!confirmar) return;

    try {

        const respuesta = await fetch("http://localhost:3000/api/clientes/" + id, {
            method: "DELETE"
        });

        const datos = await respuesta.json();

        alert(datos.mensaje);

        cargarClientes();

    } catch (error) {
        console.log(error);
        alert("Ocurrió un error");
    }

}


// Limpiar formulario
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("direccion").value = "";
}


// Cargar al inicio
cargarClientes();