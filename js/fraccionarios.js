"use strict";

/* ============================================================
   FRACCIONARIOS · 3.º GRADO
   SPA educativa completa, sin dependencias de frameworks.
   ============================================================ */

const STORAGE_KEY = "fraccionarios3_estado_v2";

const NAMES = {
  2:"medios",3:"tercios",4:"cuartos",5:"quintos",
  6:"sextos",7:"séptimos",8:"octavos",9:"novenos",10:"décimos"
};

const state = {
  view:"home",
  points:0,
  streak:0,
  bestStreak:0,
  bestScore:0,
  evaluation:{
    started:false,
    current:0,
    answers:[],
    questions:[],
    finished:false,
    score:0
  }
};

const app = document.getElementById("app");
const toast = document.getElementById("toast");

function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    points:state.points,
    streak:state.streak,
    bestStreak:state.bestStreak,
    bestScore:state.bestScore,
    evaluation:state.evaluation
  }));
}

function load(){
  try{
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if(!raw) return;
    state.points=Number(raw.points)||0;
    state.streak=Number(raw.streak)||0;
    state.bestStreak=Number(raw.bestStreak)||0;
    state.bestScore=Number(raw.bestScore)||0;
    if(raw.evaluation) state.evaluation={...state.evaluation,...raw.evaluation};
  }catch(e){
    localStorage.removeItem(STORAGE_KEY);
  }
}

function updateStats(){
  document.getElementById("points").textContent=state.points;
  document.getElementById("streak").textContent=state.streak;
  document.getElementById("bestScore").textContent=state.bestScore;
}

function notify(message, type="normal"){
  toast.textContent=message;
  toast.className="toast show";
  if(type==="correct") toast.classList.add("reward");
  clearTimeout(notify.timer);
  notify.timer=setTimeout(()=>toast.className="toast",1800);
}

function reward(correct){
  if(correct){
    state.points+=100;
    state.streak++;
    state.bestStreak=Math.max(state.bestStreak,state.streak);
    notify("🎉 ¡Correcto! +100 puntos","correct");
  }else{
    state.streak=0;
    notify("💡 Casi. ¡Sigue intentando!");
  }
  updateStats();
  save();
}

function gcd(a,b){
  while(b){[a,b]=[b,a%b]}
  return Math.abs(a);
}
function simplify(n,d){
  const g=gcd(n,d);
  return {n:n/g,d:d/g};
}
function fractionHTML(n,d,big=false){
  return `<span class="fraction ${big?"big-fraction":""}"><span class="num">${n}</span><span class="den">${d}</span></span>`;
}
function fractionText(n,d){
  return `${n}/${d}`;
}
function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}
function choice(arr){return arr[rand(0,arr.length-1)]}
function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=rand(0,i);[a[i],a[j]]=[a[j],a[i]]}
  return a;
}
function escapeHTML(s){
  return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function compare(a,b){return a>b?">":a<b?"<":"="}
function markActive(view){
  document.querySelectorAll(".nav-btn").forEach(btn=>{
    btn.classList.toggle("active",btn.dataset.view===view);
  });
}

function navigate(view){
  state.view=view;
  markActive(view);
  render();
  window.scrollTo({top:0,behavior:"smooth"});
}

function render(){
  updateStats();
  markActive(state.view);
  const views={
    home:renderHome,
    concepto:renderConcepto,
    partes:renderPartes,
    lectura:renderLectura,
    representacion:renderRepresentacion,
    comparacion:renderComparacion,
    equivalentes:renderEquivalentes,
    practica:renderPractica,
    evaluacion:renderEvaluacion
  };
  app.innerHTML=views[state.view]();
  bindViewEvents();
}

/* ---------------- HOME ---------------- */
function renderHome(){
  const cards=[
    ["🍕","¿Qué es una fracción?","Aprende que una fracción representa partes iguales de un todo.","concepto"],
    ["🔢","Sus partes","Descubre numerador y denominador con controles interactivos.","partes"],
    ["📖","Aprende a leerlas","Medios, tercios, cuartos y más con práctica guiada.","lectura"],
    ["🟦","¡Dibújalas!","Pinta las partes de una figura para formar una fracción.","representacion"],
    ["⚖️","Compáralas","Practica mayor, menor o igual con símbolos.","comparacion"],
    ["🧩","Equivalentes","Comprende por qué 1/2 puede ser igual a 2/4.","equivalentes"],
    ["🎯","Practica","Ejercicios aleatorios y problemas de razonamiento.","practica"],
    ["🏆","Evaluación final","10 preguntas aleatorias para comprobar lo aprendido.","evaluacion"]
  ];
  return `
    <section class="view">
      <div class="hero">
        <div>
          <div class="eyebrow">APRENDE · JUEGA · PRACTICA</div>
          <h2>Tu ruta de fraccionarios</h2>
          <p>Aprende paso a paso, juega con las figuras y gana puntos mientras demuestras lo que sabes.</p>
        </div>
        <div class="hero-art" aria-hidden="true">🍕➗🎯</div>
      </div>

      <div class="section-head">
        <div><div class="kicker">APRENDE</div><h2>Todo sobre fracciones</h2></div>
        <span class="badge">🔥 Racha máxima: ${state.bestStreak}</span>
      </div>

      <div class="cards">
        ${cards.map(c=>`
          <article class="card action-card" data-go="${c[3]}" tabindex="0" role="button">
            <div class="icon">${c[0]}</div><h3>${c[1]}</h3><p>${c[2]}</p>
          </article>`).join("")}
      </div>

      <div class="callout">
        <div><strong>🏆 ¿Lista para el reto?</strong><span>Responde 10 preguntas en la evaluación final.</span></div>
        <button class="btn" data-go="evaluacion">Ir a evaluación</button>
      </div>
    </section>`;
}

/* ---------------- CONCEPTO ---------------- */
function renderConcepto(){
  return `
  <section class="view">
    <div class="section-head">
      <div><div class="kicker">LECCIÓN 1</div><h2>🍕 ¿Qué es una fracción?</h2><p>Una fracción nos dice cuántas partes iguales tomamos de un todo.</p></div>
    </div>
    <div class="panel">
      <div class="object-picker">
        <button class="object-btn active" data-object="pizza">🍕 Pizza</button>
        <button class="object-btn" data-object="cake">🍰 Pastel</button>
        <button class="object-btn" data-object="chocolate">🍫 Chocolate</button>
      </div>
      <div id="objectStage" class="visual-stage"><div class="pizza" aria-label="Pizza dividida en cuatro partes"></div></div>
      <div class="grid-3" style="margin-top:18px">
        <div class="explain-row"><strong>1. Un todo</strong><span>Tenemos una pizza, pastel o chocolate completo.</span></div>
        <div class="explain-row"><strong>2. Partes iguales</strong><span>Lo dividimos en partes del mismo tamaño.</span></div>
        <div class="explain-row"><strong>3. Una fracción</strong><span>Elegimos algunas de esas partes.</span></div>
      </div>
    </div>
  </section>`;
}

/* ---------------- PARTES ---------------- */
function renderPartes(){
  const n=3,d=5;
  return `
  <section class="view">
    <div class="section-head"><div><div class="kicker">LECCIÓN 2</div><h2>🔢 Numerador y denominador</h2><p>Cambia los números y observa cómo cambia la fracción.</p></div></div>
    <div class="grid-2">
      <div class="panel center">
        <div class="fraction-control">
          <div class="stepper"><button data-step="num" data-delta="-1">−</button><strong id="partNum">${n}</strong><button data-step="num" data-delta="1">+</button></div>
          ${fractionHTML(n,d,true)}
          <div class="stepper"><button data-step="den" data-delta="-1">−</button><strong id="partDen">${d}</strong><button data-step="den" data-delta="1">+</button></div>
        </div>
        <div id="partVisual" class="visual-stage"></div>
      </div>
      <div class="panel">
        <h3>¿Qué significa cada número?</h3>
        <div class="explain-list">
          <div class="explain-row"><strong>Numerador: <span id="numExplain">${n}</span></strong><span>Es el número de arriba. Indica cuántas partes tomamos.</span></div>
          <div class="explain-row"><strong>Denominador: <span id="denExplain">${d}</span></strong><span>Es el número de abajo. Indica en cuántas partes iguales se divide el todo.</span></div>
          <div class="explain-row"><strong>Recuerda ⭐</strong><span>El denominador nunca puede ser 0 y debe ser mayor que el numerador para representar una fracción propia.</span></div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------------- LECTURA ---------------- */
let readingQ={n:1,d:2,shown:false};
function newReading(){
  readingQ={d:rand(2,10),n:0,shown:false};
  readingQ.n=rand(1,readingQ.d);
}
function readingName(n,d){
  if(n===1) return `un ${NAMES[d]}`;
  if(d===2) return `${n} medios`;
  return `${n} ${NAMES[d]}`;
}
function renderLectura(){
  if(!readingQ.d) newReading();
  const percent=(readingQ.n/readingQ.d)*100;
  return `
  <section class="view">
    <div class="section-head"><div><div class="kicker">LECCIÓN 3</div><h2>📖 Lectura de fracciones</h2><p>Mira la fracción y aprende a decirla correctamente.</p></div></div>
    <div class="panel reading-card">
      <div class="mini-visual"><div class="circle-parts" style="--filled:${percent}%"></div></div>
      <div>
        <div class="center">${fractionHTML(readingQ.n,readingQ.d,true)}</div>
        <p class="muted">El denominador ${readingQ.d} se llama <strong>${NAMES[readingQ.d]}</strong>.</p>
        <div id="readingAnswer" class="reading-answer ${readingQ.shown?"":"reading-hidden"}">Se lee: “${readingName(readingQ.n,readingQ.d)}”.</div>
        <div class="controls-row">
          <button id="showReading" class="btn secondary">${readingQ.shown?"Ocultar solución":"Ver solución"}</button>
          <button id="nextReading" class="btn">Siguiente ➜</button>
        </div>
      </div>
    </div>
    <div class="grid-3" style="margin-top:18px">
      ${[2,3,4].map(d=>`<div class="card center"><div class="icon">${d===2?"½":d===3?"⅓":"¼"}</div><h3>${NAMES[d].replace(/^./,x=>x.toUpperCase())}</h3><p>Ejemplo: ${readingName(1,d)}.</p></div>`).join("")}
    </div>
  </section>`;
}

/* ---------------- REPRESENTACIÓN ---------------- */
let graphQ={n:2,d:6,selected:0};
function newGraphQ(){
  graphQ.d=choice([2,3,4,5,6,8,9,10]);
  graphQ.n=rand(1,graphQ.d);
  graphQ.selected=0;
}
function renderRepresentacion(){
  if(!graphQ.d) newGraphQ();
  const cols=graphQ.d<=5?graphQ.d:Math.ceil(Math.sqrt(graphQ.d));
  return `
  <section class="view">
    <div class="section-head"><div><div class="kicker">LECCIÓN 4</div><h2>🟦 Representación gráfica</h2><p>Pinta exactamente las partes que pide la fracción.</p></div></div>
    <div class="panel graph-board">
      <div class="target-box">Pinta <strong>${fractionHTML(graphQ.n,graphQ.d)}</strong> de las partes.</div>
      <div class="graph-help">Haz clic en las casillas para pintarlas. Puedes quitar una casilla haciendo clic otra vez.</div>
      <div id="clickGrid" class="click-grid" style="grid-template-columns:repeat(${cols},1fr)">
        ${Array.from({length:graphQ.d},(_,i)=>`<button class="click-cell ${i<graphQ.selected?"selected":""}" data-cell="${i}" aria-label="Parte ${i+1}"></button>`).join("")}
      </div>
      <p id="graphCounter" class="muted">Pintadas: ${graphQ.selected} de ${graphQ.d}</p>
      <div class="controls-row" style="justify-content:center">
        <button id="checkGraph" class="btn success">Verificar representación</button>
        <button id="nextGraph" class="btn secondary">Nueva fracción</button>
      </div>
      <div id="graphFeedback"></div>
    </div>
  </section>`;
}

/* ---------------- COMPARACIÓN ---------------- */
let compareQ=null;
function newCompare(){
  const d=choice([2,3,4,5,6,8,10]);
  const n1=rand(1,d),n2=rand(1,d);
  compareQ={a:{n:n1,d},b:{n:n2,d},answer:compare(n1/d,n2/d),selected:null,checked:false};
}
function renderComparacion(){
  if(!compareQ) newCompare();
  return `
  <section class="view">
    <div class="section-head"><div><div class="kicker">LECCIÓN 5</div><h2>⚖️ Comparar fracciones</h2><p>Elige si la primera es mayor, menor o igual que la segunda.</p></div></div>
    <div class="panel comparison-question">
      <div class="compare-fractions">${fractionHTML(compareQ.a.n,compareQ.a.d,true)} <span>?</span> ${fractionHTML(compareQ.b.n,compareQ.b.d,true)}</div>
      <div class="symbols">
        ${["<","=",">"].map(s=>`<button class="symbol-btn ${compareQ.selected===s?"active":""}" data-symbol="${s}">${s}</button>`).join("")}
      </div>
      <div class="controls-row" style="justify-content:center;margin-top:20px">
        <button id="checkCompare" class="btn success">Comprobar</button>
        <button id="nextCompare" class="btn secondary">Otra pregunta</button>
      </div>
      <div id="compareFeedback">${compareQ.checked?compareFeedbackHTML():""}</div>
    </div>
    <div class="callout"><div><strong>💡 Truco para empezar</strong><span>Si tienen el mismo denominador, compara los numeradores: el número mayor representa más partes.</span></div></div>
  </section>`;
}
function compareFeedbackHTML(){
  const ok=compareQ.selected===compareQ.answer;
  return `<div class="feedback ${ok?"correct":"incorrect"}">${ok?"🎉 ¡Muy bien!":"❌ No es ese símbolo."} La respuesta correcta es <strong>${compareQ.answer}</strong>.</div>`;
}

/* ---------------- EQUIVALENTES ---------------- */
let equiv={baseN:1,baseD:2,mult:2,checked:false};
function renderEquivalentes(){
  const n=equiv.baseN,d=equiv.baseD,m=equiv.mult;
  const n2=n*m,d2=d*m;
  return `
  <section class="view">
    <div class="section-head"><div><div class="kicker">LECCIÓN 6</div><h2>🧩 Fracciones equivalentes</h2><p>Dos fracciones son equivalentes cuando representan la misma cantidad.</p></div></div>
    <div class="panel">
      <div class="equiv-figures">
        <div class="center">
          <h3>Primera figura</h3>
          <div class="partition" style="grid-template-columns:repeat(${d},1fr)">
            ${Array.from({length:d},(_,i)=>`<div class="${i<n?"filled":""}"></div>`).join("")}
          </div>
          <div class="equation">${fractionHTML(n,d,true)}</div>
        </div>
        <div class="center">
          <h3>Segunda figura</h3>
          <div class="partition" style="grid-template-columns:repeat(${d2},1fr)">
            ${Array.from({length:d2},(_,i)=>`<div class="${i<n2?"filled":""}"></div>`).join("")}
          </div>
          <div class="equation">${fractionHTML(n2,d2,true)}</div>
        </div>
      </div>
      <div class="slider-wrap">
        <label><span>Multiplicador</span><strong>×${m}</strong></label>
        <input id="equivSlider" type="range" min="1" max="5" value="${m}">
      </div>
      <div class="center">
        <p class="equation">${fractionHTML(n,d)} = ${fractionHTML(n2,d2)}</p>
        <p class="muted">Multiplicamos numerador y denominador por el mismo número.</p>
        <button id="checkEquiv" class="btn success">Comprobar equivalencia</button>
        <div id="equivFeedback">${equiv.checked?'<div class="feedback correct">🎉 ¡Exacto! Ambas representan la misma parte del todo.</div>':""}</div>
        <button id="newEquiv" class="btn secondary">Cambiar fracción</button>
      </div>
    </div>
  </section>`;
}

/* ---------------- PRÁCTICA ---------------- */
let practiceQ=null;
function createPractice(){
  const type=choice(["mcq","compare","equiv","word"]);
  if(type==="compare"){
    const d=choice([2,3,4,5,6,8,10]),a=rand(1,d),b=rand(1,d);
    practiceQ={type,text:`¿Cuál símbolo completa la comparación?`,options:["<","=",">"],correct:compare(a/d,b/d),meta:{a:{n:a,d},b:{n:b,d}},selected:null,checked:false};
  }else if(type==="equiv"){
    const d=choice([2,3,4]),n=rand(1,d-1),m=choice([2,3]);
    const correct=n*m,den=d*m;
    practiceQ={type,text:`¿Qué numerador falta para que la fracción sea equivalente?`,options:shuffle([correct,Math.max(1,correct-1),correct+1,den-1]),correct:String(correct),meta:{n,d,den},selected:null,checked:false};
  }else if(type==="word"){
    const d=choice([2,3,4,5,6]),n=rand(1,d-1);
    const objects=choice(["una pizza","una torta","una barra de chocolate","una bandeja de frutas"]);
    practiceQ={type,text:`${objects[0].toUpperCase()+objects.slice(1)} se divide en ${d} partes iguales y ${n} partes se comen. ¿Qué fracción se comió?`,options:shuffle([fractionText(n,d),fractionText(Math.max(1,n-1),d),fractionText(Math.min(d,n+1),d),fractionText(n,Math.min(10,d+1))]),correct:fractionText(n,d),meta:{n,d},selected:null,checked:false};
  }else{
    const d=choice([2,3,4,5,6,8]),n=rand(1,d);
    const distractors=new Set([fractionText(n,d)]);
    while(distractors.size<4){
      distractors.add(fractionText(rand(1,d),d));
    }
    practiceQ={type,text:`¿Qué fracción representa ${n} de ${d} partes iguales?`,options:shuffle([...distractors]),correct:fractionText(n,d),meta:{n,d},selected:null,checked:false};
  }
}
function practiceVisual(q){
  if(q.type==="compare"){
    return `<div class="compare-fractions">${fractionHTML(q.meta.a.n,q.meta.a.d)} <span>?</span> ${fractionHTML(q.meta.b.n,q.meta.b.d)}</div>`;
  }
  return `<div class="center">${fractionHTML(q.meta.n,q.meta.d,true)}</div>`;
}
function renderPractica(){
  if(!practiceQ) createPractice();
  const q=practiceQ;
  return `
  <section class="view">
    <div class="section-head"><div><div class="kicker">LECCIÓN 7</div><h2>🎯 Práctica y problemas</h2><p>Cada vez aparece una pregunta nueva. ¡Puedes practicar infinitamente!</p></div></div>
    <div class="panel practice-box">
      <div class="question-number">RETO ALEATORIO</div>
      ${q.type==="compare"?practiceVisual(q):""}
      <div class="question-text">${q.text}</div>
      ${q.type!=="compare"&&q.type!=="word"?practiceVisual(q):""}
      <div class="answer-grid">
        ${q.options.map((o,i)=>`<button class="answer-btn ${q.selected===String(o)?"selected":""} ${q.checked&&String(o)===String(q.correct)?"correct":""} ${q.checked&&q.selected===String(o)&&String(o)!==String(q.correct)?"wrong":""}" data-practice-answer="${escapeHTML(String(o))}" ${q.checked?"disabled":""}>${escapeHTML(String(o))}</button>`).join("")}
      </div>
      ${q.type==="word"?`<div class="problem-card">🧠 <strong>Piensa:</strong> el denominador dice en cuántas partes iguales se dividió el todo y el numerador dice cuántas partes se tomaron.</div>`:""}
      <div class="controls-row" style="margin-top:18px">
        <button id="checkPractice" class="btn success" ${q.checked?"disabled":""}>Verificar respuesta</button>
        <button id="nextPractice" class="btn">Siguiente pregunta ➜</button>
      </div>
      <div id="practiceFeedback" class="feedback-box">${q.checked?practiceFeedbackHTML():""}</div>
    </div>
  </section>`;
}
function practiceFeedbackHTML(){
  const ok=String(practiceQ.selected)===String(practiceQ.correct);
  return `<div class="feedback ${ok?"correct":"incorrect"}">${ok?"🎉 ¡Excelente! +100 puntos.":"💡 La respuesta correcta es"} ${ok?"":`<strong>${escapeHTML(practiceQ.correct)}</strong>.`}</div>`;
}

/* ---------------- EVALUACIÓN ---------------- */
const questionFactories=[
  ()=>{const d=choice([2,3,4,5,6]),n=rand(1,d);return {text:`¿Cómo se lee ${fractionText(n,d)}?`,options:shuffle([readingName(n,d),readingName(Math.max(1,n-1),d),readingName(n,Math.min(10,d+1)),`${n} unidades`]),correct:readingName(n,d)}},
  ()=>{const d=choice([2,3,4,5,6,8]),n=rand(1,d);return {text:`¿Cuál es el numerador de ${fractionText(n,d)}?`,options:shuffle([String(n),String(d),String(n+1),String(Math.max(1,n-1))]),correct:String(n)}},
  ()=>{const d=choice([2,3,4,5,6,8]),n=rand(1,d);return {text:`¿Cuál es el denominador de ${fractionText(n,d)}?`,options:shuffle([String(d),String(n),String(d+1),String(Math.max(2,d-1))]),correct:String(d)}},
  ()=>{const d=choice([2,3,4,5,6,8]),a=rand(1,d),b=rand(1,d);return {text:`Completa: ${fractionText(a,d)} ___ ${fractionText(b,d)}`,options:["<","=",">"],correct:compare(a/d,b/d)}},
  ()=>{const d=choice([2,3,4,5,6]),n=rand(1,d);return {text:`Si un todo tiene ${d} partes iguales y tomamos ${n}, ¿qué fracción tenemos?`,options:shuffle([fractionText(n,d),fractionText(d,n),fractionText(Math.max(1,n-1),d),fractionText(n,Math.min(10,d+1))]),correct:fractionText(n,d)}},
  ()=>{const d=choice([2,3,4]),n=rand(1,d-1),m=choice([2,3]);return {text:`¿Cuál es equivalente a ${fractionText(n,d)}?`,options:shuffle([fractionText(n*m,d*m),fractionText(n+1,d),fractionText(n,d+1),fractionText(d,n)]),correct:fractionText(n*m,d*m)}},
  ()=>{const d=choice([2,3,4,5,6]),n=rand(1,d-1);return {text:`Una pizza se divide en ${d} partes iguales y se comen ${n}. ¿Qué fracción queda comida?`,options:shuffle([fractionText(n,d),fractionText(d-n,d),fractionText(n+1,d),fractionText(n,d+1)]),correct:fractionText(n,d)}},
  ()=>{const d=choice([2,3,4,5,6]),n=rand(1,d);return {text:`¿Cuál fracción representa más partes de un mismo todo dividido en ${d} partes?`,options:shuffle([fractionText(n,d),fractionText(Math.max(1,n-1),d),fractionText(Math.min(d,n+1),d),fractionText(1,d)]),correct: fractionText(Math.min(d,n+1),d)}},
  ()=>{const d=choice([2,3,4,5,6]),n=rand(1,d);return {text:`En ${fractionText(n,d)}, ¿qué nos indica el número ${d}?`,options:shuffle(["En cuántas partes iguales se divide el todo","Cuántas partes tomamos","Cuántos objetos hay","Cuántos puntos ganamos"]),correct:"En cuántas partes iguales se divide el todo"}},
  ()=>{const d=choice([2,3,4,5,6]),n=rand(1,d);return {text:`En ${fractionText(n,d)}, ¿qué nos indica el número ${n}?`,options:shuffle(["Cuántas partes tomamos","En cuántas partes se divide el todo","El tamaño del objeto","El número de preguntas"]),correct:"Cuántas partes tomamos"}}
];

function startEvaluation(){
  state.evaluation={
    started:true,current:0,
    answers:Array(10).fill(null),
    questions:shuffle(questionFactories).slice(0,10).map(fn=>fn()),
    finished:false,score:0
  };
  save();
  navigate("evaluacion");
}

function renderEvaluacion(){
  const e=state.evaluation;
  if(!e.started){
    return `<section class="view"><div class="panel eval-start">
      <div class="trophy">🏆</div><div class="kicker">RETO FINAL</div>
      <h2>Evaluación de Fraccionarios</h2>
      <p class="muted">10 preguntas aleatorias. Cada respuesta correcta vale 100 puntos.</p>
      <div class="badges"><span class="badge">🎲 Preguntas nuevas</span><span class="badge">⭐ 1000 puntos posibles</span><span class="badge">💾 Progreso guardado</span></div>
      <button id="startEval" class="btn">Iniciar Evaluación</button>
    </div></section>`;
  }
  if(e.finished) return renderEvalResult();

  const q=e.questions[e.current];
  const selected=e.answers[e.current];
  const pct=((e.current)/10)*100;
  return `<section class="view"><div class="panel">
    <div class="section-head">
      <div><div class="kicker">EVALUACIÓN FINAL</div><h2>Pregunta ${e.current+1} de 10</h2></div>
      <strong>${e.answers.filter(Boolean).length}/10 respondidas</strong>
    </div>
    <div class="eval-progress"><div style="width:${pct}%"></div></div>
    <div class="question-text">${q.text}</div>
    <div class="eval-options">
      ${q.options.map(o=>`<button class="eval-option ${selected===String(o)?"selected":""}" data-eval-answer="${escapeHTML(String(o))}">${escapeHTML(String(o))}</button>`).join("")}
    </div>
    <div class="controls-row" style="margin-top:20px;justify-content:space-between">
      <button id="prevEval" class="btn secondary" ${e.current===0?"disabled":""}>← Anterior</button>
      ${e.current<9
        ?`<button id="nextEval" class="btn" ${selected===null?"disabled":""}>Siguiente →</button>`
        :`<button id="finishEval" class="btn gold" ${selected===null?"disabled":""}>Finalizar y Ver Calificación 🏆</button>`}
    </div>
  </div></section>`;
}

function renderEvalResult(){
  const e=state.evaluation;
  const pct=e.score*10;
  const msg=e.score>=9?"🌟 ¡Excelente! Dominas muy bien los fraccionarios.":e.score>=7?"👏 ¡Muy bien! Sigue practicando para llegar aún más alto.":e.score>=5?"💪 Buen trabajo. Repasa las lecciones y vuelve a intentarlo.":"🌱 Vas por buen camino. Practica un poco más y lo conseguirás.";
  return `<section class="view"><div class="panel eval-result">
    <div class="trophy">🏆</div><div class="kicker">RESULTADO FINAL</div>
    <h2>${msg}</h2>
    <div class="score-ring" style="--score-angle:${pct}%"><span>${e.score}/10</span></div>
    <h3>${e.score*100} puntos en esta evaluación</h3>
    <div class="badges">
      <span class="badge">✅ ${e.score} aciertos</span>
      <span class="badge">❌ ${10-e.score} para repasar</span>
      <span class="badge">⭐ Récord: ${state.bestScore}</span>
    </div>
    <div class="controls-row" style="justify-content:center">
      <button id="retryEval" class="btn">🔄 Nueva evaluación</button>
      <button id="backHome" class="btn secondary">Volver al inicio</button>
    </div>
  </div></section>`;
}

/* ---------------- EVENTOS ---------------- */
function bindGlobalEvents(){
  document.querySelectorAll(".nav-btn").forEach(btn=>{
    btn.addEventListener("click",()=>navigate(btn.dataset.view));
  });

  document.getElementById("resetProgress").addEventListener("click",()=>{
    document.getElementById("confirmModal").classList.remove("hidden");
  });

  document.getElementById("cancelReset").addEventListener("click",closeResetModal);
  document.getElementById("confirmReset").addEventListener("click",()=>{
    localStorage.removeItem(STORAGE_KEY);
    state.points=0;state.streak=0;state.bestStreak=0;state.bestScore=0;
    state.evaluation={started:false,current:0,answers:[],questions:[],finished:false,score:0};
    closeResetModal();notify("🧹 Progreso reiniciado");render();
  });
}
function closeResetModal(){document.getElementById("confirmModal").classList.add("hidden")}

function bindViewEvents(){
  document.querySelectorAll("[data-go]").forEach(el=>{
    const go=()=>navigate(el.dataset.go);
    el.addEventListener("click",go);
    if(el.tagName==="ARTICLE") el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")go()});
  });

  /* Concepto */
  document.querySelectorAll("[data-object]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll("[data-object]").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const stage=document.getElementById("objectStage");
      stage.innerHTML=btn.dataset.object==="pizza"
        ?'<div class="pizza"></div>'
        :btn.dataset.object==="cake"
        ?'<div class="cake"></div>'
        :'<div class="chocolate">'+Array.from({length:12},()=>"<span></span>").join("")+"</div>";
    });
  });

  /* Partes */
  let partN=3,partD=5;
  const updateParts=()=>{
    document.getElementById("partNum").textContent=partN;
    document.getElementById("partDen").textContent=partD;
    document.getElementById("numExplain").textContent=partN;
    document.getElementById("denExplain").textContent=partD;
    const stage=document.getElementById("partVisual");
    stage.innerHTML=`<div class="click-grid" style="grid-template-columns:repeat(${partD<=5?partD:Math.ceil(Math.sqrt(partD))},1fr);width:min(420px,100%)">${Array.from({length:partD},(_,i)=>`<div class="click-cell ${i<partN?"selected":""}"></div>`).join("")}</div>`;
    const frac=stage.parentElement.querySelector(".fraction");
    if(frac) frac.outerHTML=fractionHTML(partN,partD,true);
  };
  document.querySelectorAll("[data-step]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const type=btn.dataset.step,delta=Number(btn.dataset.delta);
      if(type==="num") partN=Math.max(1,Math.min(partD,partN+delta));
      else partD=Math.max(2,Math.min(10,partD+delta));
      if(partN>partD) partN=partD;
      const old=document.querySelector(".fraction-control .big-fraction");
      if(old) old.outerHTML=fractionHTML(partN,partD,true);
      updateParts();
    });
  });
  updateParts();

  /* Lectura */
  const showReading=document.getElementById("showReading");
  if(showReading) showReading.addEventListener("click",()=>{
    readingQ.shown=!readingQ.shown;render();
  });
  const nextReading=document.getElementById("nextReading");
  if(nextReading) nextReading.addEventListener("click",()=>{newReading();render()});

  /* Gráfica */
  document.querySelectorAll("[data-cell]").forEach(cell=>{
    cell.addEventListener("click",()=>{
      const i=Number(cell.dataset.cell);
      const cells=[...document.querySelectorAll("[data-cell]")];
      if(cell.classList.contains("selected")){
        cell.classList.remove("selected");graphQ.selected--;
      }else if(graphQ.selected<graphQ.n){
        cell.classList.add("selected");graphQ.selected++;
      }
      document.getElementById("graphCounter").textContent=`Pintadas: ${graphQ.selected} de ${graphQ.d}`;
    });
  });
  const checkGraph=document.getElementById("checkGraph");
  if(checkGraph) checkGraph.addEventListener("click",()=>{
    const box=document.getElementById("graphFeedback");
    const ok=graphQ.selected===graphQ.n;
    box.innerHTML=`<div class="feedback ${ok?"correct":"incorrect"}">${ok?"🎉 ¡Representación correcta! +100 puntos.":"💡 Debes pintar exactamente "+graphQ.n+" partes."}</div>`;
    if(ok) reward(true); else {state.streak=0;save();updateStats()}
  });
  const nextGraph=document.getElementById("nextGraph");
  if(nextGraph) nextGraph.addEventListener("click",()=>{newGraphQ();render()});

  /* Comparación */
  document.querySelectorAll("[data-symbol]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      compareQ.selected=btn.dataset.symbol;compareQ.checked=false;render();
    });
  });
  const checkCompare=document.getElementById("checkCompare");
  if(checkCompare) checkCompare.addEventListener("click",()=>{
    if(!compareQ.selected){notify("Elige un símbolo primero");return}
    const ok=compareQ.selected===compareQ.answer;
    compareQ.checked=true;render();
    if(ok) reward(true); else reward(false);
  });
  const nextCompare=document.getElementById("nextCompare");
  if(nextCompare) nextCompare.addEventListener("click",()=>{newCompare();render()});

  /* Equivalentes */
  const slider=document.getElementById("equivSlider");
  if(slider) slider.addEventListener("input",()=>{
    equiv.mult=Number(slider.value);equiv.checked=false;render();
  });
  const checkEquiv=document.getElementById("checkEquiv");
  if(checkEquiv) checkEquiv.addEventListener("click",()=>{
    equiv.checked=true;render();reward(true);
  });
  const newEquiv=document.getElementById("newEquiv");
  if(newEquiv) newEquiv.addEventListener("click",()=>{
    const d=choice([2,3,4]),n=rand(1,d-1);
    equiv={baseN:n,baseD:d,mult:choice([2,3]),checked:false};render();
  });

  /* Práctica */
  document.querySelectorAll("[data-practice-answer]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      if(practiceQ.checked)return;
      practiceQ.selected=btn.dataset.practiceAnswer;render();
    });
  });
  const checkPractice=document.getElementById("checkPractice");
  if(checkPractice) checkPractice.addEventListener("click",()=>{
    if(practiceQ.selected===null){notify("Elige una respuesta");return}
    const ok=String(practiceQ.selected)===String(practiceQ.correct);
    practiceQ.checked=true;render();reward(ok);
  });
  const nextPractice=document.getElementById("nextPractice");
  if(nextPractice) nextPractice.addEventListener("click",()=>{createPractice();render()});

  /* Evaluación */
  const startEval=document.getElementById("startEval");
  if(startEval) startEval.addEventListener("click",startEvaluation);

  document.querySelectorAll("[data-eval-answer]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      state.evaluation.answers[state.evaluation.current]=btn.dataset.evalAnswer;
      save();render();
    });
  });
  const prevEval=document.getElementById("prevEval");
  if(prevEval) prevEval.addEventListener("click",()=>{
    state.evaluation.current--;save();render();
  });
  const nextEval=document.getElementById("nextEval");
  if(nextEval) nextEval.addEventListener("click",()=>{
    if(state.evaluation.answers[state.evaluation.current]===null)return;
    state.evaluation.current++;save();render();
  });
  const finishEval=document.getElementById("finishEval");
  if(finishEval) finishEval.addEventListener("click",finishEvaluation);

  const retryEval=document.getElementById("retryEval");
  if(retryEval) retryEval.addEventListener("click",startEvaluation);
  const backHome=document.getElementById("backHome");
  if(backHome) backHome.addEventListener("click",()=>navigate("home"));
}

function finishEvaluation(){
  const e=state.evaluation;
  let score=0;
  e.questions.forEach((q,i)=>{if(String(e.answers[i])===String(q.correct))score++});
  e.score=score;e.finished=true;
  state.points+=score*100;
  state.streak=score===10?state.streak+1:0;
  state.bestStreak=Math.max(state.bestStreak,state.streak);
  state.bestScore=Math.max(state.bestScore,score);
  save();updateStats();render();
  notify(`🏆 Evaluación terminada: ${score}/10`);
}

/* Inicialización */
load();
bindGlobalEvents();
render();
