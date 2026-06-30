const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", () => {

    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    if (usuario === "admin" && contrasena === "1234") {

        localStorage.setItem("sesion", "activa");

        window.location.href = "menu.html";

    } else {

        alert("Usuario o contraseña incorrectos");

    }

});