// Calculadora: suma, resta, multiplicacion y division.
(function () {
    "use strict";

    var pantalla = document.getElementById("pantalla");
    var indicador = document.getElementById("operacion-pendiente");
    var teclas = document.getElementById("teclas");

    var SIMBOLOS = { "+": "+", "-": "−", "*": "×", "/": "÷" };
    var MAX_CIFRAS = 14;

    // Variables de estado
    var numero1 = 0;
    var operacion = "";
    var empezarNumero = true;

    // Quita errores de coma flotante (0.1 + 0.2) y devuelve texto.
    function formatear(numero) {
        return String(Number(numero.toFixed(10)));
    }

    function calcular(a, b, signo) {
        if (signo === "+") { return a + b; }
        if (signo === "-") { return a - b; }
        if (signo === "*") { return a * b; }
        if (signo === "/") { return b === 0 ? null : a / b; }
        return b;
    }

    function mostrarOperacion() {
        indicador.textContent = operacion === ""
            ? ""
            : formatear(numero1) + " " + SIMBOLOS[operacion];

        var botones = teclas.querySelectorAll("[data-operacion]");
        for (var i = 0; i < botones.length; i++) {
            botones[i].classList.toggle("activa", botones[i].dataset.operacion === operacion);
        }
    }

    function mostrarError() {
        pantalla.textContent = "Error";
        operacion = "";
        numero1 = 0;
        empezarNumero = true;
        mostrarOperacion();
    }

    // Escribe numeros y el punto decimal
    function escribir(valor) {
        if (empezarNumero) {
            pantalla.textContent = "0";
            empezarNumero = false;
        }

        if (valor === ".") {
            if (pantalla.textContent.indexOf(".") === -1) {
                pantalla.textContent += ".";
            }
            return;
        }

        if (pantalla.textContent.replace(".", "").length >= MAX_CIFRAS) {
            return;
        }

        pantalla.textContent = pantalla.textContent === "0"
            ? String(valor)
            : pantalla.textContent + valor;
    }

    // Guarda el primer numero y la operacion elegida. Si ya habia una
    // operacion pendiente con un segundo numero, la resuelve antes.
    function elegirOperacion(signo) {
        var actual = Number(pantalla.textContent);
        if (isNaN(actual)) {
            return;
        }

        if (operacion !== "" && !empezarNumero) {
            var parcial = calcular(numero1, actual, operacion);
            if (parcial === null) {
                mostrarError();
                return;
            }
            numero1 = parcial;
            pantalla.textContent = formatear(parcial);
        } else {
            numero1 = actual;
        }

        operacion = signo;
        empezarNumero = true;
        mostrarOperacion();
    }

    // Calcula el resultado al pulsar "="
    function igual() {
        if (operacion === "") {
            return;
        }

        var total = calcular(numero1, Number(pantalla.textContent), operacion);
        if (total === null) {
            mostrarError();
            return;
        }

        pantalla.textContent = formatear(total);
        numero1 = total;
        operacion = "";
        empezarNumero = true;
        mostrarOperacion();
    }

    // Reinicia toda la calculadora
    function borrar() {
        pantalla.textContent = "0";
        numero1 = 0;
        operacion = "";
        empezarNumero = true;
        mostrarOperacion();
    }

    teclas.addEventListener("click", function (evento) {
        var boton = evento.target.closest("button");
        if (!boton) {
            return;
        }

        if (boton.dataset.numero !== undefined) {
            escribir(boton.dataset.numero);
        } else if (boton.dataset.operacion !== undefined) {
            elegirOperacion(boton.dataset.operacion);
        } else if (boton.dataset.accion === "igual") {
            igual();
        } else if (boton.dataset.accion === "borrar") {
            borrar();
        }
    });

    // Teclado: numeros, punto, operaciones, Enter y Escape
    document.addEventListener("keydown", function (evento) {
        var tecla = evento.key;

        if (evento.ctrlKey || evento.metaKey || evento.altKey) {
            return;
        }

        if (tecla >= "0" && tecla <= "9") {
            escribir(tecla);
        } else if (tecla === "." || tecla === ",") {
            escribir(".");
        } else if (SIMBOLOS[tecla] !== undefined) {
            elegirOperacion(tecla);
        } else if (tecla === "Enter" || tecla === "=") {
            evento.preventDefault();
            igual();
        } else if (tecla === "Escape" || tecla === "Delete") {
            borrar();
        }
    });
})();
