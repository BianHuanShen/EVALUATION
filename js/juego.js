"use strict";

/*
=========================================================
AVENTURAS DE LAS TABLAS
JAVASCRIPT PRINCIPAL

Este archivo controla TODO el juego.

Puedes modificar fácilmente:

- Número de preguntas.
- Vidas.
- Puntos.
- Tablas importantes.
- Mensajes.
- Dificultad.
- Velocidad.

No necesita ninguna librería externa.
=========================================================
*/


/* =====================================================
   CONFIGURACIÓN
   ===================================================== */

const CONFIG = {

    // Cantidad de preguntas por partida
    preguntasPorPartida: 10,

    // Cantidad inicial de vidas
    vidasIniciales: 3,

    // Tablas que queremos reforzar
    tablasImportantes: [4, 5, 6, 7, 8, 9],

    // Puntos por respuesta correcta
    puntosCorrectos: 10,

    // Monedas por respuesta correcta
    monedasCorrectas: 2

};


/* =====================================================
   ESTADO DEL JUEGO
   ===================================================== */

let estado = {

    // Tabla seleccionada
    tabla: 4,

    // Pregunta actual
    pregunta: 0,

    // Aciertos
    aciertos: 0,

    // Puntos
    puntos: 0,

    // Monedas
    monedas: 0,

    // Racha
    racha: 0,

    // Vidas
    vidas: CONFIG.vidasIniciales,

    // Pregunta actual
    operacion: null,

    // Juego activo
    jugando: false

};


/* =====================================================
   PROGRESO GUARDADO

   Guardamos qué tablas ya completó.

   Ejemplo:

   {
       "1": 3,
       "2": 2,
       "4": 1
   }

   3 = tres estrellas
   2 = dos estrellas
   1 = una estrella
   0 = sin completar
   ===================================================== */

let progreso =
    JSON.parse(
        localStorage.getItem(
            "progresoTablasKaori"
        )
    ) || {};


/* =====================================================
   REFERENCIAS HTML
   ===================================================== */

const pantallas =
    document.querySelectorAll(".pantalla");


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
   CAMBIAR DE PANTALLA
   ===================================================== */

function mostrarPantalla(id) {

    /*
    Ocultamos todas.
    */

    pantallas.forEach(
        pantalla => {

            pantalla.classList.remove(
                "activa"
            );

        }
    );


    /*
    Mostramos la seleccionada.
    */

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

btnJugar.addEventListener(
    "click",
    () => {

        mostrarPantalla(
            "pantallaMapa"
        );

        actualizarMapa();

    }
);


/* =====================================================
   BOTÓN VER TABLAS
   ===================================================== */

btnTablas.addEventListener(
    "click",
    () => {

        mostrarPantalla(
            "pantallaTablas"
        );

        mostrarTablaAprender(4);

    }
);


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
    Contamos tablas con al menos
    una estrella.
    */

    for (
        let i = 1;
        i <= 10;
        i++
    ) {

        if (
            progreso[i] &&
            progreso[i] > 0
        ) {

            completadas++;

        }

    }


    progresoTexto.textContent =
        `${completadas} / 10`;


    barraInicio.style.width =
        `${completadas * 10}%`;

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
            Obtenemos las estrellas.
            */

            const estrellas =
                progreso[numero] || 0;


            const elementoEstrellas =
                nivel.querySelector(
                    ".estrellas"
                );


            if (elementoEstrellas) {

                elementoEstrellas.textContent =
                    "★".repeat(estrellas) +
                    "☆".repeat(3 - estrellas);

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


                    iniciarJuego(
                        tabla
                    );

                }
            );

        }
    );


/* =====================================================
   INICIAR JUEGO
   ===================================================== */

function iniciarJuego(tabla) {

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
    Mostramos pantalla.
    */

    mostrarPantalla(
        "pantallaJuego"
    );


    /*
    Actualizamos tabla.
    */

    tablaJuego.textContent =
        tabla;


    /*
    Actualizamos interfaz.
    */

    actualizarInterfaz();


    /*
    Primera pregunta.
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
    Si ya completamos las preguntas,
    terminamos.
    */

    if (
        estado.pregunta >=
        CONFIG.preguntasPorPartida
    ) {

        terminarPartida();

        return;

    }


    /*
    Aumentamos número de pregunta.
    */

    estado.pregunta++;


    /*
    Primer factor.

    Es la tabla seleccionada.
    */

    const a =
        estado.tabla;


    /*
    Segundo factor.

    Entre 0 y 10.
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

    operacion.textContent =
        `${a} × ${b} = ?`;


    /*
    Actualizamos contador.
    */

    contadorPregunta.textContent =
        `${estado.pregunta} / ${CONFIG.preguntasPorPartida}`;


    /*
    Actualizamos barra.
    */

    barraPregunta.style.width =
        `${(
            estado.pregunta /
            CONFIG.preguntasPorPartida
        ) * 100}%`;


    /*
    Generamos respuestas.
    */

    generarRespuestas();


    /*
    Mensaje motivador.
    */

    mensajesMotivadores();

}


/* =====================================================
   GENERAR RESPUESTAS
   ===================================================== */

function generarRespuestas() {

    /*
    Limpiamos respuestas anteriores.
    */

    respuestas.innerHTML = "";


    const correcta =
        estado.operacion.respuesta;


    /*
    Usamos un Set para no repetir
    respuestas.
    */

    const opciones =
        new Set();


    /*
    Añadimos respuesta correcta.
    */

    opciones.add(
        correcta
    );


    /*
    Creamos 3 respuestas falsas.
    */

    while (
        opciones.size < 4
    ) {

        /*
        Variación pequeña alrededor
        de la respuesta correcta.

        Esto hace que las opciones
        sean razonables para una niña.
        */

        let falsa =
            correcta +
            aleatorio(-10, 10);


        /*
        No permitimos negativos.
        */

        if (falsa < 0) {

            falsa =
                Math.abs(falsa);

        }


        /*
        Evitamos que sea igual.
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
    Convertimos a array y mezclamos.
    */

    const lista =
        [...opciones];


    mezclar(lista);


    /*
    Creamos los botones.
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
            También permite utilizar
            teclado 1, 2, 3 y 4.
            */

            boton.dataset.indice =
                indice + 1;


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

    /*
    Evitamos responder dos veces.
    */

    if (!estado.jugando) {

        return;

    }


    /*
    Desactivamos todos los botones.
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
    Verificamos.
    */

    if (
        respuesta ===
        estado.operacion.respuesta
    ) {

        respuestaCorrecta(
            boton
        );

    } else {

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

    /*
    Marcamos botón.
    */

    boton.classList.add(
        "correcta"
    );


    /*
    Aumentamos estadísticas.
    */

    estado.aciertos++;

    estado.racha++;


    /*
    Puntos extra por racha.

    Cada 3 aciertos consecutivos
    obtenemos puntos adicionales.
    */

    let puntos =
        CONFIG.puntosCorrectos;


    if (
        estado.racha >= 3
    ) {

        puntos += 5;

    }


    estado.puntos +=
        puntos;


    estado.monedas +=
        CONFIG.monedasCorrectas;


    /*
    Animamos personaje.
    */

    personaje.classList.remove(
        "incorrecto"
    );

    personaje.classList.add(
        "correcto"
    );


    /*
    Mensaje.
    */

    if (
        estado.racha >= 5
    ) {

        burbuja.textContent =
            "🔥 ¡INCREÍBLE!";

    } else if (
        estado.racha >= 3
    ) {

        burbuja.textContent =
            "⭐ ¡Qué buena racha!";

    } else {

        burbuja.textContent =
            "🎉 ¡Muy bien!";

    }


    /*
    Sonido.
    */

    sonidoCorrecto();


    /*
    Actualizamos.
    */

    actualizarInterfaz();


    /*
    Mostramos botón.
    */

    btnSiguiente.classList.remove(
        "oculto"
    );


    /*
    Si es la última pregunta,
    cambiamos texto.
    */

    if (
        estado.pregunta >=
        CONFIG.preguntasPorPartida
    ) {

        btnSiguiente.textContent =
            "🏆 VER RESULTADO";

    } else {

        btnSiguiente.textContent =
            "SIGUIENTE →";

    }

}


/* =====================================================
   RESPUESTA INCORRECTA
   ===================================================== */

function respuestaIncorrecta(
    boton
) {

    /*
    Marcamos incorrecta.
    */

    boton.classList.add(
        "incorrecta"
    );


    /*
    Buscamos y marcamos
    automáticamente la correcta.
    */

    document
        .querySelectorAll(
            ".respuesta"
        )
        .forEach(
            b => {

                if (
                    Number(b.textContent) ===
                    estado.operacion.respuesta
                ) {

                    b.classList.add(
                        "correcta"
                    );

                }

            }
        );


    /*
    Quitamos una vida.
    */

    estado.vidas--;


    /*
    Reiniciamos racha.
    */

    estado.racha = 0;


    /*
    Mensaje.
    */

    burbuja.textContent =
        `💡 Era ${estado.operacion.respuesta}`;


    /*
    Animación.
    */

    personaje.classList.remove(
        "correcto"
    );

    personaje.classList.add(
        "incorrecto"
    );


    /*
    Sonido.
    */

    sonidoIncorrecto();


    /*
    Actualizamos interfaz.
    */

    actualizarInterfaz();


    /*
    Si no quedan vidas...
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
    Permitimos siguiente.
    */

    btnSiguiente.classList.remove(
        "oculto"
    );


    if (
        estado.pregunta >=
        CONFIG.preguntasPorPartida
    ) {

        btnSiguiente.textContent =
            "🏆 VER RESULTADO";

    } else {

        btnSiguiente.textContent =
            "SIGUIENTE →";

    }

}


/* =====================================================
   BOTÓN SIGUIENTE
   ===================================================== */

btnSiguiente.addEventListener(
    "click",
    () => {

        /*
        Ocultamos botón.
        */

        btnSiguiente.classList.add(
            "oculto"
        );


        /*
        Quitamos animaciones.
        */

        personaje.classList.remove(
            "correcto",
            "incorrecto"
        );


        /*
        Nueva pregunta.
        */

        nuevaPregunta();

    }
);


/* =====================================================
   ACTUALIZAR INTERFAZ
   ===================================================== */

function actualizarInterfaz() {

    puntosElemento.textContent =
        estado.puntos;


    rachaElemento.textContent =
        estado.racha;


    monedasElemento.textContent =
        estado.monedas;


    /*
    Dibujamos las vidas.
    */

    vidasElemento.textContent =
        "❤️".repeat(
            estado.vidas
        ) +
        "🖤".repeat(
            CONFIG.vidasIniciales -
            estado.vidas
        );

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

        "¡Confía en ti! 🌟"

    ];


    burbuja.textContent =
        mensajes[
            aleatorio(
                0,
                mensajes.length - 1
            )
        ];

}


/* =====================================================
   TERMINAR PARTIDA
   ===================================================== */

function terminarPartida() {

    estado.jugando = false;


    /*
    Calculamos estrellas.

    10 aciertos = 3 estrellas
    7-9 = 2 estrellas
    5-6 = 1 estrella
    menos de 5 = 0
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
        progreso[
            estado.tabla
        ] || 0;


    if (
        estrellas > anterior
    ) {

        progreso[
            estado.tabla
        ] = estrellas;


        localStorage.setItem(
            "progresoTablasKaori",
            JSON.stringify(
                progreso
            )
        );

    }


    /*
    Mostramos resultado.
    */

    mostrarResultado(
        estrellas
    );

}


/* =====================================================
   MOSTRAR RESULTADO
   ===================================================== */

function mostrarResultado(
    estrellas
) {

    mostrarPantalla(
        "pantallaResultado"
    );


    resultadoAciertos.textContent =
        `${estado.aciertos}/${CONFIG.preguntasPorPartida}`;


    resultadoPuntos.textContent =
        estado.puntos;


    /*
    Estrellas visuales.
    */

    document.getElementById(
        "estrella1"
    ).textContent =
        estrellas >= 1
            ? "★"
            : "☆";


    document.getElementById(
        "estrella2"
    ).textContent =
        estrellas >= 2
            ? "★"
            : "☆";


    document.getElementById(
        "estrella3"
    ).textContent =
        estrellas >= 3
            ? "★"
            : "☆";


    /*
    Mensaje según resultado.
    */

    if (
        estrellas === 3
    ) {

        tituloResultado.textContent =
            "🏆 ¡PERFECTO!";


        textoResultado.textContent =
            "¡Dominaste esta tabla!";

    } else if (
        estrellas === 2
    ) {

        tituloResultado.textContent =
            "⭐ ¡MUY BIEN!";


        textoResultado.textContent =
            "Ya casi eres un experto.";

    } else if (
        estrellas === 1
    ) {

        tituloResultado.textContent =
            "💪 ¡BUEN TRABAJO!";


        textoResultado.textContent =
            "Sigue practicando y mejorarás.";

    } else {

        tituloResultado.textContent =
            "🌟 ¡SIGUE INTENTANDO!";


        textoResultado.textContent =
            "La práctica te ayudará a aprender.";

    }


    sonidoResultado();

}


/* =====================================================
   GAME OVER
   ===================================================== */

function mostrarGameOver() {

    estado.jugando = false;


    modalGameOver.classList.remove(
        "oculto"
    );

}


/* =====================================================
   REINTENTAR DESDE GAME OVER
   ===================================================== */

btnReintentar.addEventListener(
    "click",
    () => {

        modalGameOver.classList.add(
            "oculto"
        );


        iniciarJuego(
            estado.tabla
        );

    }
);


/* =====================================================
   VOLVER AL MAPA DESDE GAME OVER
   ===================================================== */

btnGameOverMapa.addEventListener(
    "click",
    () => {

        modalGameOver.classList.add(
            "oculto"
        );


        mostrarPantalla(
            "pantallaMapa"
        );


        actualizarMapa();

    }
);


/* =====================================================
   REPETIR PARTIDA
   ===================================================== */

btnRepetir.addEventListener(
    "click",
    () => {

        iniciarJuego(
            estado.tabla
        );

    }
);


/* =====================================================
   VOLVER AL MAPA DESDE RESULTADO
   ===================================================== */

btnMapaResultado.addEventListener(
    "click",
    () => {

        mostrarPantalla(
            "pantallaMapa"
        );


        actualizarMapa();

    }
);


/* =====================================================
   BOTÓN SALIR DEL JUEGO
   ===================================================== */

document
    .getElementById("btnSalir")
    .addEventListener(
        "click",
        () => {

            estado.jugando = false;


            mostrarPantalla(
                "pantallaMapa"
            );


            actualizarMapa();

        }
    );


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


    tablaAprenderNumero.textContent =
        numero;


    listaTabla.innerHTML = "";


    /*
    Creamos del 0 al 10.
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
    Marcamos botón.
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

btnVoz.addEventListener(
    "click",
    () => {

        /*
        Verificamos si el navegador
        tiene síntesis de voz.
        */

        if (
            !("speechSynthesis" in window)
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


        /*
        Velocidad lenta para facilitar
        el aprendizaje.
        */

        voz.rate =
            0.8;


        speechSynthesis.cancel();

        speechSynthesis.speak(
            voz
        );

    }
);


/* =====================================================
   TECLADO DE PC
   ===================================================== */

document.addEventListener(
    "keydown",
    evento => {

        /*
        Solamente funciona si estamos jugando.
        */

        if (
            !estado.jugando
        ) {

            return;

        }


        /*
        Teclas 1, 2, 3 y 4.

        Permiten responder desde PC.
        */

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

    /*
    Creamos sonido sin archivos externos.

    Esto permite que el juego funcione
    incluso sin conexión.
    */

    try {

        const audio =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


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

    } catch (error) {

        /*
        Si el navegador bloquea audio,
        simplemente continuamos.
        */

    }

}


/* =====================================================
   SONIDO INCORRECTO
   ===================================================== */

function sonidoIncorrecto() {

    try {

        const audio =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


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

    } catch (error) {

        /* Sin sonido si el navegador lo bloquea */

    }

}


/* =====================================================
   SONIDO DE RESULTADO
   ===================================================== */

function sonidoResultado() {

    try {

        const audio =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


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

    } catch (error) {

        /* Audio opcional */

    }

}


/* =====================================================
   REINICIAR TODO EL PROGRESO
   ===================================================== */

btnReiniciar.addEventListener(
    "click",
    () => {

        const confirmar =
            confirm(
                "¿Seguro que quieres borrar todo el progreso?"
            );


        if (!confirmar) {

            return;

        }


        /*
        Borramos progreso.
        */

        progreso = {};


        localStorage.removeItem(
            "progresoTablasKaori"
        );


        actualizarProgresoInicio();


        actualizarMapa();


        alert(
            "¡Progreso reiniciado!"
        );

    }
);


/* =====================================================
   INICIO DE LA APLICACIÓN
   ===================================================== */

function iniciarAplicacion() {

    /*
    Actualizamos progreso.
    */

    actualizarProgresoInicio();


    /*
    Mostramos tabla 4 inicialmente
    porque es una de las tablas
    que queremos reforzar.
    */

    mostrarTablaAprender(4);

}


/* =====================================================
   EJECUTAR
   ===================================================== */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarAplicacion
    );

} else {

    iniciarAplicacion();

}