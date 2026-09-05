"use strict";

/*
=========================================================
    AVENTURAS DE LAS TABLAS
    JAVASCRIPT PRINCIPAL

    SISTEMA DE DESBLOQUEO PROGRESIVO

    Tabla 1 → desbloqueada inicialmente
    Tabla 2 → requiere 10/10 en tabla 1
    Tabla 3 → requiere 10/10 en tabla 2
    ...
    Tabla 10 → requiere 10/10 en tabla 9

    Funciona en:
    ✔ PC
    ✔ Celular
    ✔ Tablet

    No necesita librerías externas.
=========================================================
*/


/* =====================================================
   CONFIGURACIÓN
   ===================================================== */

const CONFIG = {

    // Preguntas por partida
    preguntasPorPartida: 10,

    // Vidas iniciales
    vidasIniciales: 3,

    // Tablas que queremos reforzar
    tablasImportantes: [4, 5, 6, 7, 8, 9],

    // Puntos por respuesta correcta
    puntosCorrectos: 10,

    // Monedas por respuesta correcta
    monedasCorrectas: 2,

    // Total de tablas
    totalTablas: 10

};


/* =====================================================
   ESTADO DEL JUEGO
   ===================================================== */

let estado = {

    tabla: 1,

    pregunta: 0,

    aciertos: 0,

    puntos: 0,

    monedas: 0,

    racha: 0,

    vidas: CONFIG.vidasIniciales,

    operacion: null,

    jugando: false

};


/* =====================================================
   PROGRESO GUARDADO
   =====================================================

   NUEVO SISTEMA:

   {
       desbloqueada: 1,

       estrellas: {
           1: 3,
           2: 2,
           3: 1
       }
   }

   "desbloqueada" indica hasta qué tabla
   puede acceder.

   "estrellas" guarda el mejor resultado
   obtenido en cada tabla.

   ===================================================== */


/* =====================================================
   CARGAR PROGRESO
   ===================================================== */

let progresoGuardado = null;

try {

    progresoGuardado =
        JSON.parse(
            localStorage.getItem(
                "progresoTablasKaori"
            )
        );

} catch (error) {

    progresoGuardado = null;

}


/* =====================================================
   MIGRACIÓN DEL SISTEMA ANTERIOR
   =====================================================

   Si el juego anterior tenía:

   {
       "1": 3,
       "2": 2
   }

   lo convertimos automáticamente a:

   {
       desbloqueada: 3,
       estrellas: {
           1: 3,
           2: 2
       }
   }

   ===================================================== */

let progreso;


/* Si no existe progreso */

if (!progresoGuardado) {

    progreso = {

        desbloqueada: 1,

        estrellas: {}

    };

}


/* Si existe el nuevo formato */

else if (
    progresoGuardado.desbloqueada !== undefined &&
    progresoGuardado.estrellas !== undefined
) {

    progreso = progresoGuardado;

}


/* Si existe el formato antiguo */

else {

    progreso = {

        desbloqueada: 1,

        estrellas: {}

    };


    /*
    Copiamos las estrellas antiguas.
    */

    for (
        let i = 1;
        i <= CONFIG.totalTablas;
        i++
    ) {

        if (
            progresoGuardado[i]
        ) {

            progreso.estrellas[i] =
                Number(
                    progresoGuardado[i]
                );

        }

    }


    /*
    Calculamos hasta qué tabla
    debería estar desbloqueada.

    Una tabla se considera superada
    solamente con 10/10.

    Como el sistema antiguo solo
    guardaba estrellas:

    3 estrellas = 10/10

    */

    let siguienteDesbloqueada = 1;


    for (
        let i = 1;
        i <= CONFIG.totalTablas;
        i++
    ) {

        if (
            progreso.estrellas[i] === 3
        ) {

            siguienteDesbloqueada = i + 1;

        } else {

            break;

        }

    }


    progreso.desbloqueada =
        Math.min(
            siguienteDesbloqueada,
            CONFIG.totalTablas
        );


    guardarProgreso();

}


/* =====================================================
   ASEGURAR DATOS CORRECTOS
   ===================================================== */

if (
    !progreso.estrellas ||
    typeof progreso.estrellas !== "object"
) {

    progreso.estrellas = {};

}


if (
    !progreso.desbloqueada ||
    progreso.desbloqueada < 1
) {

    progreso.desbloqueada = 1;

}


if (
    progreso.desbloqueada >
    CONFIG.totalTablas
) {

    progreso.desbloqueada =
        CONFIG.totalTablas;

}


/* =====================================================
   REFERENCIAS HTML
   ===================================================== */

const pantallas =
    document.querySelectorAll(
        ".pantalla"
    );


const pantallaInicio =
    document.getElementById(
        "pantallaInicio"
    );


const pantallaMapa =
    document.getElementById(
        "pantallaMapa"
    );


const pantallaJuego =
    document.getElementById(
        "pantallaJuego"
    );


const pantallaResultado =
    document.getElementById(
        "pantallaResultado"
    );


const pantallaTablas =
    document.getElementById(
        "pantallaTablas"
    );


const btnJugar =
    document.getElementById(
        "btnJugar"
    );


const btnTablas =
    document.getElementById(
        "btnTablas"
    );


const btnReiniciar =
    document.getElementById(
        "btnReiniciar"
    );


const progresoTexto =
    document.getElementById(
        "progresoTexto"
    );


const barraInicio =
    document.getElementById(
        "barraInicio"
    );


const tablaJuego =
    document.getElementById(
        "tablaJuego"
    );


const vidasElemento =
    document.getElementById(
        "vidas"
    );


const puntosElemento =
    document.getElementById(
        "puntos"
    );


const rachaElemento =
    document.getElementById(
        "racha"
    );


const monedasElemento =
    document.getElementById(
        "monedas"
    );


const contadorPregunta =
    document.getElementById(
        "contadorPregunta"
    );


const barraPregunta =
    document.getElementById(
        "barraPregunta"
    );


const personaje =
    document.getElementById(
        "personaje"
    );


const burbuja =
    document.getElementById(
        "burbuja"
    );


const operacion =
    document.getElementById(
        "operacion"
    );


const respuestas =
    document.getElementById(
        "respuestas"
    );


const btnSiguiente =
    document.getElementById(
        "btnSiguiente"
    );


const tituloResultado =
    document.getElementById(
        "tituloResultado"
    );


const textoResultado =
    document.getElementById(
        "textoResultado"
    );


const resultadoAciertos =
    document.getElementById(
        "resultadoAciertos"
    );


const resultadoPuntos =
    document.getElementById(
        "resultadoPuntos"
    );


const modalGameOver =
    document.getElementById(
        "modalGameOver"
    );


const btnReintentar =
    document.getElementById(
        "btnReintentar"
    );


const btnGameOverMapa =
    document.getElementById(
        "btnGameOverMapa"
    );


const btnRepetir =
    document.getElementById(
        "btnRepetir"
    );


const btnMapaResultado =
    document.getElementById(
        "btnMapaResultado"
    );


const tablaAprenderNumero =
    document.getElementById(
        "tablaAprenderNumero"
    );


const listaTabla =
    document.getElementById(
        "listaTabla"
    );


const btnVoz =
    document.getElementById(
        "btnVoz"
    );


/* =====================================================
   GUARDAR PROGRESO
   ===================================================== */

function guardarProgreso() {

    try {

        localStorage.setItem(
            "progresoTablasKaori",
            JSON.stringify(progreso)
        );

    } catch (error) {

        console.warn(
            "No se pudo guardar el progreso.",
            error
        );

    }

}


/* =====================================================
   CAMBIAR DE PANTALLA
   ===================================================== */

function mostrarPantalla(id) {

    pantallas.forEach(
        pantalla => {

            pantalla.classList.remove(
                "activa"
            );

        }
    );


    const pantalla =
        document.getElementById(id);


    if (pantalla) {

        pantalla.classList.add(
            "activa"
        );

    }

}


/* =====================================================
   BOTÓN JUGAR
   ===================================================== */

if (btnJugar) {

    btnJugar.addEventListener(
        "click",
        () => {

            mostrarPantalla(
                "pantallaMapa"
            );

            actualizarMapa();

        }
    );

}


/* =====================================================
   BOTÓN VER TABLAS
   ===================================================== */

if (btnTablas) {

    btnTablas.addEventListener(
        "click",
        () => {

            mostrarPantalla(
                "pantallaTablas"
            );

            mostrarTablaAprender(4);

        }
    );

}


/* =====================================================
   BOTONES VOLVER
   ===================================================== */

document
    .querySelectorAll(
        "[data-volver]"
    )
    .forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    mostrarPantalla(
                        boton.dataset.volver
                    );

                }
            );

        }
    );


/* =====================================================
   ACTUALIZAR PROGRESO INICIAL
   ===================================================== */

function actualizarProgresoInicio() {

    let completadas = 0;


    /*
    Una tabla cuenta como completada
    cuando consiguió 10/10.

    Eso equivale a 3 estrellas.
    */

    for (
        let i = 1;
        i <= CONFIG.totalTablas;
        i++
    ) {

        if (
            Number(
                progreso.estrellas[i]
            ) === 3
        ) {

            completadas++;

        }

    }


    if (progresoTexto) {

        progresoTexto.textContent =
            `${completadas} / ${CONFIG.totalTablas}`;

    }


    if (barraInicio) {

        barraInicio.style.width =
            `${(
                completadas /
                CONFIG.totalTablas
            ) * 100}%`;

    }

}


/* =====================================================
   ACTUALIZAR MAPA
   ===================================================== */

function actualizarMapa() {

    actualizarProgresoInicio();


    const niveles =
        document.querySelectorAll(
            ".nivel"
        );


    niveles.forEach(
        nivel => {

            const numero =
                Number(
                    nivel.dataset.tabla
                );


            /*
            Quitamos estados anteriores.
            */

            nivel.classList.remove(
                "bloqueado",
                "completado",
                "actual"
            );


            /*
            Permitimos o bloqueamos
            el botón según el progreso.
            */

            if (
                numero <=
                progreso.desbloqueada
            ) {

                /*
                TABLA DESBLOQUEADA
                */

                nivel.disabled = false;


                /*
                Estrellas.
                */

                const estrellas =
                    Number(
                        progreso.estrellas[numero]
                    ) || 0;


                const elementoEstrellas =
                    nivel.querySelector(
                        ".estrellas"
                    );


                if (elementoEstrellas) {

                    elementoEstrellas.textContent =
                        "★".repeat(estrellas) +
                        "☆".repeat(
                            3 - estrellas
                        );

                }


                /*
                Si tiene 3 estrellas,
                la marcamos como completada.
                */

                if (
                    estrellas === 3
                ) {

                    nivel.classList.add(
                        "completado"
                    );

                }


                /*
                Tabla que está actualmente
                disponible para avanzar.
                */

                if (
                    numero ===
                    progreso.desbloqueada
                ) {

                    nivel.classList.add(
                        "actual"
                    );

                }

            }

            else {

                /*
                TABLA BLOQUEADA
                */

                nivel.disabled = true;

                nivel.classList.add(
                    "bloqueado"
                );


                const elementoEstrellas =
                    nivel.querySelector(
                        ".estrellas"
                    );


                if (elementoEstrellas) {

                    elementoEstrellas.textContent =
                        "🔒";

                }

            }

        }
    );

}


/* =====================================================
   SELECCIONAR TABLA
   ===================================================== */

document
    .querySelectorAll(
        ".nivel"
    )
    .forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    const tabla =
                        Number(
                            boton.dataset.tabla
                        );


                    /*
                    SEGURIDAD:
                    No permitimos entrar a
                    tablas bloqueadas.
                    */

                    if (
                        tabla >
                        progreso.desbloqueada
                    ) {

                        mostrarMensajeBloqueo(
                            tabla
                        );

                        return;

                    }


                    iniciarJuego(
                        tabla
                    );

                }
            );

        }
    );


/* =====================================================
   MENSAJE DE TABLA BLOQUEADA
   ===================================================== */

function mostrarMensajeBloqueo(
    tabla
) {

    const anterior =
        tabla - 1;


    alert(
        `🔒 TABLA DEL ${tabla} BLOQUEADA\n\n` +
        `Primero debes completar la tabla del ${anterior} ` +
        `con 10 respuestas correctas de 10.\n\n` +
        `💪 ¡Tú puedes!`
    );

}


/* =====================================================
   INICIAR JUEGO
   ===================================================== */

function iniciarJuego(tabla) {

    /*
    Seguridad adicional.
    */

    if (
        tabla >
        progreso.desbloqueada
    ) {

        mostrarMensajeBloqueo(
            tabla
        );

        return;

    }


    /*
    Reiniciamos estado.
    */

    estado = {

        tabla: tabla,

        pregunta: 0,

        aciertos: 0,

        puntos: 0,

        monedas: 0,

        racha: 0,

        vidas:
            CONFIG.vidasIniciales,

        operacion: null,

        jugando: true

    };


    /*
    Cerramos Game Over
    por seguridad.
    */

    if (modalGameOver) {

        modalGameOver.classList.add(
            "oculto"
        );

    }


    /*
    Mostramos pantalla.
    */

    mostrarPantalla(
        "pantallaJuego"
    );


    /*
    Mostramos número de tabla.
    */

    if (tablaJuego) {

        tablaJuego.textContent =
            tabla;

    }


    /*
    Actualizamos interfaz.
    */

    actualizarInterfaz();


    /*
    Generamos primera pregunta.
    */

    nuevaPregunta();

}


/* =====================================================
   GENERAR NÚMERO ALEATORIO
   ===================================================== */

function aleatorio(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


/* =====================================================
   GENERAR NUEVA PREGUNTA
   ===================================================== */

function nuevaPregunta() {

    if (!estado.jugando) {

        return;

    }


    /*
    Si completamos las 10 preguntas.
    */

    if (
        estado.pregunta >=
        CONFIG.preguntasPorPartida
    ) {

        terminarPartida();

        return;

    }


    /*
    Ocultamos botón siguiente
    mientras aparece la nueva pregunta.
    */

    if (btnSiguiente) {

        btnSiguiente.classList.add(
            "oculto"
        );

    }


    /*
    Aumentamos pregunta.
    */

    estado.pregunta++;


    /*
    Tabla seleccionada.
    */

    const a =
        estado.tabla;


    /*
    Segundo factor.
    */

    const b =
        aleatorio(0, 10);


    /*
    Guardamos operación.
    */

    estado.operacion = {

        a: a,

        b: b,

        respuesta: a * b

    };


    /*
    Mostramos operación.
    */

    if (operacion) {

        operacion.textContent =
            `${a} × ${b} = ?`;

    }


    /*
    Contador.
    */

    if (contadorPregunta) {

        contadorPregunta.textContent =
            `${estado.pregunta} / ${CONFIG.preguntasPorPartida}`;

    }


    /*
    Barra de progreso.
    */

    if (barraPregunta) {

        barraPregunta.style.width =
            `${(
                estado.pregunta /
                CONFIG.preguntasPorPartida
            ) * 100}%`;

    }


    /*
    Generamos respuestas.
    */

    generarRespuestas();


    /*
    Mensaje.
    */

    mensajesMotivadores();

}


/* =====================================================
   GENERAR RESPUESTAS
   ===================================================== */

function generarRespuestas() {

    if (!respuestas) {

        return;

    }


    respuestas.innerHTML = "";


    const correcta =
        estado.operacion.respuesta;


    const opciones =
        new Set();


    /*
    Respuesta correcta.
    */

    opciones.add(
        correcta
    );


    /*
    Creamos respuestas falsas.
    */

    while (
        opciones.size < 4
    ) {

        let falsa;


        /*
        Para tablas importantes
        usamos opciones razonables.

        Para las demás también mantenemos
        dificultad sencilla.
        */

        if (
            CONFIG.tablasImportantes.includes(
                estado.tabla
            )
        ) {

            falsa =
                correcta +
                aleatorio(-10, 10);

        }

        else {

            falsa =
                correcta +
                aleatorio(-8, 8);

        }


        /*
        Evitamos negativos.
        */

        if (
            falsa < 0
        ) {

            falsa =
                Math.abs(falsa);

        }


        /*
        Evitamos duplicados.
        */

        if (
            falsa !== correcta
        ) {

            opciones.add(
                falsa
            );

        }

    }


    /*
    Convertimos y mezclamos.
    */

    const lista =
        [...opciones];


    mezclar(lista);


    /*
    Creamos botones.
    */

    lista.forEach(
        (numero, indice) => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.className =
                "respuesta";


            boton.textContent =
                numero;


            /*
            Número de opción.
            */

            boton.dataset.indice =
                indice + 1;


            /*
            Click / toque.
            */

            boton.addEventListener(
                "click",
                () => {

                    comprobarRespuesta(
                        numero,
                        boton
                    );

                }
            );


            respuestas.appendChild(
                boton
            );

        }
    );

}


/* =====================================================
   MEZCLAR ARRAY
   ===================================================== */

function mezclar(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

}


/* =====================================================
   COMPROBAR RESPUESTA
   ===================================================== */

function comprobarRespuesta(
    respuesta,
    boton
) {

    if (!estado.jugando) {

        return;

    }


    /*
    Desactivamos todas las respuestas.
    */

    document
        .querySelectorAll(
            ".respuesta"
        )
        .forEach(
            b => {

                b.disabled = true;

            }
        );


    /*
    Comprobamos.
    */

    if (
        respuesta ===
        estado.operacion.respuesta
    ) {

        respuestaCorrecta(
            boton
        );

    }

    else {

        respuestaIncorrecta(
            boton
        );

    }

}


/* =====================================================
   RESPUESTA CORRECTA
   ===================================================== */

function respuestaCorrecta(
    boton
) {

    if (boton) {

        boton.classList.add(
            "correcta"
        );

    }


    /*
    Acierto.
    */

    estado.aciertos++;


    /*
    Racha.
    */

    estado.racha++;


    /*
    Puntos.
    */

    let puntos =
        CONFIG.puntosCorrectos;


    /*
    Bonus por racha.
    */

    if (
        estado.racha >= 3
    ) {

        puntos += 5;

    }


    estado.puntos +=
        puntos;


    /*
    Monedas.
    */

    estado.monedas +=
        CONFIG.monedasCorrectas;


    /*
    Animación personaje.
    */

    if (personaje) {

        personaje.classList.remove(
            "incorrecto"
        );

        personaje.classList.add(
            "correcto"
        );

    }


    /*
    Mensaje.
    */

    if (burbuja) {

        if (
            estado.racha >= 5
        ) {

            burbuja.textContent =
                "🔥 ¡INCREÍBLE!";

        }

        else if (
            estado.racha >= 3
        ) {

            burbuja.textContent =
                "⭐ ¡Qué buena racha!";

        }

        else {

            burbuja.textContent =
                "🎉 ¡Muy bien!";

        }

    }


    /*
    Sonido.
    */

    sonidoCorrecto();


    /*
    Actualizamos interfaz.
    */

    actualizarInterfaz();


    /*
    Mostramos siguiente.
    */

    if (btnSiguiente) {

        btnSiguiente.classList.remove(
            "oculto"
        );


        if (
            estado.pregunta >=
            CONFIG.preguntasPorPartida
        ) {

            btnSiguiente.textContent =
                "🏆 VER RESULTADO";

        }

        else {

            btnSiguiente.textContent =
                "SIGUIENTE →";

        }

    }

}


/* =====================================================
   RESPUESTA INCORRECTA
   ===================================================== */

function respuestaIncorrecta(
    boton
) {

    if (boton) {

        boton.classList.add(
            "incorrecta"
        );

    }


    /*
    Marcamos la correcta.
    */

    document
        .querySelectorAll(
            ".respuesta"
        )
        .forEach(
            b => {

                if (
                    Number(
                        b.textContent
                    ) ===
                    estado.operacion.respuesta
                ) {

                    b.classList.add(
                        "correcta"
                    );

                }

            }
        );


    /*
    Quitamos vida.
    */

    estado.vidas--;


    /*
    Reiniciamos racha.
    */

    estado.racha = 0;


    /*
    Mensaje.
    */

    if (burbuja) {

        burbuja.textContent =
            `💡 Era ${estado.operacion.respuesta}`;

    }


    /*
    Animación.
    */

    if (personaje) {

        personaje.classList.remove(
            "correcto"
        );

        personaje.classList.add(
            "incorrecto"
        );

    }


    /*
    Sonido.
    */

    sonidoIncorrecto();


    /*
    Actualizamos.
    */

    actualizarInterfaz();


    /*
    GAME OVER
    */

    if (
        estado.vidas <= 0
    ) {

        setTimeout(
            mostrarGameOver,
            800
        );

        return;

    }


    /*
    Permitir continuar.
    */

    if (btnSiguiente) {

        btnSiguiente.classList.remove(
            "oculto"
        );


        if (
            estado.pregunta >=
            CONFIG.preguntasPorPartida
        ) {

            btnSiguiente.textContent =
                "🏆 VER RESULTADO";

        }

        else {

            btnSiguiente.textContent =
                "SIGUIENTE →";

        }

    }

}


/* =====================================================
   BOTÓN SIGUIENTE
   ===================================================== */

if (btnSiguiente) {

    btnSiguiente.addEventListener(
        "click",
        () => {

            btnSiguiente.classList.add(
                "oculto"
            );


            if (personaje) {

                personaje.classList.remove(
                    "correcto",
                    "incorrecto"
                );

            }


            nuevaPregunta();

        }
    );

}


/* =====================================================
   ACTUALIZAR INTERFAZ
   ===================================================== */

function actualizarInterfaz() {

    if (puntosElemento) {

        puntosElemento.textContent =
            estado.puntos;

    }


    if (rachaElemento) {

        rachaElemento.textContent =
            estado.racha;

    }


    if (monedasElemento) {

        monedasElemento.textContent =
            estado.monedas;

    }


    if (vidasElemento) {

        vidasElemento.textContent =
            "❤️".repeat(
                Math.max(
                    0,
                    estado.vidas
                )
            ) +
            "🖤".repeat(
                Math.max(
                    0,
                    CONFIG.vidasIniciales -
                    estado.vidas
                )
            );

    }

}


/* =====================================================
   MENSAJES MOTIVADORES
   ===================================================== */

function mensajesMotivadores() {

    const mensajes = [

        "¡Tú puedes! 💪",

        "¡Piensa con calma! 🧠",

        "¡Vamos campeón! ⭐",

        "¡Lee bien la multiplicación! 👀",

        "¡Cada pregunta te hace más fuerte! 🚀",

        "¡Confía en ti! 🌟",

        "¡Tú eres capaz! 🔥",

        "¡Vamos por la siguiente! 🎯",

        "¡Excelente esfuerzo! 🏆"

    ];


    if (burbuja) {

        burbuja.textContent =
            mensajes[
                aleatorio(
                    0,
                    mensajes.length - 1
                )
            ];

    }

}


/* =====================================================
   TERMINAR PARTIDA
   ===================================================== */

function terminarPartida() {

    estado.jugando = false;


    /*
    Calculamos estrellas.

    10/10 = 3 estrellas
    7-9 = 2 estrellas
    5-6 = 1 estrella
    0-4 = 0 estrellas
    */

    let estrellas = 0;


    if (
        estado.aciertos >= 5
    ) {

        estrellas = 1;

    }


    if (
        estado.aciertos >= 7
    ) {

        estrellas = 2;

    }


    if (
        estado.aciertos >= 10
    ) {

        estrellas = 3;

    }


    /*
    Guardamos el mejor resultado.
    */

    const anterior =
        Number(
            progreso.estrellas[
                estado.tabla
            ]
        ) || 0;


    if (
        estrellas > anterior
    ) {

        progreso.estrellas[
            estado.tabla
        ] = estrellas;

    }


    /* =================================================
       DESBLOQUEO
       =================================================

       MUY IMPORTANTE:

       Solamente con 10/10 se desbloquea
       la siguiente tabla.

       Ejemplo:

       Tabla 1 → 10/10 → Tabla 2 🔓

       Tabla 2 → 10/10 → Tabla 3 🔓

       etc.

       ================================================= */

    let tablaDesbloqueada = false;


    if (
        estado.aciertos ===
        CONFIG.preguntasPorPartida
    ) {

        /*
        Solo desbloqueamos si estamos
        jugando la última tabla disponible.
        */

        if (
            estado.tabla ===
            progreso.desbloqueada
        ) {

            if (
                progreso.desbloqueada <
                CONFIG.totalTablas
            ) {

                progreso.desbloqueada++;

                tablaDesbloqueada = true;

            }

        }

    }


    /*
    Guardamos SIEMPRE el progreso.
    */

    guardarProgreso();


    /*
    Mostramos resultado.
    */

    mostrarResultado(
        estrellas,
        tablaDesbloqueada
    );

}


/* =====================================================
   MOSTRAR RESULTADO
   ===================================================== */

function mostrarResultado(
    estrellas,
    tablaDesbloqueada = false
) {

    mostrarPantalla(
        "pantallaResultado"
    );


    if (resultadoAciertos) {

        resultadoAciertos.textContent =
            `${estado.aciertos}/${CONFIG.preguntasPorPartida}`;

    }


    if (resultadoPuntos) {

        resultadoPuntos.textContent =
            estado.puntos;

    }


    /*
    Estrella 1.
    */

    const estrella1 =
        document.getElementById(
            "estrella1"
        );


    if (estrella1) {

        estrella1.textContent =
            estrellas >= 1
                ? "★"
                : "☆";

    }


    /*
    Estrella 2.
    */

    const estrella2 =
        document.getElementById(
            "estrella2"
        );


    if (estrella2) {

        estrella2.textContent =
            estrellas >= 2
                ? "★"
                : "☆";

    }


    /*
    Estrella 3.
    */

    const estrella3 =
        document.getElementById(
            "estrella3"
        );


    if (estrella3) {

        estrella3.textContent =
            estrellas >= 3
                ? "★"
                : "☆";

    }


    /*
    Mensaje según resultado.
    */

    if (
        estrellas === 3
    ) {

        if (tituloResultado) {

            tituloResultado.textContent =
                "🏆 ¡PERFECTO!";

        }


        if (textoResultado) {

            if (
                tablaDesbloqueada
            ) {

                if (
                    estado.tabla <
                    CONFIG.totalTablas
                ) {

                    textoResultado.textContent =
                        `🎉 ¡Dominaste la tabla del ${estado.tabla}! ` +
                        `🔓 ¡La tabla del ${estado.tabla + 1} está desbloqueada!`;

                }

                else {

                    textoResultado.textContent =
                        "👑 ¡INCREÍBLE! ¡Has completado todas las tablas del 1 al 10!";

                }

            }

            else {

                textoResultado.textContent =
                    "¡Dominaste esta tabla!";

            }

        }

    }

    else if (
        estrellas === 2
    ) {

        if (tituloResultado) {

            tituloResultado.textContent =
                "⭐ ¡MUY BIEN!";

        }


        if (textoResultado) {

            textoResultado.textContent =
                "Ya casi eres un experto. ¡Necesitas 10/10 para desbloquear la siguiente tabla!";

        }

    }

    else if (
        estrellas === 1
    ) {

        if (tituloResultado) {

            tituloResultado.textContent =
                "💪 ¡BUEN TRABAJO!";

        }


        if (textoResultado) {

            textoResultado.textContent =
                "Sigue practicando. ¡Consigue 10/10 para desbloquear la siguiente tabla!";

        }

    }

    else {

        if (tituloResultado) {

            tituloResultado.textContent =
                "🌟 ¡SIGUE INTENTANDO!";

        }


        if (textoResultado) {

            textoResultado.textContent =
                "La práctica te ayudará a aprender. ¡Vuelve a intentarlo!";

        }

    }


    sonidoResultado();

}


/* =====================================================
   GAME OVER
   ===================================================== */

function mostrarGameOver() {

    estado.jugando = false;


    if (modalGameOver) {

        modalGameOver.classList.remove(
            "oculto"
        );

    }

}


/* =====================================================
   REINTENTAR GAME OVER
   ===================================================== */

if (btnReintentar) {

    btnReintentar.addEventListener(
        "click",
        () => {

            if (modalGameOver) {

                modalGameOver.classList.add(
                    "oculto"
                );

            }


            iniciarJuego(
                estado.tabla
            );

        }
    );

}


/* =====================================================
   VOLVER AL MAPA GAME OVER
   ===================================================== */

if (btnGameOverMapa) {

    btnGameOverMapa.addEventListener(
        "click",
        () => {

            if (modalGameOver) {

                modalGameOver.classList.add(
                    "oculto"
                );

            }


            mostrarPantalla(
                "pantallaMapa"
            );


            actualizarMapa();

        }
    );

}


/* =====================================================
   REPETIR PARTIDA
   ===================================================== */

if (btnRepetir) {

    btnRepetir.addEventListener(
        "click",
        () => {

            iniciarJuego(
                estado.tabla
            );

        }
    );

}


/* =====================================================
   VOLVER AL MAPA DESDE RESULTADO
   ===================================================== */

if (btnMapaResultado) {

    btnMapaResultado.addEventListener(
        "click",
        () => {

            mostrarPantalla(
                "pantallaMapa"
            );


            actualizarMapa();

        }
    );

}


/* =====================================================
   BOTÓN SALIR DEL JUEGO
   ===================================================== */

const btnSalir =
    document.getElementById(
        "btnSalir"
    );


if (btnSalir) {

    btnSalir.addEventListener(
        "click",
        () => {

            estado.jugando = false;


            mostrarPantalla(
                "pantallaMapa"
            );


            actualizarMapa();

        }
    );

}


/* =====================================================
   VER TABLAS
   ===================================================== */

let tablaAprender = 4;


/*
Botones 1-10.
*/

document
    .querySelectorAll(
        "[data-ver-tabla]"
    )
    .forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    const numero =
                        Number(
                            boton.dataset.verTabla
                        );


                    mostrarTablaAprender(
                        numero
                    );

                }
            );

        }
    );


/* =====================================================
   MOSTRAR TABLA
   ===================================================== */

function mostrarTablaAprender(
    numero
) {

    tablaAprender = numero;


    if (tablaAprenderNumero) {

        tablaAprenderNumero.textContent =
            numero;

    }


    if (!listaTabla) {

        return;

    }


    listaTabla.innerHTML = "";


    /*
    Del 0 al 10.
    */

    for (
        let i = 0;
        i <= 10;
        i++
    ) {

        const linea =
            document.createElement(
                "div"
            );


        linea.className =
            "linea-tabla";


        linea.textContent =
            `${numero} × ${i} = ${numero * i}`;


        listaTabla.appendChild(
            linea
        );

    }


    /*
    Marcamos botón activo.
    */

    document
        .querySelectorAll(
            "[data-ver-tabla]"
        )
        .forEach(
            boton => {

                boton.classList.toggle(
                    "activo",
                    Number(
                        boton.dataset.verTabla
                    ) === numero
                );

            }
        );

}


/* =====================================================
   ESCUCHAR TABLA
   ===================================================== */

if (btnVoz) {

    btnVoz.addEventListener(
        "click",
        () => {

            if (
                !(
                    "speechSynthesis"
                    in window
                )
            ) {

                alert(
                    "Tu navegador no permite reproducir voz."
                );

                return;

            }


            let texto =
                `Tabla del ${tablaAprender}. `;


            for (
                let i = 0;
                i <= 10;
                i++
            ) {

                texto +=
                    `${tablaAprender} por ${i} es ${tablaAprender * i}. `;

            }


            const voz =
                new SpeechSynthesisUtterance(
                    texto
                );


            voz.lang =
                "es-ES";


            voz.rate =
                0.8;


            speechSynthesis.cancel();


            speechSynthesis.speak(
                voz
            );

        }
    );

}


/* =====================================================
   TECLADO DE PC
   ===================================================== */

document.addEventListener(
    "keydown",
    evento => {

        if (
            !estado.jugando
        ) {

            return;

        }


        const numero =
            Number(
                evento.key
            );


        if (
            numero >= 1 &&
            numero <= 4
        ) {

            const boton =
                document.querySelector(
                    `.respuesta[data-indice="${numero}"]`
                );


            if (
                boton &&
                !boton.disabled
            ) {

                boton.click();

            }

        }

    }
);


/* =====================================================
   SONIDO CORRECTO
   ===================================================== */

function sonidoCorrecto() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {

            return;

        }


        const audio =
            new AudioContext();


        const oscilador =
            audio.createOscillator();


        const ganancia =
            audio.createGain();


        oscilador.connect(
            ganancia
        );


        ganancia.connect(
            audio.destination
        );


        oscilador.frequency.value =
            600;


        ganancia.gain.value =
            0.08;


        oscilador.start();


        oscilador.stop(
            audio.currentTime + 0.12
        );

    }

    catch (error) {

        /*
        Audio opcional.
        */

    }

}


/* =====================================================
   SONIDO INCORRECTO
   ===================================================== */

function sonidoIncorrecto() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {

            return;

        }


        const audio =
            new AudioContext();


        const oscilador =
            audio.createOscillator();


        const ganancia =
            audio.createGain();


        oscilador.connect(
            ganancia
        );


        ganancia.connect(
            audio.destination
        );


        oscilador.frequency.value =
            180;


        ganancia.gain.value =
            0.06;


        oscilador.start();


        oscilador.stop(
            audio.currentTime + 0.18
        );

    }

    catch (error) {

        /*
        Audio opcional.
        */

    }

}


/* =====================================================
   SONIDO RESULTADO
   ===================================================== */

function sonidoResultado() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;


        if (!AudioContext) {

            return;

        }


        const audio =
            new AudioContext();


        const oscilador =
            audio.createOscillator();


        const ganancia =
            audio.createGain();


        oscilador.connect(
            ganancia
        );


        ganancia.connect(
            audio.destination
        );


        oscilador.frequency.value =
            750;


        ganancia.gain.value =
            0.07;


        oscilador.start();


        oscilador.stop(
            audio.currentTime + 0.25
        );

    }

    catch (error) {

        /*
        Audio opcional.
        */

    }

}


/* =====================================================
   REINICIAR TODO EL PROGRESO
   ===================================================== */

if (btnReiniciar) {

    btnReiniciar.addEventListener(
        "click",
        () => {

            const confirmar =
                confirm(
                    "¿Seguro que quieres borrar TODO el progreso?\n\n" +
                    "Se bloquearán nuevamente las tablas del 2 al 10."
                );


            if (!confirmar) {

                return;

            }


            /*
            Volvemos al estado inicial.
            */

            progreso = {

                desbloqueada: 1,

                estrellas: {}

            };


            guardarProgreso();


            /*
            Actualizamos pantalla.
            */

            actualizarProgresoInicio();


            actualizarMapa();


            alert(
                "🔄 ¡Progreso reiniciado!\n\n" +
                "La tabla del 1 está desbloqueada.\n" +
                "Completa 10/10 para desbloquear la tabla del 2."
            );

        }
    );

}


/* =====================================================
   INICIO DE LA APLICACIÓN
   ===================================================== */

function iniciarAplicacion() {

    /*
    Actualizamos progreso.
    */

    actualizarProgresoInicio();


    /*
    Actualizamos mapa.
    */

    actualizarMapa();


    /*
    Mostramos tabla 4 inicialmente
    en la sección de aprendizaje.
    */

    mostrarTablaAprender(4);

}


/* =====================================================
   EJECUTAR
   ===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarAplicacion
    );

}

else {

    iniciarAplicacion();

}
