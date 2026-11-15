// Formulario de contacto de demostracion: valida con HTML y confirma en pantalla.
(function () {
    "use strict";

    var formulario = document.getElementById("formulario-contacto");
    var estado = document.getElementById("estado-formulario");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        var nombre = document.getElementById("nombre").value.trim();
        // reset() dispara el evento "reset", que limpia el aviso: se llama antes de escribirlo.
        formulario.reset();
        estado.textContent = "Gracias, " + nombre + ". Este formulario es una demostración: " +
            "el mensaje no se envía a ningún servidor.";
    });

    formulario.addEventListener("reset", function () {
        estado.textContent = "";
    });
})();
