(function(){
"use strict";
const C=window.MathForgeCore,$=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>Array.from(c.querySelectorAll(s));
const progressKey="mathforge-progress-v2";
let progress={answered:0,correct:0,lessons:0},session={answered:0,correct:0,current:null,locked:false};
try{progress={...progress,...JSON.parse(localStorage.getItem(progressKey)||"{}")}}catch(_){}
function saveProgress(){try{localStorage.setItem(progressKey,JSON.stringify(progress))}catch(_){}renderProgress()}
function renderProgress(){$("#totalAnswered").textContent=progress.answered;$("#totalCorrect").textContent=progress.correct;$("#lessonsOpened").textContent=progress.lessons;$("#accuracy").textContent=progress.answered?Math.round(progress.correct/progress.answered*100)+"%":"—"}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}

try{const t=localStorage.getItem("mathforge-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(_){}
$("#themeToggle").addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=next;try{localStorage.setItem("mathforge-theme",next)}catch(_){}drawGraph()});

const topics=window.MATHFORGE_TOPICS||[];
$("#topicGrid").innerHTML=topics.map(t=>`<button class="topic-card" type="button" data-topic="${esc(t.id)}"><span class="topic-icon">${esc(t.icon)}</span><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p></button>`).join("");
$$(".topic-card").forEach(card=>card.addEventListener("click",()=>{const t=topics.find(x=>x.id===card.dataset.topic);if(!t)return;$("#lessonContent").innerHTML=`<div class="lesson-kicker">${esc(t.level)} · mini lesson</div><h2>${esc(t.title)}</h2><p>${esc(t.intro)}</p><h3>Core ideas</h3><ul>${t.key.map(k=>`<li>${esc(k)}</li>`).join("")}</ul><h3>Worked example</h3><div class="lesson-example">${esc(t.example)}</div><div class="lesson-check"><strong>Quick check</strong><p>${esc(t.checkQuestion)}</p><details><summary>Show answer</summary><p>${esc(t.checkAnswer)}</p></details></div>`;$("#lessonDialog").showModal();progress.lessons++;saveProgress()}));
$("#closeLesson").addEventListener("click",()=>$("#lessonDialog").close());
$("#lessonDialog").addEventListener("click",e=>{if(e.target===$("#lessonDialog"))$("#lessonDialog").close()});

$$(".tool-tab").forEach(tab=>tab.addEventListener("click",()=>{$$(".tool-tab").forEach(x=>x.classList.toggle("active",x===tab));$$(".tool-panel").forEach(p=>p.classList.toggle("active",p.dataset.panel===tab.dataset.tool))}));

$("#linearForm").addEventListener("submit",e=>{e.preventDefault();const out=$("#linearResult");try{const r=C.solveLinear($("#linearInput").value);if(r.type==="one")out.innerHTML=`<strong>x = ${C.formatNumber(r.x)}</strong><br>Collect variable terms on one side: ${C.formatNumber(r.a)}x = ${C.formatNumber(r.b)}. Then divide by ${C.formatNumber(r.a)}.`;else if(r.type==="infinite")out.innerHTML="<strong>Infinitely many solutions.</strong><br>Both sides simplify to the same expression.";else out.innerHTML="<strong>No solution.</strong><br>The variable terms cancel but the constants disagree."}catch(err){out.textContent=err.message}});
$("#quadraticForm").addEventListener("submit",e=>{e.preventDefault();const out=$("#quadraticResult");try{const r=C.solveQuadratic($("#qa").value,$("#qb").value,$("#qc").value);if(r.type==="two-real")out.innerHTML=`<strong>x = ${C.formatNumber(r.r1)} or x = ${C.formatNumber(r.r2)}</strong><br>Discriminant = ${C.formatNumber(r.d)} > 0, so there are two real roots.`;else if(r.type==="double")out.innerHTML=`<strong>x = ${C.formatNumber(r.r)}</strong><br>The discriminant is 0, so there is one repeated real root.`;else out.innerHTML=`<strong>x = ${C.formatNumber(r.real)} ± ${C.formatNumber(r.imag)}i</strong><br>The discriminant is ${C.formatNumber(r.d)}, so the roots are complex.`}catch(err){out.textContent=err.message}});
$("#calcForm").addEventListener("submit",e=>{e.preventDefault();const out=$("#calcResult");try{out.innerHTML=`<strong>${C.formatNumber(C.evaluate($("#calcInput").value))}</strong>`}catch(err){out.textContent="Could not calculate: "+err.message}});
$$("[data-calc]").forEach(b=>b.addEventListener("click",()=>{$("#calcInput").value=b.dataset.calc;$("#calcForm").requestSubmit()}));
$("#tutorForm").addEventListener("submit",e=>{e.preventDefault();const q=$("#tutorInput").value.trim(),out=$("#tutorResult");if(!q){out.textContent="Type a question first.";return}const h=C.tutorHint(q);out.innerHTML=`<strong>${esc(h.title)}</strong><br>${esc(h.body)}`});

const canvas=$("#graphCanvas"),ctx=canvas.getContext("2d");
function niceStep(range){const rough=range/10,p=10**Math.floor(Math.log10(rough)),n=rough/p;return(n<2?1:n<5?2:5)*p}
function cssVar(name){return getComputedStyle(document.documentElement).getPropertyValue(name).trim()}
function drawGraph(){
 const xmin=Number($("#xMin").value),xmax=Number($("#xMax").value),ymin=Number($("#yMin").value),ymax=Number($("#yMax").value),expr=$("#graphExpression").value,msg=$("#graphMessage");
 if(!(xmin<xmax&&ymin<ymax)){msg.textContent="Each minimum must be smaller than its maximum.";return}
 const rect=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2),W=Math.max(500,Math.round(rect.width*dpr)),H=Math.max(360,Math.round(440*dpr));canvas.width=W;canvas.height=H;
 ctx.fillStyle=cssVar("--bg2");ctx.fillRect(0,0,W,H);const tx=x=>(x-xmin)/(xmax-xmin)*W,ty=y=>H-(y-ymin)/(ymax-ymin)*H;
 ctx.strokeStyle=cssVar("--line");ctx.lineWidth=dpr;const xs=niceStep(xmax-xmin),ys=niceStep(ymax-ymin);
 for(let x=Math.ceil(xmin/xs)*xs;x<=xmax;x+=xs){const px=tx(x);ctx.beginPath();ctx.moveTo(px,0);ctx.lineTo(px,H);ctx.stroke()}
 for(let y=Math.ceil(ymin/ys)*ys;y<=ymax;y+=ys){const py=ty(y);ctx.beginPath();ctx.moveTo(0,py);ctx.lineTo(W,py);ctx.stroke()}
 ctx.strokeStyle=cssVar("--muted");ctx.lineWidth=1.4*dpr;if(xmin<=0&&xmax>=0){const px=tx(0);ctx.beginPath();ctx.moveTo(px,0);ctx.lineTo(px,H);ctx.stroke()}if(ymin<=0&&ymax>=0){const py=ty(0);ctx.beginPath();ctx.moveTo(0,py);ctx.lineTo(W,py);ctx.stroke()}
 ctx.strokeStyle=cssVar("--accent");ctx.lineWidth=2.5*dpr;ctx.beginPath();let valid=0,started=false,last=null;
 for(let px=0;px<=W;px+=Math.max(1,dpr)){const x=xmin+px/W*(xmax-xmin);let y;try{y=C.evaluate(expr,"x",x)}catch(_){started=false;last=null;continue}const py=ty(y);if(!Number.isFinite(py)||py<-H*4||py>H*5||(last!==null&&Math.abs(py-last)>H*.65)){started=false;last=null;continue}if(!started){ctx.moveTo(px,py);started=true}else ctx.lineTo(px,py);last=py;valid++}
 ctx.stroke();msg.innerHTML=valid?`Plotting <code>y = ${esc(expr)}</code>`:"No visible real values in this range."
}
$("#plotButton").addEventListener("click",drawGraph);$$("[data-graph]").forEach(b=>b.addEventListener("click",()=>{$("#graphExpression").value=b.dataset.graph;drawGraph()}));let rt;window.addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(drawGraph,120)});

function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function newQuestion(){const kind=rand(0,3);let text,answer,topic,tolerance=1e-9;if(kind===0){const a=rand(3,18),b=rand(2,18);text=`${a} × ${b} = ?`;answer=a*b;topic="Arithmetic"}else if(kind===1){const x=rand(-9,12),a=rand(2,9),b=rand(-12,12),c=a*x+b;text=`${a}x ${b>=0?"+":"−"} ${Math.abs(b)} = ${c}`;answer=x;topic="Linear equations"}else if(kind===2){const base=rand(2,20)*10,p=[10,20,25,50][rand(0,3)];text=`${p}% of ${base} = ?`;answer=p/100*base;topic="Percentages"}else{const a=rand(3,15),b=rand(3,15);text=`√(${a*a} + ${b*b}) ≈ ?`;answer=Math.sqrt(a*a+b*b);topic="Geometry · round to 2 decimals";tolerance=.011}session.current={answer,tolerance};session.locked=false;$("#practiceTopic").textContent=topic;$("#questionCount").textContent=`Question ${session.answered+1}`;$("#practiceQuestion").textContent=text;$("#practiceAnswer").value="";$("#practiceAnswer").disabled=false;$("#practiceFeedback").textContent="";$("#practiceFeedback").className="practice-feedback";$("#nextQuestion").classList.add("hidden")}
function updateSession(){$("#scoreValue").textContent=`${session.correct} / ${session.answered}`;$("#scoreBar").style.width=session.answered?`${session.correct/session.answered*100}%`:"0%"}
$("#practiceForm").addEventListener("submit",e=>{e.preventDefault();if(session.locked)return;const value=Number($("#practiceAnswer").value);if(!Number.isFinite(value)){$("#practiceFeedback").textContent="Enter a numeric answer.";return}const right=Math.abs(value-session.current.answer)<=session.current.tolerance;session.answered++;progress.answered++;if(right){session.correct++;progress.correct++}session.locked=true;$("#practiceAnswer").disabled=true;$("#practiceFeedback").className="practice-feedback "+(right?"correct":"incorrect");$("#practiceFeedback").textContent=right?"Correct — nice work.":`Not quite. The answer is ${C.formatNumber(session.current.answer)}.`;$("#nextQuestion").classList.remove("hidden");updateSession();saveProgress()});
$("#nextQuestion").addEventListener("click",newQuestion);$("#resetPractice").addEventListener("click",()=>{session={answered:0,correct:0,current:null,locked:false};updateSession();newQuestion()});$("#resetAllProgress").addEventListener("click",()=>{progress={answered:0,correct:0,lessons:0};saveProgress()});
$("#year").textContent=new Date().getFullYear();renderProgress();updateSession();newQuestion();setTimeout(drawGraph,60);
})();
