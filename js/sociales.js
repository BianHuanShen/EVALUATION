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
   2. BANCO DE PREGUNTAS — SOLO EDITAR ESTA SECCIÓN
   =========================================================
   =========================================================

   IMPORTANTE:

   Para agregar preguntas:

   1. Copia un bloque completo.
   2. Pégalo debajo.
   3. Cambia pregunta.
   4. Cambia opciones.
   5. Cambia correcta.

   NO necesitas modificar ninguna función del sistema.

   correcta:
   0 = primera opción
   1 = segunda opción
   2 = tercera opción
   3 = cuarta opción

   ========================================================= */

const BANCO_PREGUNTAS = [

    {
    pregunta: "¿En qué país vivimos?",
    opciones: [
        "Colombia",
        "México",
        "Argentina",
        "España"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuál es la capital de Colombia?",
    opciones: [
        "Medellín",
        "Cali",
        "Bogotá",
        "Cartagena"
    ],
    correcta: 2
},

{
    pregunta: "¿Cuáles son los colores de la bandera de Colombia?",
    opciones: [
        "Verde, blanco y rojo",
        "Amarillo, azul y rojo",
        "Azul, blanco y verde",
        "Rojo, negro y amarillo"
    ],
    correcta: 1
},

{
    pregunta: "¿Cuál de los siguientes es un símbolo patrio de Colombia?",
    opciones: [
        "La bandera",
        "El teléfono",
        "La bicicleta",
        "El cuaderno"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué debemos hacer para convivir bien con otras personas?",
    opciones: [
        "Gritar a los demás",
        "Pelear cuando estamos en desacuerdo",
        "Respetar y escuchar a los demás",
        "Ignorar las normas"
    ],
    correcta: 2
},

{
    pregunta: "¿Qué es una comunidad?",
    opciones: [
        "Un grupo de personas que comparte un lugar y algunas normas",
        "Un grupo formado solamente por animales",
        "Un lugar donde no existen normas",
        "Un grupo de objetos"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuál de estas acciones demuestra respeto en la escuela?",
    opciones: [
        "Interrumpir cuando alguien habla",
        "Escuchar a los compañeros y profesores",
        "Empujar a otros estudiantes",
        "Romper los materiales"
    ],
    correcta: 1
},

{
    pregunta: "¿Para qué sirven las normas de convivencia?",
    opciones: [
        "Para evitar que las personas aprendan",
        "Para ayudar a vivir y compartir de manera ordenada",
        "Para castigar siempre a las personas",
        "Para impedir que las personas se ayuden"
    ],
    correcta: 1
},

{
    pregunta: "¿Cuál de estos lugares pertenece a una comunidad?",
    opciones: [
        "La escuela",
        "Un juguete",
        "Una mochila",
        "Un lápiz"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué debemos hacer para cuidar los espacios públicos?",
    opciones: [
        "Botar basura en el suelo",
        "Romper las plantas",
        "Mantenerlos limpios y cuidar sus elementos",
        "Dañar los juegos"
    ],
    correcta: 2
},

{
    pregunta: "¿Cuál es el nombre del departamento donde se encuentra la ciudad de Cúcuta?",
    opciones: [
        "Norte de Santander",
        "Antioquia",
        "Valle del Cauca",
        "Cundinamarca"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuál es la moneda que se utiliza en Colombia?",
    opciones: [
        "Dólar",
        "Peso colombiano",
        "Euro",
        "Sol"
    ],
    correcta: 1
},

{
    pregunta: "¿Cuál es el nombre del río más importante de Colombia por su gran extensión?",
    opciones: [
        "Río Magdalena",
        "Río Amazonas",
        "Río Nilo",
        "Río Cauca"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué representan los colores de la bandera de Colombia?",
    opciones: [
        "Los departamentos del país",
        "Elementos relacionados con la historia y la identidad del país",
        "Los días de la semana",
        "Los meses del año"
    ],
    correcta: 1
},

{
    pregunta: "¿Quiénes forman principalmente una familia?",
    opciones: [
        "Personas que tienen vínculos familiares",
        "Solamente los profesores",
        "Solamente los vecinos",
        "Solamente los compañeros de clase"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué persona ayuda a enseñar y orientar a los estudiantes en la escuela?",
    opciones: [
        "El profesor",
        "El conductor",
        "El vendedor",
        "El deportista"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuál de estas acciones ayuda a mantener una buena convivencia?",
    opciones: [
        "Escuchar y respetar a los demás",
        "Gritar a los compañeros",
        "Romper los objetos",
        "No cumplir ninguna norma"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué debemos hacer cuando otra persona está hablando?",
    opciones: [
        "Interrumpirla constantemente",
        "Escucharla con respeto",
        "Gritar más fuerte",
        "Irnos sin escuchar"
    ],
    correcta: 1
},

{
    pregunta: "¿Cuál de estos lugares es un espacio público?",
    opciones: [
        "Un parque",
        "Un dormitorio privado",
        "Una habitación",
        "Un armario"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué podemos hacer para cuidar nuestro barrio o comunidad?",
    opciones: [
        "Botar basura en las calles",
        "Cuidar los espacios y mantenerlos limpios",
        "Dañar los parques",
        "Pintar las paredes sin permiso"
    ],
    correcta: 1
},

{
    pregunta: "¿Qué es un municipio?",
    opciones: [
        "Un territorio organizado que forma parte de un departamento",
        "Un animal de Colombia",
        "Un símbolo de la bandera",
        "Un tipo de alimento"
    ],
    correcta: 0
},

{
    pregunta: "¿Quién es el encargado de dirigir una alcaldía?",
    opciones: [
        "El alcalde",
        "El profesor",
        "El médico",
        "El conductor"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué encontramos normalmente en una ciudad?",
    opciones: [
        "Calles, edificios, parques y personas",
        "Solamente animales",
        "Solamente montañas",
        "Únicamente cultivos"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué encontramos principalmente en una zona rural?",
    opciones: [
        "Cultivos y espacios naturales",
        "Muchos edificios altos",
        "Grandes centros comerciales",
        "Muchas estaciones de metro"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuál es una actividad que se realiza en el campo?",
    opciones: [
        "Cultivar alimentos",
        "Conducir un tren de metro",
        "Trabajar en un rascacielos",
        "Construir una estación espacial"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué persona trabaja para proteger y ayudar a mantener la seguridad de la comunidad?",
    opciones: [
        "El policía",
        "El panadero",
        "El jardinero",
        "El pintor"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué debemos hacer cuando encontramos un lugar público sucio?",
    opciones: [
        "Tirar más basura",
        "Ayudar a mantenerlo limpio",
        "Romper los objetos",
        "Ignorar siempre el problema"
    ],
    correcta: 1
},

{
    pregunta: "¿Cuál de estos es un derecho de los niños?",
    opciones: [
        "Recibir educación",
        "Maltratar a otras personas",
        "Romper las normas",
        "No respetar a los demás"
    ],
    correcta: 0
},

{
    pregunta: "¿Cuál es un deber que tenemos como estudiantes?",
    opciones: [
        "Cuidar los materiales y cumplir las normas",
        "Dañar los útiles de los compañeros",
        "Interrumpir las clases",
        "No asistir nunca a clase"
    ],
    correcta: 0
},

{
    pregunta: "¿Qué debemos hacer cuando tenemos un problema con un compañero?",
    opciones: [
        "Pelear",
        "Gritar y ofender",
        "Hablar y buscar una solución pacífica",
        "Ignorarlo y causar más problemas"
    ],
    correcta: 2
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