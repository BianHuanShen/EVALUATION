(() => {
  const $ = id => document.getElementById(id);

  const dividendoEl = $("dividendo");
  const divisorEl = $("divisor");
  const cocienteEl = $("cociente");
  const trabajoEl = $("trabajo");
  const instruccion = $("instruccion");
  const respuesta = $("respuesta");
  const comprobar = $("comprobar");
  const bajar = $("bajar");
  const nueva = $("nueva");
  const feedback = $("feedback");
  const fi = $("feedbackIcono");
  const ft = $("feedbackTitulo");
  const fx = $("feedbackTexto");
  const pasoEl = $("paso");
  const pregunta = $("pregunta");
  const explicacion = $("explicacion");
  const correctasEl = $("correctas");
  const modal = $("modal");
  const resultado = $("resultado");
  const resultadoGrande = $("resultadoGrande");

  let ejercicio = null;
  let pasoActual = null;
  let correctas = 0;

  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

  function crear() {
    const cifras = rnd(3, 5);
    const min = 10 ** (cifras - 1);
    const max = 10 ** cifras - 1;
    const dividendo = rnd(min, max);
    const divisor = rnd(1, 9);

    // Nunca generamos ni aceptamos división por cero o divisores negativos.
    if (!Number.isInteger(divisor) || divisor < 1 || divisor > 9) {
      throw new Error("El divisor debe ser un entero entre 1 y 9.");
    }

    const digitos = String(dividendo).split("").map(Number);

    // Siempre se empieza por la PRIMERA cifra del dividendo.
    // El alumno debe marcarla y, si es menor que el divisor,
    // marcar también la siguiente. Nunca se salta la primera cifra.
    const indiceInicio = 0;
    const grupo = digitos[0];

    return {
      dividendo,
      divisor,
      digitos,
      indiceInicio,
      indiceActual: indiceInicio,
      grupo,
      resto: 0,
      resultado: Math.floor(dividendo / divisor),
      restoFinal: dividendo % divisor,
      cociente: [],
      marcas: {},
      filas: [],
      fase: "seleccionar",
      terminado: false
    };
  }

  function iniciar() {
    modal.classList.add("oculto");
    ejercicio = crear();
    pasoActual = null;
    iniciarSeleccionInicial();
    dibujar();
  }

  function limpiarControles() {
    feedback.className = "feedback oculto";
    respuesta.value = "";
    respuesta.disabled = false;
    comprobar.classList.remove("oculto");
    bajar.classList.add("oculto");
    nueva.classList.add("oculto");
  }

  function iniciarSeleccionInicial() {
    ejercicio.fase = "seleccionar-inicial";
    ejercicio.indiceActual = ejercicio.indiceInicio;
    ejercicio.ultimaSeleccionInicial = -1;

    pasoActual = {
      fase: "seleccionar-inicial"
    };

    limpiarControles();
    respuesta.disabled = true;
    comprobar.classList.add("oculto");

    pasoEl.textContent = 1;
    pregunta.textContent = "Elige el grupo que vas a dividir";
    explicacion.textContent =
      "Toca una cifra del dividendo. La última cifra que marques será la que cierra el grupo.";
    instruccion.innerHTML =
      `<b>Primero elige.</b> Si la primera cifra no alcanza, marca también la siguiente.`;
  }

  function iniciarCociente() {
    ejercicio.fase = "cociente";

    const grupo = ejercicio.grupo;
    pasoActual = {
      fase: "cociente",
      grupo,
      correcta: Math.floor(grupo / ejercicio.divisor)
    };

    limpiarControles();

    pasoEl.textContent = ejercicio.cociente.length + 1;
    pregunta.textContent = `¿Cuántas veces cabe ${ejercicio.divisor} en ${grupo}?`;
    explicacion.textContent =
      `Haz ${ejercicio.divisor} × ? y la resta en tu mente. No mostraremos esas cuentas.`;
    instruccion.innerHTML =
      `<b>Escribe la cifra del cociente.</b> Después piensa la resta mentalmente.`;

    respuesta.focus();
  }

  function iniciarBajada() {
    ejercicio.fase = "bajar";

    pasoActual = {
      fase: "bajar"
    };

    respuesta.value = "";
    respuesta.disabled = true;
    comprobar.classList.add("oculto");
    bajar.classList.remove("oculto");

    pasoEl.textContent = ejercicio.cociente.length + 1;
    pregunta.textContent = "Marca la siguiente cifra y bájala";
    explicacion.textContent =
      "Toca la próxima cifra del dividendo. La marcarás con ✓ y aparecerá junto al resto.";
    instruccion.innerHTML =
      `<b>Ahora baja.</b> Marca la siguiente cifra del dividendo y después pulsa <b>“Bajar”</b>.`;
  }

  function renderDividendo() {
    const digitos = ejercicio.digitos;

    return digitos.map((digito, i) => {
      const marcada = ejercicio.marcas[i] === true;
      const siguiente = ejercicio.fase === "bajar" &&
                        i === ejercicio.indiceActual + 1 &&
                        i < digitos.length;

      const bloqueada = ejercicio.fase !== "seleccionar-inicial" &&
                        ejercicio.fase !== "bajar";

      const clases = [
        "marcador-cifra",
        marcada ? "elegida" : "",
        siguiente ? "siguiente" : "",
        bloqueada ? "bloqueada" : ""
      ].filter(Boolean).join(" ");

      return `
        <button type="button" class="${clases}"
                data-indice="${i}" aria-label="Cifra ${digito}">
          <span class="marca">${marcada ? "✓" : ""}</span>
          <span class="numero">${digito}</span>
        </button>
      `;
    }).join("");
  }

  function renderCociente() {
    const cantidad = ejercicio.digitos.length - ejercicio.indiceInicio;

    let html = "";

    for (let i = 0; i < cantidad; i++) {
      if (i < ejercicio.cociente.length) {
        html += `<span class="digito">${ejercicio.cociente[i]}</span>`;
      } else {
        html += `<span class="pendiente">·</span>`;
      }
    }

    return html;
  }

  /*
   * Este es el cambio principal:
   *
   * En vez de enseñar  "18 - 18 = 0",
   * mostramos las líneas de la división como en el cuaderno:
   *
   *     75
   *     030
   *     064
   *     04
   *
   * El resto y la cifra bajada son calculados internamente.
   */
  function renderTrabajo() {
    if (!ejercicio.filas.length) return "";

    const columnas = ejercicio.digitos.length;

    // El trabajo queda SIEMPRE debajo del dividendo, en el lado izquierdo.
    // Cada fila usa exactamente las mismas columnas que las cifras del dividendo.
    // Como .trabajo es 0.64em y el dividendo 1em, 0.86em del dividendo
    // equivale aproximadamente a 1.34375em dentro de .trabajo.
    const plantilla = `repeat(${columnas}, 1.34375em)`;

    return ejercicio.filas.map((fila, indice) => {
      const esActual = indice === ejercicio.filas.length - 1 && !ejercicio.terminado;
      const fin = Number.isInteger(fila.fin) ? fila.fin : columnas - 1;
      const texto = String(fila.texto ?? "");
      const chars = texto.split("");
      const celdas = Array(columnas).fill("");

      // Los números terminan exactamente debajo de la última cifra
      // que participa en ese paso de la división.
      const inicio = Math.max(0, fin - chars.length + 1);
      chars.forEach((c, j) => {
        const col = inicio + j;
        if (col < columnas) {
          const esUltima = j === chars.length - 1 && fila.marcada;
          celdas[col] = esUltima
            ? `<span class="cifra-bajada"><span class="marca-bajada">✓</span>${c}</span>`
            : c;
        }
      });

      const clase = [
        "fila-trabajo",
        esActual ? "actual" : "",
        fila.tipo === "resto" ? "resto-final" : ""
      ].filter(Boolean).join(" ");

      return `
        <div class="${clase}" style="display:grid;grid-template-columns:${plantilla};justify-content:end;width:${columnas * 1.34375}em;">
          ${celdas.map(c => `<span class="celda-trabajo">${c}</span>`).join("")}
        </div>
      `;
    }).join("");
  }

  function dibujar() {
    divisorEl.textContent = ejercicio.divisor;
    dividendoEl.innerHTML = renderDividendo();
    cocienteEl.innerHTML = renderCociente();
    trabajoEl.innerHTML = renderTrabajo();

    dividendoEl.querySelectorAll(".marcador-cifra").forEach(btn => {
      btn.addEventListener("click", () => {
        seleccionarCifra(Number(btn.dataset.indice));
      });
    });
  }

  function seleccionarCifra(indice) {
    if (!ejercicio) return;

    if (ejercicio.fase === "seleccionar-inicial") {
      seleccionarInicial(indice);
      return;
    }

    if (ejercicio.fase === "bajar") {
      seleccionarParaBajar(indice);
    }
  }

  function seleccionarInicial(indice) {
    // La selección es estrictamente secuencial: primero 0, luego 1, luego 2...
    // Así nunca se puede saltar la primera cifra del dividendo.
    const esperado = ejercicio.ultimaSeleccionInicial + 1;

    if (indice !== esperado) {
      msg(
        "incorrecto",
        "Sigue el orden",
        `Primero debes marcar la cifra ${ejercicio.digitos[esperado]}. No puedes saltar cifras.`
      );
      return;
    }

    const grupo = Number(
      ejercicio.digitos.slice(0, indice + 1).join("")
    );

    // Marca únicamente la cifra que el alumno acaba de tocar.
    ejercicio.marcas[indice] = true;
    ejercicio.ultimaSeleccionInicial = indice;

    if (grupo < ejercicio.divisor) {
      if (indice >= ejercicio.digitos.length - 1) {
        msg(
          "incorrecto",
          "Ese grupo no alcanza",
          `No es posible dividir ${grupo} entre ${ejercicio.divisor}.`
        );
        return;
      }

      dibujar();
      instruccion.innerHTML =
        `<b>✓ ${grupo} es menor que ${ejercicio.divisor}.</b> Ahora marca también la siguiente cifra.`;
      return;
    }

    ejercicio.indiceActual = indice;
    ejercicio.grupo = grupo;

    ejercicio.filas = [
      { tipo: "inicio", texto: String(grupo), fin: indice }
    ];

    iniciarCociente();
    dibujar();

    instruccion.innerHTML =
      `<b>Elegiste ${grupo}.</b> Ahora escribe cuántas veces cabe ${ejercicio.divisor}.`;
  }

  function revisar() {
    if (ejercicio.fase !== "cociente") return;

    const valor = respuesta.value.trim();

    if (!/^[0-9]$/.test(valor)) {
      msg(
        "incorrecto",
        "Escribe una sola cifra",
        "En cada lugar del cociente debes escribir un número del 0 al 9."
      );
      return;
    }

    const v = Number(valor);

    if (v !== pasoActual.correcta) {
      msg(
        "incorrecto",
        "Casi...",
        `Piensa en la tabla del ${ejercicio.divisor}. Busca el número que llegue a ${ejercicio.grupo} sin pasarse.`
      );
      respuesta.select();
      return;
    }

    const producto = v * ejercicio.divisor;
    const resto = ejercicio.grupo - producto;

    ejercicio.cociente.push(v);
    ejercicio.resto = resto;

    // Guardamos el resultado internamente.
    // NO mostramos multiplicación ni resta.
    respuesta.disabled = true;
    comprobar.classList.add("oculto");

    const haySiguiente =
      ejercicio.indiceActual < ejercicio.digitos.length - 1;

    if (haySiguiente) {
      msg(
        "correcto",
        "¡Muy bien!",
        `Tu cociente es correcto. Ahora haz la resta mentalmente y luego baja la siguiente cifra.`
      );

      iniciarBajada();
      dibujar();
      return;
    }

    // Último paso: el resto se coloca debajo del último número,
    // igual que en el cuaderno.
    ejercicio.filas.push({
      tipo: "resto",
      texto: String(resto),
      fin: ejercicio.indiceActual
    });

    ejercicio.terminado = true;
    dibujar();

    terminar();
  }

  function seleccionarParaBajar(indice) {
    const siguiente = ejercicio.indiceActual + 1;

    if (indice !== siguiente) {
      msg(
        "incorrecto",
        "Baja la siguiente cifra",
        "Debes seguir el orden. Primero termina este paso y luego toca la cifra que sigue."
      );
      return;
    }

    ejercicio.marcas[indice] = true;
    ejercicio.bajadaSeleccionada = indice;

    dibujar();

    bajar.classList.remove("oculto");
    instruccion.innerHTML =
      `<b>✓ Muy bien.</b> Marcaste el <b>${ejercicio.digitos[indice]}</b>. Ahora pulsa <b>“Bajar”</b>.`;
  }

  function ejecutarBajada() {
    if (ejercicio.fase !== "bajar") return;

    const indice = ejercicio.bajadaSeleccionada;

    if (indice == null) {
      msg(
        "incorrecto",
        "Primero marca la cifra",
        "Toca la siguiente cifra del dividendo."
      );
      return;
    }

    const digito = ejercicio.digitos[indice];
    const nuevoGrupo = ejercicio.resto * 10 + digito;

    ejercicio.indiceActual = indice;
    ejercicio.grupo = nuevoGrupo;
    ejercicio.filas.push({
      tipo: "bajada",
      texto: String(ejercicio.resto) + String(digito),
      fin: indice,
      marcada: true
    });

    ejercicio.bajadaSeleccionada = null;
    iniciarCociente();
    dibujar();

    instruccion.innerHTML =
      `<b>¡Bajaste el ${digito}!</b> Ahora tienes <b>${nuevoGrupo}</b>. Escribe el siguiente número del cociente.`;
  }
  function terminar() {
    const esperado = String(ejercicio.resultado);
    const actual = ejercicio.cociente.join("");

    if (Number(actual) === Number(esperado)) {
      correctas++;
      correctasEl.textContent = correctas;
    }

    const r = ejercicio.restoFinal;

    resultado.textContent =
      r === 0
        ? `${ejercicio.dividendo} ÷ ${ejercicio.divisor} = ${ejercicio.resultado}`
        : `${ejercicio.dividendo} ÷ ${ejercicio.divisor} = ${ejercicio.resultado} y sobra ${r}`;

    resultadoGrande.textContent =
      r === 0
        ? ejercicio.resultado
        : `${ejercicio.resultado} · resto ${r}`;

    nueva.classList.remove("oculto");
    comprobar.classList.add("oculto");
    bajar.classList.add("oculto");
    respuesta.disabled = true;

    msg(
      "correcto",
      "¡Terminaste!",
      r === 0
        ? "La división es exacta. El resto quedó en 0."
        : `Terminaste. El resto quedó en ${r}.`
    );

    instruccion.innerHTML =
      r === 0
        ? `<b>🎉 División exacta.</b> El resto final es <b>0</b>.`
        : `<b>🎉 División terminada.</b> El resto final es <b>${r}</b>.`;

    setTimeout(() => modal.classList.remove("oculto"), 500);
  }

  function msg(tipo, titulo, texto) {
    feedback.className = "feedback " + tipo;
    fi.textContent = tipo === "correcto" ? "🎉" : "💡";
    ft.textContent = titulo;
    fx.textContent = texto;
  }

  comprobar.addEventListener("click", revisar);

  respuesta.addEventListener("keydown", event => {
    if (event.key === "Enter") revisar();
  });

  bajar.addEventListener("click", ejecutarBajada);
  nueva.addEventListener("click", iniciar);
  $("otra").addEventListener("click", iniciar);
  $("inicio").addEventListener("click", () => { window.location.href = "../index.html"; });
  $("btnVolver").addEventListener("click", () => { window.location.href = "../index.html"; });

  iniciar();
})();
