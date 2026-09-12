"use strict";

/* ============================================================
   FRACCIONARIOS · 3.º GRADO
   Base: segundo código proporcionado por el usuario.
   Se conserva su SPA, estado, gamificación y localStorage,
   incorporando las actividades solicitadas.
   ============================================================ */

const STORAGE_KEY = "fraccionarios3_estado_v3";

const NAMES = {
  2:"medios", 3:"tercios", 4:"cuartos", 5:"quintos",
  6:"sextos", 7:"séptimos", 8:"octavos", 9:"novenos", 10:"décimos"
};
const SINGULAR = {
  2:"medio",3:"tercio",4:"cuarto",5:"quinto",
  6:"sexto",7:"séptimo",8:"octavo",9:"noveno",10:"décimo"
};

const state = {
  view:"home", points:0, streak:0, bestStreak:0, bestScore:0,
  evaluationsCompleted:0,
  evaluation:{started:false,current:0,answers:[],questions:[],finished:false,score:0}
};

const app = document.getElementById("app");
const toast = document.getElementById("toast");

function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    points:state.points, streak:state.streak, bestStreak:state.bestStreak,
    bestScore:state.bestScore, evaluationsCompleted:state.evaluationsCompleted,
    evaluation:state.evaluation
  }));
}
function load(){
  try{
    const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");
    if(!raw)return;
    state.points=Number(raw.points)||0;
    state.streak=Number(raw.streak)||0;
    state.bestStreak=Number(raw.bestStreak)||0;
    state.bestScore=Number(raw.bestScore)||0;
    state.evaluationsCompleted=Number(raw.evaluationsCompleted)||0;
    if(raw.evaluation)state.evaluation={...state.evaluation,...raw.evaluation};
  }catch{
    localStorage.removeItem(STORAGE_KEY);
  }
}
function updateStats(){
  document.getElementById("points").textContent=state.points;
  document.getElementById("streak").textContent=state.streak;
  document.getElementById("bestScore").textContent=state.bestScore;
}
function notify(message,type="normal"){
  toast.textContent=message;
  toast.className="toast show "+(type==="correct"?"reward":"");
  clearTimeout(notify.timer);
  notify.timer=setTimeout(()=>toast.className="toast",1900);
}
function reward(correct){
  if(correct){
    state.points+=100;
    state.streak++;
    state.bestStreak=Math.max(state.bestStreak,state.streak);
    let bonus="";
    if(state.streak===3){state.points+=100;bonus=" 🔥 Bonus de racha +100";}
    if(state.streak===5){state.points+=200;bonus=" 🚀 Bonus de racha +200";}
    if(state.streak===10){state.points+=500;bonus=" 👑 Bonus de racha +500";}
    notify("🎉 ¡Correcto! +100 puntos"+bonus,"correct");
  }else{
    state.streak=0;
    notify("💡 Esta vez no. Revisa la explicación y vuelve a intentarlo.");
  }
  updateStats(); save();
}
function gcd(a,b){while(b){[a,b]=[b,a%b]}return Math.abs(a)}
function simplify(n,d){const g=gcd(n,d);return {n:n/g,d:d/g}}
function fractionHTML(n,d,big=false){
  return `<span class="fraction ${big?"big-fraction":""}"><span class="num">${n}</span><span class="den">${d}</span></span>`;
}
function fractionText(n,d){return `${n}/${d}`}
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
function readingName(n,d){
  if(n===1)return `un ${SINGULAR[d]}`;
  return `${n} ${NAMES[d]}`;
}
function markActive(view){
  document.querySelectorAll(".nav-btn").forEach(btn=>{
    if(btn.dataset.view)btn.classList.toggle("active",btn.dataset.view===view);
  });
}
function navigate(view){
  state.view=view; markActive(view); render();
  window.scrollTo({top:0,behavior:"smooth"});
}

/* ---------------- DATA FOR ACTIVITIES ---------------- */
let readingQ={d:2,n:1,shown:false};
let graphQ=null;
let compareQ=null;
let equivQ=null;
let practiceQ=null;

function newReading(){
  const d=choice([2,3,4,5,6,7,8,9,10]);
  readingQ={d,n:rand(1,d),shown:false};
}
function fractionSvg(n,d,mode="circle"){
  const size=170, cx=85, cy=85, r=67;
  if(mode==="bar"){
    const gap=2,w=150/d;
    let cells="";
    for(let i=0;i<d;i++){
      const x=10+i*w;
      cells+=`<rect x="${x+gap/2}" y="55" width="${w-gap}" height="60" rx="5" fill="${i<n?"#6c5ce7":"#e7eaf2"}"/>`;
    }
    return `<svg viewBox="0 0 170 170" role="img" aria-label="${n} de ${d} partes">${cells}</svg>`;
  }
  let pieces="";
  for(let i=0;i<d;i++){
    const a0=-Math.PI/2+(2*Math.PI*i/d),a1=-Math.PI/2+(2*Math.PI*(i+1)/d);
    const x1=cx+r*Math.cos(a0),y1=cy+r*Math.sin(a0),x2=cx+r*Math.cos(a1),y2=cy+r*Math.sin(a1);
    const large=(a1-a0)>Math.PI?1:0;
    pieces+=`<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z" fill="${i<n?"#6c5ce7":"#e7eaf2"}" stroke="#fff" stroke-width="2"/>`;
  }
  return `<svg viewBox="0 0 170 170" role="img" aria-label="${n} de ${d} partes">${pieces}<circle cx="85" cy="85" r="67" fill="none" stroke="#4f40c3" stroke-width="2"/></svg>`;
}
function newGraphQ(){
  const d=choice([2,3,4,5,6,8,9,10]);
  graphQ={n:rand(1,d),d,selected:null,checked:false};
  graphQ.correctIndex=rand(0,3);
}
function graphOptionData(){
  const target={n:graphQ.n,d:graphQ.d};
  const list=[
    target,
    {n:Math.max(1,graphQ.n-1),d:graphQ.d},
    {n:Math.min(graphQ.d,graphQ.n+1),d:graphQ.d},
    {n:graphQ.n,d:choice([2,3,4,5,6,8,9,10].filter(x=>x!==graphQ.d))}
  ];
  const unique=[];
  for(const x of shuffle(list)){
    if(!unique.some(y=>y.n===x.n&&y.d===x.d))unique.push(x);
  }
  while(unique.length<4){
    const d=choice([2,3,4,5,6,8,9,10]),n=rand(1,d);
    if(!unique.some(y=>y.n===n&&y.d===d))unique.push({n,d});
  }
  const correctIndex=unique.findIndex(x=>x.n===graphQ.n&&x.d===graphQ.d);
  return {unique,correctIndex};
}
function newCompare(){
  const d=choice([2,3,4,5,6,8,10]);
  let a=rand(1,d),b=rand(1,d);
  if(Math.random()<.25)b=a;
  compareQ={a:{n:a,d},b:{n:b,d},answer:compare(a/d,b/d),selected:null,checked:false};
}
function newEquiv(){
  const d=choice([2,3,4,5,6]);
  const n=rand(1,d-1);
  const m=choice([2,3]);
  const isEquivalent=Math.random()<.5;
  const n2=isEquivalent?n*m:choice([n*m+1,Math.max(1,n*m-1)]);
  const d2=isEquivalent?d*m:choice([d*m+1,Math.max(2,d*m-1)]);
  equivQ={a:{n,d},b:{n:n2,d:d2},answer:isEquivalent,selected:null,checked:false};
}
function createPractice(){
  const type=choice(["fraction","compare","equiv","word"]);
  if(type==="compare"){
    const d=choice([2,3,4,5,6,8,10]),a=rand(1,d),b=rand(1,d);
    practiceQ={type,text:"¿Qué símbolo completa la comparación?",options:["<","=",">"],
      correct:compare(a/d,b/d),meta:{a:{n:a,d},b:{n:b,d}},selected:null,checked:false};
  }else if(type==="equiv"){
    const d=choice([2,3,4]),n=rand(1,d-1),m=choice([2,3]),correct=n*m,den=d*m;
    practiceQ={type,text:`¿Qué numerador falta para que ${fractionText("?",den)} sea equivalente a ${fractionText(n,d)}?`,
      options:shuffle([String(correct),String(Math.max(1,correct-1)),String(correct+1),String(den)]),
      correct:String(correct),meta:{n,d,den},selected:null,checked:false};
  }else if(type==="word"){
    const d=choice([2,3,4,5,6]),n=rand(1,d-1);
    const objects=choice(["una pizza","una torta","una barra de chocolate","una bandeja de frutas"]);
    practiceQ={type,text:`${objects[0].toUpperCase()+objects.slice(1)} se divide en ${d} partes iguales y ${n} partes se toman. ¿Qué fracción representa la parte tomada?`,
      options:shuffle([fractionText(n,d),fractionText(Math.max(1,n-1),d),fractionText(Math.min(d,n+1),d),fractionText(n,Math.min(10,d+1))]),
      correct:fractionText(n,d),meta:{n,d},selected:null,checked:false};
  }else{
    const d=choice([2,3,4,5,6,8]),n=rand(1,d);
    const opts=new Set([fractionText(n,d)]);
    while(opts.size<4)opts.add(fractionText(rand(1,d),d));
    practiceQ={type,text:`¿Qué fracción representa ${n} de ${d} partes iguales?`,
      options:shuffle([...opts]),correct:fractionText(n,d),meta:{n,d},selected:null,checked:false};
  }
}

/* ---------------- RENDER ---------------- */
function render(){
  updateStats();markActive(state.view);
  const views={home:renderHome,concepto:renderConcepto,partes:renderPartes,lectura:renderLectura,
    representacion:renderRepresentacion,comparacion:renderComparacion,equivalentes:renderEquivalentes,
    practica:renderPractica,evaluacion:renderEvaluacion};
  app.innerHTML=views[state.view]();
  bindViewEvents();
}
function renderHome(){
  const cards=[
    ["🍕","¿Qué es una fracción?","Partes iguales de un todo.","concepto"],
    ["🔢","Sus partes","Numerador y denominador.","partes"],
    ["📖","Aprende a leerlas","Nombres y lectura con ejemplos.","lectura"],
    ["🟦","¡Represéntalas!","Escoge la figura que muestra la fracción.","representacion"],
    ["⚖️","Compáralas","Usa <, > o =.","comparacion"],
    ["🧩","Equivalentes","Descubre cuándo dos fracciones valen lo mismo.","equivalentes"],
    ["🎯","Practica","Problemas aleatorios e infinitos.","practica"],
    ["🏆","Evaluación final","10 preguntas nuevas en cada intento.","evaluacion"]
  ];
  return `<section class="view">
    <div class="hero"><div><div class="eyebrow">APRENDE · JUEGA · PRACTICA</div><h2>Tu ruta de fraccionarios</h2>
    <p>Avanza por las lecciones, responde retos y gana puntos mientras aprendes a leer, representar, comparar y reconocer fracciones equivalentes.</p></div><div class="hero-art" aria-hidden="true">🍕➗🧩</div></div>
    <div class="section-head"><div><div class="kicker">APRENDE</div><h2>Todo sobre fracciones</h2></div><span class="badge">🔥 Racha máxima: ${state.bestStreak}</span></div>
    <div class="cards">${cards.map(c=>`<article class="card action-card" data-go="${c[3]}" tabindex="0" role="button"><div class="icon">${c[0]}</div><h3>${c[1]}</h3><p>${c[2]}</p></article>`).join("")}</div>
    <div class="callout"><div><strong>🏆 ${state.evaluationsCompleted} evaluación(es) completada(s)</strong><span>La evaluación genera preguntas nuevas para cada intento.</span></div><button class="btn" data-go="evaluacion">Ir al reto final</button></div>
  </section>`;
}
function renderConcepto(){
  return `<section class="view"><div class="section-head"><div><div class="kicker">LECCIÓN 1</div><h2>🍕 ¿Qué es una fracción?</h2><p>Una fracción nos dice cuántas partes iguales tomamos de un todo.</p></div></div>
  <div class="panel"><div class="object-picker"><button class="object-btn active" data-object="pizza">🍕 Pizza</button><button class="object-btn" data-object="cake">🍰 Pastel</button><button class="object-btn" data-object="chocolate">🍫 Chocolate</button></div>
  <div id="objectStage" class="visual-stage"><div class="pizza" aria-label="Pizza dividida visualmente"></div></div>
  <div class="grid-3"><div class="explain-row"><strong>1. Un todo</strong><span>Tenemos un objeto completo.</span></div><div class="explain-row"><strong>2. Partes iguales</strong><span>Lo dividimos en partes del mismo tamaño.</span></div><div class="explain-row"><strong>3. Fracción</strong><span>Elegimos algunas partes.</span></div></div></div></section>`;
}
function renderPartes(){
  const n=partState.n,d=partState.d;
  return `<section class="view"><div class="section-head"><div><div class="kicker">LECCIÓN 2</div><h2>🔢 Numerador y denominador</h2><p>Cambia los números y observa cómo cambia la cantidad representada.</p></div></div>
  <div class="grid-2"><div class="panel center"><div class="fraction-control">
  <div class="stepper"><button data-step="num" data-delta="-1" aria-label="Disminuir numerador">−</button><strong id="partNum">${n}</strong><button data-step="num" data-delta="1" aria-label="Aumentar numerador">+</button></div>
  ${fractionHTML(n,d,true)}
  <div class="stepper"><button data-step="den" data-delta="-1" aria-label="Disminuir denominador">−</button><strong id="partDen">${d}</strong><button data-step="den" data-delta="1" aria-label="Aumentar denominador">+</button></div>
  </div><div id="partVisual" class="visual-stage"></div></div>
  <div class="panel"><h3>¿Qué significa cada número?</h3><div class="explain-list">
  <div class="explain-row"><strong>Numerador: <span id="numExplain">${n}</span></strong><span>Está arriba e indica cuántas partes tomamos.</span></div>
  <div class="explain-row"><strong>Denominador: <span id="denExplain">${d}</span></strong><span>Está abajo e indica en cuántas partes iguales dividimos el todo.</span></div>
  <div class="explain-row"><strong>⭐ Recuerda</strong><span>El denominador no puede ser 0. En estas actividades usamos fracciones propias.</span></div></div></div></div></section>`;
}
const partState={n:3,d:5};
function updatePartVisual(){
  const stage=document.getElementById("partVisual"); if(!stage)return;
  const d=partState.d,n=partState.n;
  stage.innerHTML=`<div class="click-grid" style="grid-template-columns:repeat(${d<=5?d:Math.ceil(Math.sqrt(d))},1fr);width:min(420px,100%)">${Array.from({length:d},(_,i)=>`<div class="click-cell ${i<n?"selected":""}" aria-hidden="true"></div>`).join("")}</div>`;
}
function renderLectura(){
  if(!readingQ.d)newReading();
  const percent=readingQ.n/readingQ.d*100;
  return `<section class="view"><div class="section-head"><div><div class="kicker">LECCIÓN 3</div><h2>📖 Lectura de fracciones</h2><p>Mira la fracción y comprueba cómo se lee.</p></div></div>
  <div class="panel reading-card"><div class="mini-visual center">${fractionSvg(readingQ.n,readingQ.d)}</div><div>
  <div class="center">${fractionHTML(readingQ.n,readingQ.d,true)}</div><p class="muted">El denominador ${readingQ.d} se llama <strong>${NAMES[readingQ.d]}</strong>.</p>
  <div id="readingAnswer" class="reading-answer ${readingQ.shown?"":"reading-hidden"}">Se lee: “${readingName(readingQ.n,readingQ.d)}”.</div>
  <div class="controls-row"><button id="showReading" class="btn secondary">${readingQ.shown?"Ocultar solución":"Ver solución"}</button><button id="nextReading" class="btn">Siguiente ➜</button></div>
  </div></div>
  <div class="grid-3" style="margin-top:18px">${[2,3,4].map(d=>`<div class="card center"><div class="icon">${fractionHTML(1,d,true)}</div><h3>${NAMES[d]}</h3><p>Ejemplo: ${readingName(1,d)}.</p></div>`).join("")}</div></section>`;
}
function renderRepresentacion(){
  if(!graphQ)newGraphQ();
  const data=graphOptionData();
  graphQ.options=data.unique;graphQ.correctIndex=data.correctIndex;
  return `<section class="view"><div class="section-head"><div><div class="kicker">LECCIÓN 4</div><h2>🟦 Representación gráfica</h2><p>Observa las cuatro opciones y elige la que representa exactamente la fracción.</p></div></div>
  <div class="panel graph-board"><div class="target-box">Busca la representación de <strong>${fractionHTML(graphQ.n,graphQ.d,true)}</strong>.</div>
  <div class="graph-options">${data.unique.map((o,i)=>`<button class="graph-option ${graphQ.checked&&i===graphQ.correctIndex?"correct":""} ${graphQ.checked&&graphQ.selected===i&&i!==graphQ.correctIndex?"wrong":""}" data-graph-option="${i}" ${graphQ.checked?"disabled":""}>${fractionSvg(o.n,o.d,i%2?"bar":"circle")}<strong>${fractionText(o.n,o.d)}</strong></button>`).join("")}</div>
  <div id="graphFeedback">${graphQ.checked?`<div class="feedback ${graphQ.selected===graphQ.correctIndex?"correct":"incorrect"}">${graphQ.selected===graphQ.correctIndex?"🎉 ¡Correcto! +100 puntos.":"💡 Observa de nuevo: la opción correcta es la que pinta "+graphQ.n+" de "+graphQ.d+" partes."}</div>`:""}</div>
  <div class="controls-row" style="justify-content:center;margin-top:14px"><button id="nextGraph" class="btn secondary">Nueva figura</button></div></div></section>`;
}
function renderComparacion(){
  if(!compareQ)newCompare();
  return `<section class="view"><div class="section-head"><div><div class="kicker">LECCIÓN 5</div><h2>⚖️ Comparar fracciones</h2><p>Elige &lt;, &gt; o = y después comprueba tu respuesta.</p></div></div>
  <div class="panel comparison-question"><div class="compare-fractions">${fractionHTML(compareQ.a.n,compareQ.a.d,true)} <span>?</span> ${fractionHTML(compareQ.b.n,compareQ.b.d,true)}</div>
  <div class="grid-2" style="margin:20px 0"><div class="card center">${fractionSvg(compareQ.a.n,compareQ.a.d)}<strong>${fractionText(compareQ.a.n,compareQ.a.d)}</strong></div><div class="card center">${fractionSvg(compareQ.b.n,compareQ.b.d)}<strong>${fractionText(compareQ.b.n,compareQ.b.d)}</strong></div></div>
  <div class="symbols">${["<","=",">"].map(s=>`<button class="symbol-btn ${compareQ.selected===s?"active":""}" data-symbol="${s}">${s}</button>`).join("")}</div>
  <div class="controls-row" style="justify-content:center;margin-top:20px"><button id="checkCompare" class="btn success">Comprobar</button><button id="nextCompare" class="btn secondary">Otra pregunta</button></div>
  <div id="compareFeedback">${compareQ.checked?compareFeedbackHTML():""}</div></div></section>`;
}
function compareFeedbackHTML(){
  const ok=compareQ.selected===compareQ.answer;
  const a=compareQ.a.n,b=compareQ.b.n,d=compareQ.a.d;
  const reason=compareQ.answer==="="?`Ambas tienen ${a} partes tomadas de ${d}.`:`Como tienen el mismo denominador (${d}), basta comparar los numeradores: ${a} ${compareQ.answer} ${b}.`;
  return `<div class="feedback ${ok?"correct":"incorrect"}">${ok?"🎉 ¡Muy bien!":"💡 La respuesta correcta es"} <strong>${compareQ.answer}</strong>. ${reason}</div>`;
}
function renderEquivalentes(){
  if(!equivQ)newEquiv();
  const a=equivQ.a,b=equivQ.b;
  return `<section class="view"><div class="section-head"><div><div class="kicker">LECCIÓN 6</div><h2>🧩 Fracciones equivalentes</h2><p>Observa las figuras: ¿representan la misma cantidad?</p></div></div>
  <div class="panel"><div class="equiv-figures"><div class="center"><h3>Primera fracción</h3>${fractionSvg(a.n,a.d)}<div class="equation">${fractionHTML(a.n,a.d,true)}</div></div>
  <div class="center"><h3>Segunda fracción</h3>${fractionSvg(b.n,b.d)}<div class="equation">${fractionHTML(b.n,b.d,true)}</div></div></div>
  <div class="symbols" style="margin-top:22px"><button class="yesno ${equivQ.selected===true?"active":""}" data-equiv="true">✅ Sí, son equivalentes</button><button class="yesno ${equivQ.selected===false?"active":""}" data-equiv="false">❌ No son equivalentes</button></div>
  <div class="controls-row" style="justify-content:center;margin-top:17px"><button id="checkEquiv" class="btn success">Comprobar</button><button id="newEquiv" class="btn secondary">Cambiar fracción</button></div>
  <div id="equivFeedback">${equivQ.checked?equivFeedbackHTML():""}</div></div></section>`;
}
function equivFeedbackHTML(){
  const ok=equivQ.selected===equivQ.answer;
  const sa=simplify(equivQ.a.n,equivQ.a.d),sb=simplify(equivQ.b.n,equivQ.b.d);
  const explanation=equivQ.answer?`Sí. Al simplificar, ambas quedan como ${sa.n}/${sa.d}.`:`No. Al simplificar obtenemos ${sa.n}/${sa.d} y ${sb.n}/${sb.d}.`;
  return `<div class="feedback ${ok?"correct":"incorrect"}">${ok?"🎉 ¡Excelente!":"💡 Mira la explicación:"} ${explanation}</div>`;
}
function practiceVisual(q){
  if(q.type==="compare")return `<div class="compare-fractions">${fractionHTML(q.meta.a.n,q.meta.a.d)} <span>?</span> ${fractionHTML(q.meta.b.n,q.meta.b.d)}</div>`;
  if(q.type==="equiv")return `<div class="center">${fractionHTML(q.meta.n,q.meta.d,true)} <span style="font-size:28px">=</span> ${fractionHTML("?",q.meta.den,true)}</div>`;
  return `<div class="center">${fractionSvg(q.meta.n,q.meta.d)}</div>`;
}
function practiceFeedbackHTML(){
  const ok=String(practiceQ.selected)===String(practiceQ.correct);
  if(practiceQ.type==="compare")return `<div class="feedback ${ok?"correct":"incorrect"}">${ok?"🎉 ¡Correcto!":"💡 La respuesta correcta es"} <strong>${practiceQ.correct}</strong>.</div>`;
  return `<div class="feedback ${ok?"correct":"incorrect"}">${ok?"🎉 ¡Excelente!":"💡 La respuesta correcta es"} <strong>${escapeHTML(practiceQ.correct)}</strong>. ${practiceQ.type==="word"?"El numerador indica las partes tomadas y el denominador las partes iguales del todo.":""}</div>`;
}
function renderPractica(){
  if(!practiceQ)createPractice();
  const q=practiceQ;
  return `<section class="view"><div class="section-head"><div><div class="kicker">LECCIÓN 7</div><h2>🎯 Práctica y razonamiento</h2><p>Cada reto es aleatorio. Puedes practicar tantas veces como quieras.</p></div></div>
  <div class="panel practice-box"><div class="question-number">RETO ALEATORIO</div>${q.type==="compare"?practiceVisual(q):""}
  <div class="question-text">${q.text}</div>${q.type!=="compare"?practiceVisual(q):""}
  <div class="answer-grid">${q.options.map(o=>`<button class="answer-btn ${q.selected===String(o)?"selected":""} ${q.checked&&String(o)===String(q.correct)?"correct":""} ${q.checked&&q.selected===String(o)&&String(o)!==String(q.correct)?"wrong":""}" data-practice-answer="${escapeHTML(String(o))}" ${q.checked?"disabled":""}>${escapeHTML(String(o))}</button>`).join("")}</div>
  <div class="controls-row" style="margin-top:18px;justify-content:center"><button id="checkPractice" class="btn success" ${q.checked?"disabled":""}>Verificar respuesta</button><button id="nextPractice" class="btn">Siguiente pregunta ➜</button></div>
  <div id="practiceFeedback">${q.checked?practiceFeedbackHTML():""}</div></div></section>`;
}

/* ---------------- EVALUATION ---------------- */
function qReading(){const d=choice([2,3,4,5,6,7,8]),n=rand(1,d);return {text:`¿Cómo se lee ${fractionText(n,d)}?`,options:shuffle([readingName(n,d),readingName(Math.max(1,n-1),d),readingName(n,Math.min(10,d+1)),`${n} unidades`]),correct:readingName(n,d)}}
function qNumerator(){const d=choice([2,3,4,5,6,8]),n=rand(1,d);return {text:`¿Cuál es el numerador de ${fractionText(n,d)}?`,options:shuffle([String(n),String(d),String(n+1),String(Math.max(1,n-1))]),correct:String(n)}}
function qDenominator(){const d=choice([2,3,4,5,6,8]),n=rand(1,d);return {text:`¿Cuál es el denominador de ${fractionText(n,d)}?`,options:shuffle([String(d),String(n),String(d+1),String(Math.max(2,d-1))]),correct:String(d)}}
function qCompare(){const d=choice([2,3,4,5,6,8]),a=rand(1,d),b=rand(1,d);return {text:`Completa: ${fractionText(a,d)} ___ ${fractionText(b,d)}`,options:["<","=",">"],correct:compare(a/d,b/d)}}
function qRepresent(){const d=choice([2,3,4,5,6]),n=rand(1,d);return {text:`¿Qué fracción representa ${n} de ${d} partes iguales?`,options:shuffle([fractionText(n,d),fractionText(d,n),fractionText(Math.max(1,n-1),d),fractionText(n,Math.min(10,d+1))]),correct:fractionText(n,d)}}
function qEquivalent(){const d=choice([2,3,4]),n=rand(1,d-1),m=choice([2,3]);return {text:`¿Cuál fracción es equivalente a ${fractionText(n,d)}?`,options:shuffle([fractionText(n*m,d*m),fractionText(n+1,d),fractionText(n,d+1),fractionText(d,n)]),correct:fractionText(n*m,d*m)}}
function qWord(){const d=choice([2,3,4,5,6]),n=rand(1,d-1);return {text:`Una pizza se divide en ${d} partes iguales y se comen ${n}. ¿Qué fracción representa lo que se comió?`,options:shuffle([fractionText(n,d),fractionText(d-n,d),fractionText(n+1,d),fractionText(n,d+1)]),correct:fractionText(n,d)}}
function qNumeratorMeaning(){const d=choice([2,3,4,5,6]),n=rand(1,d);return {text:`En ${fractionText(n,d)}, ¿qué indica el número ${n}?`,options:shuffle(["Cuántas partes tomamos","En cuántas partes se divide el todo","El número de objetos","La cantidad de preguntas"]),correct:"Cuántas partes tomamos"}}
function qDenominatorMeaning(){const d=choice([2,3,4,5,6]),n=rand(1,d);return {text:`En ${fractionText(n,d)}, ¿qué indica el número ${d}?`,options:shuffle(["En cuántas partes iguales se divide el todo","Cuántas partes tomamos","El tamaño del objeto","Cuántos puntos ganamos"]),correct:"En cuántas partes iguales se divide el todo"}}
const questionFactories=[qReading,qNumerator,qDenominator,qCompare,qRepresent,qEquivalent,qWord,qNumeratorMeaning,qDenominatorMeaning];

function makeUniqueQuestions(){
  const questions=[],keys=new Set();
  while(questions.length<10){
    const q=choice(questionFactories)();
    const key=q.text+"|"+q.options.join("~");
    if(!keys.has(key)){keys.add(key);questions.push(q)}
  }
  return questions;
}
function startEvaluation(){
  state.evaluation={started:true,current:0,answers:Array(10).fill(null),questions:makeUniqueQuestions(),finished:false,score:0};
  save();navigate("evaluacion");
}
function renderEvaluacion(){
  const e=state.evaluation;
  if(!e.started)return `<section class="view"><div class="panel eval-start"><div class="trophy">🏆</div><div class="kicker">RETO FINAL</div><h2>Evaluación de Fraccionarios</h2><p class="muted">10 preguntas dinámicas. Cada respuesta correcta vale 100 puntos al confirmarse la evaluación.</p><div class="badges"><span class="badge">🎲 Test nuevo</span><span class="badge">⭐ 1000 puntos</span><span class="badge">💾 Guardado</span></div><button id="startEval" class="btn">Iniciar evaluación</button></div></section>`;
  if(e.finished)return renderEvalResult();
  const q=e.questions[e.current],selected=e.answers[e.current],pct=((e.current)/10)*100;
  return `<section class="view"><div class="panel"><div class="section-head"><div><div class="kicker">EVALUACIÓN FINAL</div><h2>Pregunta ${e.current+1} de 10</h2></div><strong>${e.answers.filter(x=>x!==null).length}/10 respondidas</strong></div>
  <div class="eval-progress"><div style="width:${pct}%"></div></div><div class="question-text">${q.text}</div>
  <div class="eval-options">${q.options.map(o=>`<button class="eval-option ${selected===String(o)?"selected":""}" data-eval-answer="${escapeHTML(String(o))}">${escapeHTML(String(o))}</button>`).join("")}</div>
  <div class="controls-row" style="margin-top:20px;justify-content:space-between"><button id="prevEval" class="btn secondary" ${e.current===0?"disabled":""}>← Anterior</button>${e.current<9?`<button id="nextEval" class="btn" ${selected===null?"disabled":""}>Siguiente →</button>`:`<button id="finishEval" class="btn gold" ${selected===null?"disabled":""}>Finalizar 🏆</button>`}</div>
  </div></section>`;
}
function renderEvalResult(){
  const e=state.evaluation,pct=e.score*10;
  const msg=e.score>=9?"🌟 ¡Excelente! Dominas muy bien los fraccionarios.":e.score>=7?"👏 ¡Muy bien!":e.score>=5?"💪 Buen trabajo. Repasa y vuelve a intentarlo.":"🌱 Vas por buen camino. Practica un poco más.";
  const medal=e.score===10?"👑 Medalla de oro":e.score>=8?"🥇 Medalla de gran dominio":e.score>=6?"🥈 Medalla de progreso":"🌱 Medalla de perseverancia";
  return `<section class="view"><div class="panel eval-result"><div class="trophy">🏆</div><div class="kicker">RESULTADO FINAL</div><h2>${msg}</h2><div class="score-ring" style="--score-angle:${pct}%"><span>${e.score}/10</span></div><h3>${e.score*100} puntos en esta evaluación</h3><div class="badges"><span class="badge">✅ ${e.score} aciertos</span><span class="badge">❌ ${10-e.score} para repasar</span><span class="badge">${medal}</span><span class="badge">⭐ Récord: ${state.bestScore}/10</span></div>
  <div class="controls-row" style="justify-content:center"><button id="retryEval" class="btn">🔄 Nueva evaluación</button><button id="backHome" class="btn secondary">Volver al inicio</button></div></div></section>`;
}

/* ---------------- EVENTS ---------------- */
function bindGlobalEvents(){
  document.querySelectorAll(".nav-btn[data-view]").forEach(btn=>btn.addEventListener("click",()=>navigate(btn.dataset.view)));
  document.getElementById("resetProgress").addEventListener("click",()=>document.getElementById("confirmModal").classList.remove("hidden"));
  document.getElementById("cancelReset").addEventListener("click",closeResetModal);
  document.getElementById("confirmReset").addEventListener("click",()=>{
    localStorage.removeItem(STORAGE_KEY);
    Object.assign(state,{view:"home",points:0,streak:0,bestStreak:0,bestScore:0,evaluationsCompleted:0});
    state.evaluation={started:false,current:0,answers:[],questions:[],finished:false,score:0};
    closeResetModal();notify("🧹 Progreso reiniciado");render();
  });
}
function closeResetModal(){document.getElementById("confirmModal").classList.add("hidden")}

function bindViewEvents(){
  document.querySelectorAll("[data-go]").forEach(el=>{
    const go=()=>navigate(el.dataset.go);
    el.addEventListener("click",go);
    el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}});
  });

  document.querySelectorAll("[data-object]").forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll("[data-object]").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
    const s=document.getElementById("objectStage");
    s.innerHTML=btn.dataset.object==="pizza"?'<div class="pizza" aria-label="Pizza dividida"></div>':btn.dataset.object==="cake"?'<div class="cake" aria-label="Pastel"></div>':'<div class="chocolate">'+Array.from({length:12},()=>"<span></span>").join("")+"</div>";
  }));

  document.querySelectorAll("[data-step]").forEach(btn=>btn.addEventListener("click",()=>{
    const type=btn.dataset.step,delta=Number(btn.dataset.delta);
    if(type==="num")partState.n=Math.max(1,Math.min(partState.d,partState.n+delta));
    else partState.d=Math.max(2,Math.min(10,partState.d+delta));
    if(partState.n>partState.d)partState.n=partState.d;
    render();
  }));
  if(state.view==="partes")updatePartVisual();

  const showReading=document.getElementById("showReading");
  if(showReading)showReading.addEventListener("click",()=>{readingQ.shown=!readingQ.shown;render()});
  const nextReading=document.getElementById("nextReading");
  if(nextReading)nextReading.addEventListener("click",()=>{newReading();render()});

  document.querySelectorAll("[data-graph-option]").forEach(btn=>btn.addEventListener("click",()=>{
    if(graphQ.checked)return;
    graphQ.selected=Number(btn.dataset.graphOption);graphQ.checked=true;render();
    if(graphQ.selected===graphQ.correctIndex)reward(true);else reward(false);
  }));
  const nextGraph=document.getElementById("nextGraph");
  if(nextGraph)nextGraph.addEventListener("click",()=>{newGraphQ();render()});

  document.querySelectorAll("[data-symbol]").forEach(btn=>btn.addEventListener("click",()=>{
    compareQ.selected=btn.dataset.symbol;compareQ.checked=false;render();
  }));
  const checkCompare=document.getElementById("checkCompare");
  if(checkCompare)checkCompare.addEventListener("click",()=>{
    if(!compareQ.selected){notify("Elige un símbolo primero");return}
    if(compareQ.checked)return;
    compareQ.checked=true;render();reward(compareQ.selected===compareQ.answer);
  });
  const nextCompare=document.getElementById("nextCompare");
  if(nextCompare)nextCompare.addEventListener("click",()=>{newCompare();render()});

  document.querySelectorAll("[data-equiv]").forEach(btn=>btn.addEventListener("click",()=>{
    equivQ.selected=btn.dataset.equiv==="true";equivQ.checked=false;render();
  }));
  const checkEquiv=document.getElementById("checkEquiv");
  if(checkEquiv)checkEquiv.addEventListener("click",()=>{
    if(equivQ.selected===null){notify("Elige Sí o No primero");return}
    if(equivQ.checked)return;
    equivQ.checked=true;render();reward(equivQ.selected===equivQ.answer);
  });
  const newEquivBtn=document.getElementById("newEquiv");
  if(newEquivBtn)newEquivBtn.addEventListener("click",()=>{newEquiv();render()});

  document.querySelectorAll("[data-practice-answer]").forEach(btn=>btn.addEventListener("click",()=>{
    if(practiceQ.checked)return;practiceQ.selected=btn.dataset.practiceAnswer;render();
  }));
  const checkPractice=document.getElementById("checkPractice");
  if(checkPractice)checkPractice.addEventListener("click",()=>{
    if(practiceQ.selected===null){notify("Elige una respuesta");return}
    if(practiceQ.checked)return;
    practiceQ.checked=true;const ok=String(practiceQ.selected)===String(practiceQ.correct);render();reward(ok);
  });
  const nextPractice=document.getElementById("nextPractice");
  if(nextPractice)nextPractice.addEventListener("click",()=>{createPractice();render()});

  const startEval=document.getElementById("startEval");
  if(startEval)startEval.addEventListener("click",startEvaluation);
  document.querySelectorAll("[data-eval-answer]").forEach(btn=>btn.addEventListener("click",()=>{
    state.evaluation.answers[state.evaluation.current]=btn.dataset.evalAnswer;save();render();
  }));
  const prevEval=document.getElementById("prevEval");
  if(prevEval)prevEval.addEventListener("click",()=>{state.evaluation.current=Math.max(0,state.evaluation.current-1);save();render()});
  const nextEval=document.getElementById("nextEval");
  if(nextEval)nextEval.addEventListener("click",()=>{if(state.evaluation.answers[state.evaluation.current]!==null){state.evaluation.current++;save();render()}});
  const finishEval=document.getElementById("finishEval");
  if(finishEval)finishEval.addEventListener("click",finishEvaluation);
  const retryEval=document.getElementById("retryEval");
  if(retryEval)retryEval.addEventListener("click",startEvaluation);
  const backHome=document.getElementById("backHome");
  if(backHome)backHome.addEventListener("click",()=>navigate("home"));
}
function finishEvaluation(){
  const e=state.evaluation;
  if(e.answers.some(a=>a===null))return;
  let score=0;e.questions.forEach((q,i)=>{if(String(e.answers[i])===String(q.correct))score++});
  e.score=score;e.finished=true;
  state.points+=score*100;
  state.evaluationsCompleted++;
  state.bestScore=Math.max(state.bestScore,score);
  if(score===10){
    state.streak++;state.bestStreak=Math.max(state.bestStreak,state.streak);
  }else state.streak=0;
  save();updateStats();render();notify(`🏆 Evaluación terminada: ${score}/10`);
}

load();
bindGlobalEvents();
render();
