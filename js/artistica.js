"use strict";

/* =========================================================
   =========================================================
   1. CONFIGURACIÓN
   =========================================================
   ========================================================= */

const CONFIG = {

    /*
     * Cantidad de preguntas que tendrá cada examen.
     *
     * Puedes cambiar únicamente este número.
     *
     * Ejemplo:
     * preguntasPorExamen: 20
     * preguntasPorExamen: 30
     * preguntasPorExamen: 50
     */

    preguntasPorExamen: 10,

    /*
     * Escala máxima de la nota.
     *
     * Actualmente:
     * 0 = mínimo
     * 5 = máximo
     */

    notaMaxima: 5

};


/* =========================================================
   =========================================================
   2. BANCO DE PREGUNTAS 
   =========================================================
   =========================================================

   EDUCACIÓN ARTÍSTICA — GRADO 3°

   Temas:
   - Colores primarios y secundarios
   - Mezcla de colores
   - Líneas y formas
   - Dibujo y pintura
   - Texturas
   - Materiales artísticos
   - Expresión y creatividad
   - Observación artística

   correcta:
   0 = primera opción
   1 = segunda opción
   2 = tercera opción
   3 = cuarta opción

   ========================================================= */

const BANCO_PREGUNTAS = [

{
    pregunta: "¿Cuáles son los colores primarios?",
    opciones: [
        "Rojo, amarillo y azul",
        "Verde, naranja y violeta",
        "Blanco, negro y gris",
        "Café, rosado y morado"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué color obtenemos al mezclar amarillo y azul?",
    opciones: [
        "Naranja",
        "Verde",
        "Violeta",
        "Rojo"
    ],
    correcta: 1
},

{
    pregunta: "¿Qué color obtenemos al mezclar rojo y amarillo?",
    opciones: [
        "Verde",
        "Azul",
        "Naranja",
        "Violeta"
    ],
    correcta: 2
},

{
    pregunta: "¿Qué color obtenemos al mezclar azul y rojo?",
    opciones: [
        "Violeta",
        "Verde",
        "Naranja",
        "Amarillo"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuáles son los colores secundarios?",
    opciones: [
        "Rojo, azul y amarillo",
        "Verde, naranja y violeta",
        "Blanco, negro y gris",
        "Azul, verde y amarillo"
    ],
    correcta: 1
},

{
    pregunta: "¿Qué colores se necesitan para obtener el color verde?",
    opciones: [
        "Rojo y amarillo",
        "Azul y rojo",
        "Amarillo y azul",
        "Negro y blanco"
    ],
    correcta: 2
},

{
    pregunta: "¿Qué colores se necesitan para obtener el color naranja?",
    opciones: [
        "Rojo y amarillo",
        "Azul y amarillo",
        "Rojo y azul",
        "Verde y azul"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué colores se necesitan para obtener el color violeta?",
    opciones: [
        "Amarillo y azul",
        "Rojo y azul",
        "Rojo y amarillo",
        "Verde y amarillo"
    ],
    correcta: 1
},

{
    pregunta: "¿Cuál de estos es un color cálido?",
    opciones: [
        "Azul",
        "Verde",
        "Rojo",
        "Violeta"
    ],
    correcta: 2
},

{
    pregunta: "¿Cuál de estos es un color frío?",
    opciones: [
        "Rojo",
        "Naranja",
        "Amarillo",
        "Azul"
    ],
    correcta: 3
},

{
    pregunta: "¿Cuáles de estos colores suelen considerarse cálidos?",
    opciones: [
        "Rojo, naranja y amarillo",
        "Azul, verde y violeta",
        "Negro, blanco y gris",
        "Verde, azul y amarillo"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuáles de estos colores suelen considerarse fríos?",
    opciones: [
        "Rojo y naranja",
        "Amarillo y rojo",
        "Azul, verde y violeta",
        "Naranja y amarillo"
    ],
    correcta: 2
},

{
    pregunta: "¿Qué sucede cuando agregamos blanco a un color?",
    opciones: [
        "El color se vuelve más claro",
        "El color desaparece",
        "El color se vuelve negro",
        "El color se convierte en azul"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué sucede cuando agregamos negro a un color?",
    opciones: [
        "Se vuelve más claro",
        "Se vuelve más oscuro",
        "Se convierte en blanco",
        "Desaparece"
    ],
    correcta: 1
},

{
    pregunta: "¿Qué elemento utilizamos para pintar sobre una hoja?",
    opciones: [
        "Pintura",
        "Regla solamente",
        "Borrador solamente",
        "Tijeras solamente"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuál de estos materiales puede utilizarse para pintar?",
    opciones: [
        "Temperas",
        "Pegamento solamente",
        "Regla",
        "Sacapuntas"
    ],
    correcta: 0
},

{
    pregunta: "¿Para qué sirve un pincel?",
    opciones: [
        "Para pintar",
        "Para cortar papel",
        "Para borrar",
        "Para medir"
    ],
    correcta: 0
},

{
    pregunta: "¿Para qué sirve un lápiz en una actividad artística?",
    opciones: [
        "Para dibujar y hacer trazos",
        "Para pegar papel",
        "Para cortar cartón",
        "Para lavar los pinceles"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué herramienta podemos utilizar para borrar un dibujo hecho con lápiz?",
    opciones: [
        "Pincel",
        "Borrador",
        "Tijeras",
        "Pegamento"
    ],
    correcta: 1
},

{
    pregunta: "¿Qué elemento puede utilizarse para realizar un dibujo con líneas rectas?",
    opciones: [
        "Regla",
        "Pincel mojado",
        "Pegamento",
        "Borrador"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuál de estas es una línea recta?",
    opciones: [
        "Una línea que no cambia de dirección",
        "Una línea que forma ondas",
        "Una línea con muchos círculos",
        "Una línea en forma de espiral"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuál de estas es una línea curva?",
    opciones: [
        "Una línea completamente recta",
        "Una línea que cambia suavemente de dirección",
        "Una línea formada solamente por puntos",
        "Una línea que no existe"
    ],
    correcta: 1
},

{
    pregunta: "¿Qué tipo de línea parece una ola?",
    opciones: [
        "Línea ondulada",
        "Línea recta",
        "Línea vertical",
        "Línea horizontal"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué tipo de línea puede parecerse a un rayo?",
    opciones: [
        "Línea curva",
        "Línea quebrada",
        "Línea circular",
        "Línea ondulada"
    ],
    correcta: 1
},

{
    pregunta: "¿Cuál de estas es una figura geométrica?",
    opciones: [
        "Círculo",
        "Nube",
        "Mancha de pintura",
        "Hoja natural"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuál de estas figuras tiene tres lados?",
    opciones: [
        "Círculo",
        "Cuadrado",
        "Triángulo",
        "Rectángulo"
    ],
    correcta: 2
},

{
    pregunta: "¿Cuál de estas figuras tiene cuatro lados iguales?",
    opciones: [
        "Triángulo",
        "Círculo",
        "Cuadrado",
        "Óvalo"
    ],
    correcta: 2
},

{
    pregunta: "¿Qué figura tiene forma parecida a una pelota?",
    opciones: [
        "Círculo",
        "Cuadrado",
        "Triángulo",
        "Rectángulo"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué es una textura en el arte?",
    opciones: [
        "La apariencia o sensación de una superficie",
        "Un tipo de color primario",
        "Una herramienta para cortar",
        "Una figura de cuatro lados"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuál de estos objetos puede tener una textura áspera?",
    opciones: [
        "Una piedra",
        "Un vidrio perfectamente liso",
        "Una hoja de papel nueva",
        "Un espejo"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuál de estos materiales tiene una textura suave?",
    opciones: [
        "Lija",
        "Piedra",
        "Algodón",
        "Arena"
    ],
    correcta: 2
},

{
    pregunta: "¿Qué podemos utilizar para crear un collage?",
    opciones: [
        "Recortes de papel, fotografías y otros materiales",
        "Solamente agua",
        "Solamente una regla",
        "Solamente un borrador"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué es un collage?",
    opciones: [
        "Una composición creada uniendo diferentes materiales o imágenes",
        "Una mezcla de colores únicamente",
        "Un dibujo que solo utiliza lápiz",
        "Una figura geométrica"
    ],
    correcta: 0
},

{
    pregunta: "¿Por qué es importante cuidar los materiales de arte?",
    opciones: [
        "Porque podemos utilizarlos correctamente y conservarlos",
        "Porque debemos esconderlos",
        "Porque nunca debemos compartirlos",
        "Porque no sirven para crear"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué debemos hacer después de utilizar pinturas y pinceles?",
    opciones: [
        "Dejarlos tirados",
        "Limpiarlos y organizarlos",
        "Romperlos",
        "Esconderlos"
    ],
    correcta: 1
},

{
    pregunta: "¿Qué significa ser creativo?",
    opciones: [
        "Crear ideas y formas nuevas de expresar algo",
        "Copiar siempre el trabajo de otra persona",
        "No tener ninguna idea",
        "Utilizar únicamente un color"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué puede expresar una obra artística?",
    opciones: [
        "Ideas, sentimientos o emociones",
        "Solamente números",
        "Solamente operaciones matemáticas",
        "Nada"
    ],
    correcta: 0
},

{
    pregunta: "Si quieres representar alegría en un dibujo, ¿qué puedes hacer?",
    opciones: [
        "Utilizar colores y formas que transmitan alegría",
        "Romper la hoja",
        "No dibujar nada",
        "Borrar todo"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué debemos hacer cuando observamos el dibujo de un compañero?",
    opciones: [
        "Burlarnos si es diferente",
        "Respetar y valorar su creación",
        "Romperlo",
        "Decir que nuestro dibujo es mejor"
    ],
    correcta: 1
},

{
    pregunta: "¿Cuál es una buena actitud durante una actividad artística?",
    opciones: [
        "Experimentar, crear y respetar las ideas de los demás",
        "Burlarse de los trabajos",
        "No dejar trabajar a los compañeros",
        "Romper los materiales"
    ],
    correcta: 0
}

];


/* =========================================================
   =========================================================
   FIN DEL BANCO DE PREGUNTAS
   =========================================================
   ========================================================= */
   /* =========================================================
   3. ESTADO DEL EXAMEN
   ========================================================= */

const estado = {

    preguntas: [],

    preguntaActual: 0,

    respuestasUsuario: [],

    examenFinalizado: false,

    respuestaSeleccionada: false,

    resultados: null

};


/* =========================================================
   4. REFERENCIAS A LA INTERFAZ
   ========================================================= */

const UI = {

    pantallaInicio:
        document.getElementById("pantallaInicio"),

    pantallaExamen:
        document.getElementById("pantallaExamen"),

    pantallaResultados:
        document.getElementById("pantallaResultados"),

    pantallaDetalles:
        document.getElementById("pantallaDetalles"),

    pantallaError:
        document.getElementById("pantallaError"),

    cantidadPreguntasInicio:
        document.getElementById("cantidadPreguntasInicio"),

    btnComenzar:
        document.getElementById("btnComenzar"),

    numeroPregunta:
        document.getElementById("numeroPregunta"),

    totalPreguntas:
        document.getElementById("totalPreguntas"),

    numeroPreguntaTarjeta:
        document.getElementById("numeroPreguntaTarjeta"),

    textoPregunta:
        document.getElementById("textoPregunta"),

    contenedorRespuestas:
        document.getElementById("contenedorRespuestas"),

    porcentajeProgreso:
        document.getElementById("porcentajeProgreso"),

    barraProgreso:
        document.getElementById("barraProgreso"),

    questionCard:
        document.getElementById("questionCard"),

    feedbackRespuesta:
        document.getElementById("feedbackRespuesta"),

    resultadoPorcentaje:
        document.getElementById("resultadoPorcentaje"),

    resultadoCorrectas:
        document.getElementById("resultadoCorrectas"),

    resultadoTotal:
        document.getElementById("resultadoTotal"),

    resultadoCorrectasCard:
        document.getElementById("resultadoCorrectasCard"),

    resultadoIncorrectas:
        document.getElementById("resultadoIncorrectas"),

    resultadoNota:
        document.getElementById("resultadoNota"),

    scoreProgress:
        document.getElementById("scoreProgress"),

    iconoResultado:
        document.getElementById("iconoResultado"),

    btnDetalles:
        document.getElementById("btnDetalles"),

    btnNuevoIntento:
        document.getElementById("btnNuevoIntento"),

    btnVolverResultados:
        document.getElementById("btnVolverResultados"),

    btnNuevoIntentoDetalles:
        document.getElementById("btnNuevoIntentoDetalles"),

    listaDetalles:
        document.getElementById("listaDetalles"),

    mensajeError:
        document.getElementById("mensajeError"),

    btnRecargarError:
        document.getElementById("btnRecargarError"),

    anioActual:
        document.getElementById("anioActual")

};


/* =========================================================
   5. VALIDACIÓN DEL BANCO
   ========================================================= */

function validarBancoPreguntas() {

    const errores = [];

    if (!Array.isArray(BANCO_PREGUNTAS)) {

        errores.push(
            "El banco de preguntas no tiene un formato válido."
        );

        return errores;
    }

    if (BANCO_PREGUNTAS.length === 0) {

        errores.push(
            "No existen preguntas disponibles en el banco."
        );

        return errores;
    }


    BANCO_PREGUNTAS.forEach((pregunta, indice) => {

        const numero = indice + 1;


        if (
            !pregunta ||
            typeof pregunta !== "object"
        ) {

            errores.push(
                `La pregunta ${numero} no tiene un formato válido.`
            );

            return;
        }


        if (
            typeof pregunta.pregunta !== "string" ||
            pregunta.pregunta.trim() === ""
        ) {

            errores.push(
                `La pregunta ${numero} no contiene texto.`
            );
        }


        if (!Array.isArray(pregunta.opciones)) {

            errores.push(
                `La pregunta ${numero} no tiene un arreglo de opciones.`
            );

            return;
        }


        if (pregunta.opciones.length !== 4) {

            errores.push(
                `La pregunta ${numero} debe tener exactamente 4 opciones.`
            );
        }


        pregunta.opciones.forEach((opcion, opcionIndex) => {

            if (
                typeof opcion !== "string" ||
                opcion.trim() === ""
            ) {

                errores.push(
                    `La pregunta ${numero} tiene una opción vacía en la posición ${opcionIndex + 1}.`
                );
            }

        });


        if (
            !Number.isInteger(pregunta.correcta) ||
            pregunta.correcta < 0 ||
            pregunta.correcta >= pregunta.opciones.length
        ) {

            errores.push(
                `La respuesta correcta de la pregunta ${numero} no es válida.`
            );
        }

    });


    if (
        !Number.isInteger(CONFIG.preguntasPorExamen) ||
        CONFIG.preguntasPorExamen <= 0
    ) {

        errores.push(
            "La cantidad de preguntas del examen debe ser un número entero mayor que cero."
        );
    }


    if (
        BANCO_PREGUNTAS.length > 0 &&
        Number.isInteger(CONFIG.preguntasPorExamen) &&
        CONFIG.preguntasPorExamen > BANCO_PREGUNTAS.length
    ) {

        errores.push(
            `El examen solicita ${CONFIG.preguntasPorExamen} preguntas, pero el banco solamente contiene ${BANCO_PREGUNTAS.length}.`
        );
    }


    if (
        !Number.isFinite(CONFIG.notaMaxima) ||
        CONFIG.notaMaxima <= 0
    ) {

        errores.push(
            "La nota máxima debe ser un número mayor que cero."
        );
    }


    return errores;
}


/* =========================================================
   6. ALEATORIZACIÓN
   ========================================================= */

/*
 * Fisher-Yates.
 *
 * Permite realizar una mezcla realmente uniforme
 * de los elementos de un arreglo.
 */

function mezclarArreglo(arreglo) {

    const resultado = [...arreglo];

    for (
        let i = resultado.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [
            resultado[i],
            resultado[j]
        ] = [
            resultado[j],
            resultado[i]
        ];

    }

    return resultado;
}


/*
 * Selecciona una cantidad determinada de preguntas
 * y además mezcla sus opciones.
 */

function generarExamen() {

    const preguntasSeleccionadas =
        mezclarArreglo(BANCO_PREGUNTAS)
            .slice(0, CONFIG.preguntasPorExamen);


    return preguntasSeleccionadas.map(
        preguntaOriginal => {

            /*
             * Creamos una estructura nueva.
             *
             * Así nunca modificamos el banco original.
             */

            const opcionesConIndice =
                preguntaOriginal.opciones.map(
                    (texto, indiceOriginal) => ({
                        texto,
                        indiceOriginal
                    })
                );


            /*
             * Mezclamos las respuestas.
             */

            const opcionesMezcladas =
                mezclarArreglo(opcionesConIndice);


            /*
             * Buscamos en qué posición quedó
             * la respuesta correcta después
             * de mezclar las opciones.
             */

            const nuevaCorrecta =
                opcionesMezcladas.findIndex(
                    opcion =>
                        opcion.indiceOriginal ===
                        preguntaOriginal.correcta
                );


            return {

                pregunta:
                    preguntaOriginal.pregunta,

                opciones:
                    opcionesMezcladas.map(
                        opcion => opcion.texto
                    ),

                correcta:
                    nuevaCorrecta

            };

        }
    );

}


/* =========================================================
   7. GESTIÓN DE PANTALLAS
   ========================================================= */

function mostrarPantalla(pantalla) {

    const pantallas = [
        UI.pantallaInicio,
        UI.pantallaExamen,
        UI.pantallaResultados,
        UI.pantallaDetalles,
        UI.pantallaError
    ];


    pantallas.forEach(elemento => {

        elemento.classList.add("hidden");

    });


    pantalla.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   8. INICIO DEL SISTEMA
   ========================================================= */

function inicializarSistema() {

    UI.anioActual.textContent =
        new Date().getFullYear();


    const errores =
        validarBancoPreguntas();


    if (errores.length > 0) {

        mostrarError(errores);

        return;
    }


    UI.cantidadPreguntasInicio.textContent =
        CONFIG.preguntasPorExamen;


    UI.btnComenzar.disabled = false;

}


/* =========================================================
   9. MOSTRAR ERROR
   ========================================================= */

function mostrarError(errores) {

    const mensaje = errores
        .map(error => `• ${error}`)
        .join("\n");


    UI.mensajeError.innerHTML =
        mensaje.replace(/\n/g, "<br>");


    UI.btnComenzar.disabled = true;

    mostrarPantalla(UI.pantallaError);

}


/* =========================================================
   10. INICIAR EXAMEN
   ========================================================= */

function iniciarExamen() {

    const errores =
        validarBancoPreguntas();


    if (errores.length > 0) {

        mostrarError(errores);

        return;
    }


    /*
     * Generamos un examen completamente nuevo.
     */

    estado.preguntas =
        generarExamen();


    estado.preguntaActual = 0;

    estado.respuestasUsuario =
        new Array(estado.preguntas.length)
            .fill(null);

    estado.examenFinalizado = false;

    estado.respuestaSeleccionada = false;

    estado.resultados = null;


    UI.totalPreguntas.textContent =
        estado.preguntas.length;


    mostrarPantalla(UI.pantallaExamen);

    mostrarPregunta();

}


/* =========================================================
   11. MOSTRAR PREGUNTA
   ========================================================= */

function mostrarPregunta() {

    if (
        estado.preguntaActual >=
        estado.preguntas.length
    ) {

        finalizarExamen();

        return;
    }


    estado.respuestaSeleccionada = false;


    const pregunta =
        estado.preguntas[
            estado.preguntaActual
        ];


    const numero =
        estado.preguntaActual + 1;

    const total =
        estado.preguntas.length;


    UI.numeroPregunta.textContent =
        numero;

    UI.numeroPreguntaTarjeta.textContent =
        String(numero).padStart(2, "0");

    UI.totalPreguntas.textContent =
        total;

    UI.textoPregunta.textContent =
        pregunta.pregunta;


    actualizarProgreso();

    generarRespuestas(pregunta);

    UI.feedbackRespuesta.className =
        "feedback hidden";

    UI.feedbackRespuesta.textContent = "";


    /*
     * Reiniciamos la animación de la tarjeta.
     */

    UI.questionCard.classList.remove(
        "question-changing"
    );

    void UI.questionCard.offsetWidth;

}


/* =========================================================
   12. GENERAR RESPUESTAS
   ========================================================= */

function generarRespuestas(pregunta) {

    UI.contenedorRespuestas.innerHTML = "";


    const letras = [
        "A",
        "B",
        "C",
        "D"
    ];


    pregunta.opciones.forEach(
        (opcion, indice) => {

            const boton =
                document.createElement("button");


            boton.type = "button";

            boton.className =
                "answer-button";


            boton.dataset.indice =
                indice;


            const letra =
                document.createElement("span");

            letra.className =
                "answer-letter";

            letra.textContent =
                letras[indice];


            const texto =
                document.createElement("span");

            texto.className =
                "answer-text";

            texto.textContent =
                opcion;


            boton.appendChild(letra);
            boton.appendChild(texto);


            boton.addEventListener(
                "click",
                () => seleccionarRespuesta(indice)
            );


            UI.contenedorRespuestas.appendChild(
                boton
            );

        }
    );

}


/* =========================================================
   13. SELECCIONAR RESPUESTA
   ========================================================= */

function seleccionarRespuesta(indiceSeleccionado) {

    /*
     * Evita que el usuario pueda seleccionar
     * más de una respuesta.
     */

    if (estado.respuestaSeleccionada) {
        return;
    }


    estado.respuestaSeleccionada = true;


    const pregunta =
        estado.preguntas[
            estado.preguntaActual
        ];


    const esCorrecta =
        indiceSeleccionado ===
        pregunta.correcta;


    /*
     * Guardamos exactamente qué opción
     * seleccionó el usuario.
     */

    estado.respuestasUsuario[
        estado.preguntaActual
    ] = {
        seleccionada: indiceSeleccionado,
        correcta: esCorrecta
    };


    /*
     * Bloqueamos todos los botones.
     */

    const botones =
        UI.contenedorRespuestas
            .querySelectorAll(".answer-button");


    botones.forEach(
        boton => {

            boton.classList.add("disabled");

            boton.disabled = true;

        }
    );


    /*
     * Marcamos visualmente la respuesta.
     */

    const botonSeleccionado =
        botones[indiceSeleccionado];


    if (esCorrecta) {

        botonSeleccionado.classList.add(
            "selected-correct"
        );

        mostrarFeedback(
            "correct",
            "✓ Respuesta correcta"
        );

    } else {

        botonSeleccionado.classList.add(
            "selected-incorrect"
        );


        /*
         * También mostramos cuál era
         * la respuesta correcta.
         */

        botones[pregunta.correcta]
            .classList.add(
                "selected-correct"
            );


        mostrarFeedback(
            "incorrect",
            `✕ Respuesta incorrecta. La respuesta correcta era: ${pregunta.opciones[pregunta.correcta]}`
        );

    }


    /*
     * Si no es la última pregunta,
     * avanzamos automáticamente.
     */

    const esUltimaPregunta =
        estado.preguntaActual ===
        estado.preguntas.length - 1;


    if (!esUltimaPregunta) {

        setTimeout(
            avanzarPregunta,
            750
        );

    } else {

        /*
         * En la última pregunta NO avanzamos.
         * Mostramos el botón para enviar.
         */

        mostrarBotonFinalizar();

    }

}


/* =========================================================
   14. FEEDBACK
   ========================================================= */

function mostrarFeedback(tipo, mensaje) {

    UI.feedbackRespuesta.className =
        `feedback ${tipo}`;

    UI.feedbackRespuesta.textContent =
        mensaje;

}


/* =========================================================
   15. BOTÓN FINALIZAR
   ========================================================= */

function mostrarBotonFinalizar() {

    const botonEnviar =
        document.createElement("button");


    botonEnviar.type = "button";

    botonEnviar.id =
        "btnEnviarEvaluacion";

    botonEnviar.className =
        "btn btn-primary";

    botonEnviar.textContent =
        "ENVIAR EVALUACIÓN →";


    botonEnviar.addEventListener(
        "click",
        finalizarExamen
    );


    /*
     * Lo colocamos debajo de las respuestas.
     */

    UI.contenedorRespuestas.appendChild(
        botonEnviar
    );


    setTimeout(() => {

        botonEnviar.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 100);

}


/* =========================================================
   16. SIGUIENTE PREGUNTA
   ========================================================= */

function avanzarPregunta() {

    if (
        estado.preguntaActual >=
        estado.preguntas.length - 1
    ) {

        finalizarExamen();

        return;
    }


    UI.questionCard.classList.add(
        "question-changing"
    );


    setTimeout(() => {

        estado.preguntaActual++;

        mostrarPregunta();

    }, 180);

}


/* =========================================================
   17. PROGRESO
   ========================================================= */

function actualizarProgreso() {

    const total =
        estado.preguntas.length;


    const numero =
        estado.preguntaActual + 1;


    const porcentaje =
        (numero / total) * 100;


    UI.porcentajeProgreso.textContent =
        `${Math.round(porcentaje)}%`;


    UI.barraProgreso.style.width =
        `${porcentaje}%`;

}


/* =========================================================
   18. CALIFICACIÓN
   ========================================================= */

function calcularResultados() {

    const total =
        estado.preguntas.length;


    const correctas =
        estado.respuestasUsuario
            .filter(
                respuesta =>
                    respuesta &&
                    respuesta.correcta
            )
            .length;


    const incorrectas =
        total - correctas;


    const porcentaje =
        total > 0
            ? (correctas / total) * 100
            : 0;


    /*
     * Fórmula:
     *
     * nota = (correctas / total) * notaMaxima
     */

    const nota =
        total > 0
            ? (correctas / total) *
              CONFIG.notaMaxima
            : 0;


    return {

        total,

        correctas,

        incorrectas,

        porcentaje,

        nota

    };

}


/* =========================================================
   19. FINALIZAR EXAMEN
   ========================================================= */

function finalizarExamen() {

    if (estado.examenFinalizado) {
        return;
    }


    /*
     * Seguridad adicional:
     * no permitimos finalizar sin haber
     * respondido todas las preguntas.
     */

    const todasRespondidas =
        estado.respuestasUsuario
            .every(
                respuesta => respuesta !== null
            );


    if (!todasRespondidas) {

        return;
    }


    estado.examenFinalizado = true;


    estado.resultados =
        calcularResultados();


    mostrarResultados();

}


/* =========================================================
   20. MOSTRAR RESULTADOS
   ========================================================= */

function mostrarResultados() {

    const resultado =
        estado.resultados;


    UI.resultadoCorrectas.textContent =
        resultado.correctas;

    UI.resultadoTotal.textContent =
        resultado.total;

    UI.resultadoCorrectasCard.textContent =
        resultado.correctas;

    UI.resultadoIncorrectas.textContent =
        resultado.incorrectas;


    UI.resultadoNota.textContent =
        resultado.nota.toFixed(1);


    UI.resultadoPorcentaje.textContent =
        "0%";


    /*
     * Reiniciamos el círculo antes de animarlo.
     */

    UI.scoreProgress.style.strokeDashoffset =
        "326.73";


    if (
        resultado.porcentaje >= 60
    ) {

        UI.iconoResultado.textContent =
            "✓";

    } else {

        UI.iconoResultado.textContent =
            "!";
    }


    mostrarPantalla(
        UI.pantallaResultados
    );


    /*
     * Animación del porcentaje.
     */

    animarPorcentaje(
        resultado.porcentaje
    );


    /*
     * Animación del círculo.
     */

    requestAnimationFrame(() => {

        const circunferencia =
            2 * Math.PI * 52;

        const offset =
            circunferencia -
            (
                resultado.porcentaje /
                100
            ) *
            circunferencia;


        UI.scoreProgress.style.strokeDashoffset =
            offset;

    });

}


/* =========================================================
   21. ANIMACIÓN DEL PORCENTAJE
   ========================================================= */

function animarPorcentaje(valorFinal) {

    const duracion = 900;

    const inicio = performance.now();


    function actualizar(tiempoActual) {

        const progreso =
            Math.min(
                (tiempoActual - inicio) /
                duracion,
                1
            );


        /*
         * Easing suave.
         */

        const easing =
            1 -
            Math.pow(
                1 - progreso,
                3
            );


        const valor =
            valorFinal * easing;


        UI.resultadoPorcentaje.textContent =
            `${Math.round(valor)}%`;


        if (progreso < 1) {

            requestAnimationFrame(
                actualizar
            );

        }

    }


    requestAnimationFrame(
        actualizar
    );

}


/* =========================================================
   22. RESULTADOS DETALLADOS
   ========================================================= */

function mostrarDetalles() {

    UI.listaDetalles.innerHTML = "";


    estado.preguntas.forEach(
        (pregunta, indice) => {

            const respuesta =
                estado.respuestasUsuario[indice];


            const correcta =
                respuesta.correcta;


            const tarjeta =
                document.createElement("article");


            tarjeta.className =
                `detail-card ${
                    correcta
                        ? "correct"
                        : "incorrect"
                }`;


            tarjeta.style.animationDelay =
                `${indice * 30}ms`;


            const numero =
                String(indice + 1)
                    .padStart(2, "0");


            const estadoTexto =
                correcta
                    ? "✓ CORRECTA"
                    : "✕ INCORRECTA";


            const respuestaSeleccionada =
                pregunta.opciones[
                    respuesta.seleccionada
                ];


            const respuestaCorrecta =
                pregunta.opciones[
                    pregunta.correcta
                ];


            tarjeta.innerHTML = `

                <div class="detail-top">

                    <span class="detail-number">
                        PREGUNTA ${numero}
                    </span>

                    <span class="detail-status">
                        ${estadoTexto}
                    </span>

                </div>

                <div class="detail-question">
                    ${escaparHTML(
                        pregunta.pregunta
                    )}
                </div>

                <div class="detail-answer">

                    <div class="
                        detail-answer-box
                        selected
                    ">

                        <span>
                            TU RESPUESTA
                        </span>

                        <strong>
                            ${escaparHTML(
                                respuestaSeleccionada
                            )}
                        </strong>

                    </div>

                    <div class="
                        detail-answer-box
                        correct-answer
                    ">

                        <span>
                            RESPUESTA CORRECTA
                        </span>

                        <strong>
                            ${escaparHTML(
                                respuestaCorrecta
                            )}
                        </strong>

                    </div>

                </div>

            `;


            UI.listaDetalles.appendChild(
                tarjeta
            );

        }
    );


    mostrarPantalla(
        UI.pantallaDetalles
    );

}


/* =========================================================
   23. PROTECCIÓN DE HTML
   ========================================================= */

function escaparHTML(texto) {

    const elemento =
        document.createElement("div");


    elemento.textContent =
        texto;


    return elemento.innerHTML;

}


/* =========================================================
   24. NUEVO INTENTO
   ========================================================= */

function nuevoIntento() {

    /*
     * Limpiamos completamente el estado.
     */

    estado.preguntas = [];

    estado.preguntaActual = 0;

    estado.respuestasUsuario = [];

    estado.examenFinalizado = false;

    estado.respuestaSeleccionada = false;

    estado.resultados = null;


    /*
     * Reiniciamos elementos visuales.
     */

    UI.barraProgreso.style.width =
        "0%";

    UI.porcentajeProgreso.textContent =
        "0%";


    /*
     * Generamos un examen completamente
     * diferente.
     */

    iniciarExamen();

}


/* =========================================================
   25. EVENTOS
   ========================================================= */

UI.btnComenzar.addEventListener(
    "click",
    iniciarExamen
);


UI.btnDetalles.addEventListener(
    "click",
    mostrarDetalles
);


UI.btnNuevoIntento.addEventListener(
    "click",
    nuevoIntento
);


UI.btnNuevoIntentoDetalles.addEventListener(
    "click",
    nuevoIntento
);


UI.btnVolverResultados.addEventListener(
    "click",
    () => {

        mostrarPantalla(
            UI.pantallaResultados
        );

    }
);


UI.btnRecargarError.addEventListener(
    "click",
    () => {

        window.location.reload();

    }
);


/* =========================================================
   26. INICIALIZACIÓN
   ========================================================= */

inicializarSistema();