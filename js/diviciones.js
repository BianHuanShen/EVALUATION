/* =========================================================
   REPASO DE DIVISIONES
   TERCER GRADO
   DIVISIÓN LARGA PASO A PASO
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const CONFIG = {

    ejerciciosPorPartida: 10,

    vidasIniciales: 3,

    divisores: [
        4,
        5,
        6,
        7,
        8,
        9
    ]

};


/* =========================================================
   ESTADO
========================================================= */

let estado = {

    ejercicio: 1,

    puntos: 0,

    racha: 0,

    vidas: CONFIG.vidasIniciales,

    aciertos: 0,

    divisor: 4,

    dividendo: 1608,

    cociente: 402,

    digitosCociente: [],

    pasos: [],

    pasoActual: 0,

    respondido: false

};


/* =========================================================
   ELEMENTOS
========================================================= */

const divisorHTML =
    document.getElementById("divisor");

const dividendoHTML =
    document.getElementById("dividendo");

const cocienteHTML =
    document.getElementById("cociente");

const procedimientoHTML =
    document.getElementById("procedimiento");

const entradaPaso =
    document.getElementById("entradaPaso");

const btnPaso =
    document.getElementById("btnPaso");

const btnSiguiente =
    document.getElementById("btnSiguiente");

const preguntaPaso =
    document.getElementById("preguntaPaso");

const ayudaPaso =
    document.getElementById("ayudaPaso");

const numeroPaso =
    document.getElementById("numeroPaso");

const feedback =
    document.getElementById("feedback");

const feedbackIcono =
    document.getElementById("feedbackIcono");

const feedbackTitulo =
    document.getElementById("feedbackTitulo");

const feedbackTexto =
    document.getElementById("feedbackTexto");

const puntosHTML =
    document.getElementById("puntos");

const rachaHTML =
    document.getElementById("racha");

const vidasHTML =
    document.getElementById("vidas");

const ejercicioActualHTML =
    document.getElementById("ejercicioActual");

const btnEscuchar =
    document.getElementById("btnEscuchar");

const modalFinal =
    document.getElementById("modalFinal");

const puntajeFinal =
    document.getElementById("puntajeFinal");

const mensajeFinal =
    document.getElementById("mensajeFinal");


/* =========================================================
   INICIO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        generarDivision();

        actualizarInterfaz();

    }
);


/* =========================================================
   GENERAR DIVISIÓN EXACTA
========================================================= */

function generarDivision() {

    estado.respondido = false;

    /*
        Elegimos divisor del 4 al 9.
    */

    const divisor =
        CONFIG.divisores[
            Math.floor(
                Math.random() *
                CONFIG.divisores.length
            )
        ];


    /*
        Generamos un cociente entero.

        Esto garantiza:

        dividendo ÷ divisor = entero

        No habrá decimales.
    */

    let cociente;

    let dividendo;


    /*
        Intentamos que el dividendo
        tenga 4 o 5 cifras.
    */

    do {

        if (Math.random() < 0.55) {

            /*
                Cociente para producir
                principalmente 4 cifras.
            */

            cociente =
                Math.floor(
                    Math.random() * 1800
                ) + 250;

        } else {

            /*
                Cociente para producir
                5 cifras.
            */

            cociente =
                Math.floor(
                    Math.random() * 5000
                ) + 1200;

        }


        dividendo =
            cociente * divisor;


    } while (
        dividendo < 1000 ||
        dividendo > 99999
    );


    estado.divisor =
        divisor;

    estado.dividendo =
        dividendo;

    estado.cociente =
        cociente;


    /*
        Convertimos el cociente
        en sus cifras.
    */

    estado.digitosCociente =
        String(cociente)
            .split("")
            .map(Number);


    /*
        Crear todos los pasos.
    */

    crearPasos();


    /*
        Reiniciar paso.
    */

    estado.pasoActual = 0;


    /*
        Mostrar división.
    */

    mostrarDivision();


    /*
        Mostrar primer paso.
    */

    mostrarPaso();

}


/* =========================================================
   CREAR PASOS DE LA DIVISIÓN
========================================================= */

function crearPasos() {

    const divisor =
        estado.divisor;

    const digitos =
        String(
            estado.dividendo
        )
        .split("")
        .map(Number);


    const cociente =
        estado.cociente;


    const pasos = [];


    /*
        Este algoritmo realiza
        la división larga cifra por cifra.
    */

    let acumulado = 0;

    let indiceCociente = 0;


    for (
        let i = 0;
        i < digitos.length;
        i++
    ) {

        acumulado =
            acumulado * 10 +
            digitos[i];


        /*
            Si todavía no podemos
            dividir, seguimos acumulando.
        */

        if (
            acumulado < divisor
        ) {

            pasos.push({

                tipo: "bajar",

                numero:
                    acumulado,

                cifra:
                    digitos[i],

                texto:
                    `Baja el ${digitos[i]}.`

            });

            continue;

        }


        /*
            Calculamos cuántas veces
            cabe el divisor.
        */

        const numeroCociente =
            Math.floor(
                acumulado / divisor
            );


        const multiplicacion =
            numeroCociente * divisor;


        const resta =
            acumulado - multiplicacion;


        /*
            PASO DIVIDIR
        */

        pasos.push({

            tipo: "dividir",

            numero:
                acumulado,

            respuesta:
                numeroCociente,

            texto:
                `¿Cuántas veces cabe ${divisor} en ${acumulado}?`

        });


        /*
            PASO MULTIPLICAR
        */

        pasos.push({

            tipo: "multiplicar",

            numero:
                numeroCociente,

            respuesta:
                multiplicacion,

            texto:
                `Multiplica ${divisor} × ${numeroCociente}.`

        });


        /*
            PASO RESTAR
        */

        pasos.push({

            tipo: "restar",

            numero:
                acumulado,

            producto:
                multiplicacion,

            respuesta:
                resta,

            texto:
                `Resta ${acumulado} - ${multiplicacion}.`

        });


        acumulado =
            resta;


        /*
            Si todavía quedan cifras,
            bajamos la siguiente.
        */

        if (
            i < digitos.length - 1
        ) {

            const siguiente =
                digitos[i + 1];


            pasos.push({

                tipo: "bajar",

                numero:
                    siguiente,

                respuesta:
                    resta * 10 +
                    siguiente,

                texto:
                    `Baja el ${siguiente}.`

            });

        }


        indiceCociente++;

    }


    estado.pasos =
        pasos;

}


/* =========================================================
   MOSTRAR DIVISIÓN
========================================================= */

function mostrarDivision() {

    divisorHTML.textContent =
        estado.divisor;


    dividendoHTML.textContent =
        estado.dividendo;


    cocienteHTML.textContent =
        "";


    procedimientoHTML.innerHTML =
        "";

}


/* =========================================================
   MOSTRAR PASO
========================================================= */

function mostrarPaso() {

    const paso =
        estado.pasos[
            estado.pasoActual
        ];


    if (!paso) {

        terminarDivision();

        return;

    }


    estado.respondido = false;


    numeroPaso.textContent =
        estado.pasoActual + 1;


    preguntaPaso.textContent =
        paso.texto;


    /*
        AYUDA SEGÚN EL TIPO
    */

    if (
        paso.tipo === "dividir"
    ) {

        ayudaPaso.textContent =
            `Usa la tabla del ${estado.divisor}.`;

    }

    else if (
        paso.tipo === "multiplicar"
    ) {

        ayudaPaso.textContent =
            `${estado.divisor} × el número que encontraste.`;

    }

    else if (
        paso.tipo === "restar"
    ) {

        ayudaPaso.textContent =
            "Resta con cuidado las cantidades.";

    }

    else if (
        paso.tipo === "bajar"
    ) {

        ayudaPaso.textContent =
            "Baja la siguiente cifra del dividendo.";

    }


    entradaPaso.value =
        "";

    entradaPaso.disabled =
        false;

    btnPaso.disabled =
        false;


    feedback.classList.add(
        "oculto"
    );


    btnSiguiente.classList.add(
        "oculto"
    );


    /*
        Enfocar.
    */

    setTimeout(
        () => entradaPaso.focus(),
        100
    );

}


/* =========================================================
   COMPROBAR PASO
========================================================= */

function comprobarPaso() {

    if (
        estado.respondido
    ) {

        return;

    }


    if (
        entradaPaso.value.trim() === ""
    ) {

        mostrarFeedback(

            "⚠️",

            "Escribe una respuesta",

            "Primero escribe el número que corresponde."

        );

        entradaPaso.focus();

        return;

    }


    const valor =
        Number(
            entradaPaso.value
        );


    const paso =
        estado.pasos[
            estado.pasoActual
        ];


    /*
        La respuesta correcta
        depende del tipo de paso.
    */

    let correcta;


    if (
        paso.tipo === "dividir"
    ) {

        correcta =
            paso.respuesta;

    }

    else if (
        paso.tipo === "multiplicar"
    ) {

        correcta =
            paso.respuesta;

    }

    else if (
        paso.tipo === "restar"
    ) {

        correcta =
            paso.respuesta;

    }

    else if (
        paso.tipo === "bajar"
    ) {

        correcta =
            paso.respuesta;

    }


    /*
        CORRECTO
    */

    if (
        valor === correcta
    ) {

        pasoCorrecto(
            paso
        );

    }

    /*
        INCORRECTO
    */

    else {

        pasoIncorrecto(
            correcta,
            paso
        );

    }

}


/* =========================================================
   PASO CORRECTO
========================================================= */

function pasoCorrecto(paso) {

    estado.respondido =
        true;


    entradaPaso.disabled =
        true;

    btnPaso.disabled =
        true;


    estado.puntos += 5;

    estado.racha++;


    /*
        Actualizar dibujo.
    */

    dibujarPasoCorrecto(
        paso
    );


    mostrarFeedback(

        "🎉",

        "¡Muy bien!",

        obtenerMensajeCorrecto(
            paso
        )

    );


    actualizarInterfaz();


    btnSiguiente.classList.remove(
        "oculto"
    );

}


/* =========================================================
   PASO INCORRECTO
========================================================= */

function pasoIncorrecto(
    correcta,
    paso
) {

    estado.respondido =
        true;


    entradaPaso.disabled =
        true;

    btnPaso.disabled =
        true;


    estado.vidas--;

    estado.racha = 0;


    mostrarFeedback(

        "💡",

        "Vamos a aprender",

        `La respuesta correcta es ${correcta}. Observa cómo continúa la operación.`

    );


    actualizarInterfaz();


    /*
        Mostrar respuesta correcta
        en la operación.
    */

    dibujarPasoCorrecto(
        paso
    );


    /*
        Si todavía tiene vidas,
        puede continuar.
    */

    if (
        estado.vidas > 0
    ) {

        btnSiguiente.classList.remove(
            "oculto"
        );

    }

    else {

        setTimeout(
            () => finalizarJuego(),
            1800
        );

    }

}


/* =========================================================
   MENSAJES CORRECTOS
========================================================= */

function obtenerMensajeCorrecto(
    paso
) {

    if (
        paso.tipo === "dividir"
    ) {

        return `¡${paso.respuesta} es correcto!`;

    }


    if (
        paso.tipo === "multiplicar"
    ) {

        return `¡Muy bien! ${estado.divisor} × ${paso.numero} = ${paso.respuesta}.`;

    }


    if (
        paso.tipo === "restar"
    ) {

        return `¡Excelente! El resultado de la resta es ${paso.respuesta}.`;

    }


    if (
        paso.tipo === "bajar"
    ) {

        return `¡Perfecto! Bajaste correctamente la cifra.`;

    }


    return "¡Muy bien!";

}


/* =========================================================
   DIBUJAR PASO
========================================================= */

function dibujarPasoCorrecto(
    paso
) {

    /*
        DIVIDIR

        Añadimos el número al cociente.
    */

    if (
        paso.tipo === "dividir"
    ) {

        cocienteHTML.textContent +=
            paso.respuesta;

        cocienteHTML.classList.add(
            "animar"
        );

        setTimeout(
            () => {
                cocienteHTML.classList.remove(
                    "animar"
                );
            },
            300
        );

    }


    /*
        MULTIPLICAR
    */

    if (
        paso.tipo === "multiplicar"
    ) {

        procedimientoHTML.innerHTML += `

            <div class="linea-operacion">

                -${paso.respuesta}

            </div>

        `;

    }


    /*
        RESTAR
    */

    if (
        paso.tipo === "restar"
    ) {

        procedimientoHTML.innerHTML += `

            <div class="linea-operacion resta-linea">

                ${paso.respuesta}

            </div>

        `;

    }


    /*
        BAJAR
    */

    if (
        paso.tipo === "bajar"
    ) {

        procedimientoHTML.innerHTML += `

            <div class="linea-operacion">

                ↓ ${paso.numero}

            </div>

        `;

    }

}


/* =========================================================
   SIGUIENTE PASO
========================================================= */

function siguientePaso() {

    /*
        Si se terminaron los pasos.
    */

    if (
        estado.pasoActual >=
        estado.pasos.length - 1
    ) {

        terminarDivision();

        return;

    }


    estado.pasoActual++;


    mostrarPaso();

}


/* =========================================================
   TERMINAR DIVISIÓN
========================================================= */

function terminarDivision() {

    /*
        Mostrar cociente completo.
    */

    cocienteHTML.textContent =
        estado.cociente;


    /*
        Punto extra por completar.
    */

    estado.puntos += 10;


    estado.aciertos++;


    actualizarInterfaz();


    mostrarFeedback(

        "🏆",

        "¡División terminada!",

        `${estado.dividendo} ÷ ${estado.divisor} = ${estado.cociente}. ¡Hiciste toda la operación!`

    );


    /*
        Si era el último ejercicio.
    */

    if (
        estado.ejercicio >=
        CONFIG.ejerciciosPorPartida
    ) {

        btnSiguiente.classList.add(
            "oculto"
        );


        setTimeout(
            () => finalizarJuego(),
            1500
        );

        return;

    }


    /*
        Cambiar texto del botón.
    */

    btnSiguiente.textContent =
        "Siguiente división →";


    btnSiguiente.classList.remove(
        "oculto"
    );


    /*
        Cambiamos comportamiento temporalmente.
    */

    btnSiguiente.onclick =
        siguienteDivision;

}


/* =========================================================
   SIGUIENTE DIVISIÓN
========================================================= */

function siguienteDivision() {

    estado.ejercicio++;


    btnSiguiente.onclick =
        siguientePaso;


    btnSiguiente.textContent =
        "Siguiente paso →";


    generarDivision();


    actualizarInterfaz();

}


/* =========================================================
   FEEDBACK
========================================================= */

function mostrarFeedback(
    icono,
    titulo,
    texto
) {

    feedbackIcono.textContent =
        icono;


    feedbackTitulo.textContent =
        titulo;


    feedbackTexto.textContent =
        texto;


    feedback.classList.remove(
        "oculto"
    );

}


/* =========================================================
   ACTUALIZAR INTERFAZ
========================================================= */

function actualizarInterfaz() {

    puntosHTML.textContent =
        estado.puntos;


    rachaHTML.textContent =
        estado.racha;


    /*
        Corazones.
    */

    let corazones = "";


    for (
        let i = 0;
        i < CONFIG.vidasIniciales;
        i++
    ) {

        if (
            i < estado.vidas
        ) {

            corazones += "❤️";

        }

        else {

            corazones += "🖤";

        }

    }


    vidasHTML.textContent =
        corazones;


    ejercicioActualHTML.textContent =
        estado.ejercicio;

}


/* =========================================================
   FINAL
========================================================= */

function finalizarJuego() {

    puntajeFinal.textContent =
        estado.puntos;


    /*
        Rendimiento.
    */

    const porcentaje =
        (
            estado.aciertos /
            CONFIG.ejerciciosPorPartida
        ) * 100;


    if (
        porcentaje >= 100
    ) {

        mensajeFinal.textContent =
            "🏆 ¡Perfecto! Hiciste todas las divisiones.";

    }

    else if (
        porcentaje >= 80
    ) {

        mensajeFinal.textContent =
            "🌟 ¡Excelente! Estás aprendiendo muy rápido.";

    }

    else if (
        porcentaje >= 60
    ) {

        mensajeFinal.textContent =
            "👏 ¡Muy bien! Sigue practicando.";

    }

    else {

        mensajeFinal.textContent =
            "💪 No te rindas. La práctica te ayudará a mejorar.";

    }


    modalFinal.classList.remove(
        "oculto"
    );

}


/* =========================================================
   REINICIAR
========================================================= */

function reiniciarJuego() {

    estado = {

        ejercicio: 1,

        puntos: 0,

        racha: 0,

        vidas:
            CONFIG.vidasIniciales,

        aciertos: 0,

        divisor: 4,

        dividendo: 1608,

        cociente: 402,

        digitosCociente: [],

        pasos: [],

        pasoActual: 0,

        respondido: false

    };


    modalFinal.classList.add(
        "oculto"
    );


    generarDivision();


    actualizarInterfaz();

}


/* =========================================================
   VOLVER
========================================================= */

function volverInicio() {

    window.location.href =
        "index.html";

}


/* =========================================================
   VOZ
========================================================= */

btnEscuchar.addEventListener(
    "click",
    () => {

        if (
            !("speechSynthesis" in window)
        ) {

            alert(
                "Tu navegador no permite utilizar la función de voz."
            );

            return;

        }


        speechSynthesis.cancel();


        const texto =

            `Vamos a resolver una división.
            Tenemos ${estado.dividendo}
            dividido entre ${estado.divisor}.
            Recuerda:
            divide,
            multiplica,
            resta
            y baja.`;


        const voz =
            new SpeechSynthesisUtterance(
                texto
            );


        voz.lang =
            "es-ES";


        voz.rate =
            0.82;


        voz.pitch =
            1.08;


        speechSynthesis.speak(
            voz
        );

    }
);


/* =========================================================
   BOTÓN PASO
========================================================= */

btnPaso.addEventListener(
    "click",
    comprobarPaso
);


/* =========================================================
   ENTER
========================================================= */

entradaPaso.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
        ) {

            comprobarPaso();

        }

    }
);


/* =========================================================
   BOTÓN SIGUIENTE
========================================================= */

btnSiguiente.addEventListener(
    "click",
    siguientePaso
);