// Piedra, papel o tijera contra el ordenador.
(function () {
    "use strict";

    var OPCIONES = ["piedra", "papel", "tijera"];

    var contenedorResultado = document.getElementById("resultado");
    var mensaje = document.getElementById("resultado-mensaje");
    var detalle = document.getElementById("resultado-detalle");
    var puntosJugador = document.getElementById("puntos-jugador");
    var puntosEmpate = document.getElementById("puntos-empate");
    var puntosMaquina = document.getElementById("puntos-maquina");

    var marcador = { jugador: 0, empate: 0, maquina: 0 };

    // Compara las dos jugadas y devuelve "empate", "victoria" o "derrota"
    function evaluarResultado(jugador, maquina) {
        if (jugador === maquina) {
            return "empate";
        }

        var gana =
            (jugador === "piedra" && maquina === "tijera") ||
            (jugador === "papel" && maquina === "piedra") ||
            (jugador === "tijera" && maquina === "papel");

        return gana ? "victoria" : "derrota";
    }

    var TEXTOS = {
        victoria: "Has ganado",
        derrota: "Gana la máquina",
        empate: "Empate"
    };

    function mostrarMarcador() {
        puntosJugador.textContent = marcador.jugador;
        puntosEmpate.textContent = marcador.empate;
        puntosMaquina.textContent = marcador.maquina;
    }

    // Recibe la eleccion del jugador y juega una ronda
    function jugar(jugador) {
        var maquina = OPCIONES[Math.floor(Math.random() * OPCIONES.length)];
        var resultado = evaluarResultado(jugador, maquina);

        if (resultado === "victoria") { marcador.jugador++; }
        else if (resultado === "derrota") { marcador.maquina++; }
        else { marcador.empate++; }

        contenedorResultado.className = "resultado " + resultado;
        mensaje.textContent = TEXTOS[resultado];
        detalle.textContent = "Tú elegiste " + jugador + " y la máquina eligió " + maquina + ".";
        mostrarMarcador();
    }

    function reiniciar() {
        marcador = { jugador: 0, empate: 0, maquina: 0 };
        contenedorResultado.className = "resultado";
        mensaje.textContent = "Elige una opción para empezar";
        detalle.textContent = "";
        mostrarMarcador();
    }

    document.getElementById("opciones").addEventListener("click", function (evento) {
        var boton = evento.target.closest("button");
        if (boton && boton.dataset.jugada) {
            jugar(boton.dataset.jugada);
        }
    });

    document.getElementById("reiniciar").addEventListener("click", reiniciar);
})();
