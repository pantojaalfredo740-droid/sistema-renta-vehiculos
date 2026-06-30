const boton = document.getElementById("btnGuardar");
const tabla = document.getElementById("tablaChoferes");

let editando = null;

// Cargar al iniciar
document.addEventListener("DOMContentLoaded", mostrarChoferes);

// GUARDAR O ACTUALIZAR
boton.addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    const licencia = document.getElementById("licencia").value;
    const direccion = document.getElementById("direccion").value;

    if (!nombre || !apellido || !telefono || !licencia || !direccion) {
        alert("Llena todos los campos");
        return;
    }

    const chofer = { nombre, apellido, telefono, licencia, direccion };

    let choferes = JSON.parse(localStorage.getItem("choferes")) || [];

    if (editando !== null) {
        choferes[editando] = chofer;
        editando = null;
        boton.textContent = "Guardar Chofer";
    } else {
        choferes.push(chofer);
    }

    localStorage.setItem("choferes", JSON.stringify(choferes));

    limpiar();
    mostrarChoferes();
});

// Mostrar en tabla
function mostrarChoferes() {
    let choferes = JSON.parse(localStorage.getItem("choferes")) || "";

    if (!choferes) choferes = [];

    tabla.innerHTML = "";

    choferes.forEach((c, index) => {
        tabla.innerHTML += `
            <tr>
                <td>${c.nombre}</td>
                <td>${c.apellido}</td>
                <td>${c.telefono}</td>
                <td>${c.licencia}</td>
                <td>${c.direccion}</td>
                <td>
                    <button onclick="editarChofer(${index})">Editar</button>
                    <button onclick="eliminarChofer(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Editar
function editarChofer(index) {
    let choferes = JSON.parse(localStorage.getItem("choferes")) || [];

    const c = choferes[index];

    document.getElementById("nombre").value = c.nombre;
    document.getElementById("apellido").value = c.apellido;
    document.getElementById("telefono").value = c.telefono;
    document.getElementById("licencia").value = c.licencia;
    document.getElementById("direccion").value = c.direccion;

    editando = index;
    boton.textContent = "Actualizar Chofer";
}

// Eliminar
function eliminarChofer(index) {
    let choferes = JSON.parse(localStorage.getItem("choferes")) || [];

    choferes.splice(index, 1);

    localStorage.setItem("choferes", JSON.stringify(choferes));

    mostrarChoferes();
}

// Limpiar campos
function limpiar() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("licencia").value = "";
    document.getElementById("direccion").value = "";
}