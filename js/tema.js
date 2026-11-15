// Cambio entre modo claro y modo oscuro.
// Se carga en el <head> (sin defer) para aplicar el tema guardado antes de
// que se pinte la pagina y evitar un parpadeo.
(function () {
    "use strict";

    var CLAVE = "tema-portafolio";
    var enlaceOscuro = document.getElementById("tema-oscuro");

    function leerTema() {
        try {
            return localStorage.getItem(CLAVE);
        } catch (error) {
            return null;
        }
    }

    function guardarTema(valor) {
        try {
            localStorage.setItem(CLAVE, valor);
        } catch (error) {
            // Sin almacenamiento disponible: el tema solo dura esta pagina.
        }
    }

    function actualizarBotones(oscuro) {
        var botones = document.querySelectorAll("[data-cambiar-tema]");
        for (var i = 0; i < botones.length; i++) {
            botones[i].textContent = oscuro ? "Modo claro" : "Modo oscuro";
            botones[i].setAttribute("aria-pressed", String(oscuro));
        }
    }

    function aplicarTema(oscuro) {
        if (enlaceOscuro) {
            enlaceOscuro.disabled = !oscuro;
        }
        actualizarBotones(oscuro);
    }

    var modoOscuro = leerTema() === "oscuro";
    aplicarTema(modoOscuro);

    document.addEventListener("DOMContentLoaded", function () {
        aplicarTema(modoOscuro);

        var botones = document.querySelectorAll("[data-cambiar-tema]");
        for (var i = 0; i < botones.length; i++) {
            botones[i].addEventListener("click", function () {
                modoOscuro = !modoOscuro;
                guardarTema(modoOscuro ? "oscuro" : "claro");
                aplicarTema(modoOscuro);
            });
        }
    });
})();
