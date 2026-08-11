(() => {
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const storeKey = "mathforge-progress-v1";
  let state = { answered: 0, correct: 0, lessons: 0 };
  let session = { answered: 0, correct: 0, current: null, locked: false };

  try {
    state = { ...state, ...(JSON.parse(localStorage.getItem(storeKey)) || {}) };
  } catch {}

  function save() {
    localStorage.setItem(storeKey, JSON.stringify(state));
    renderProgress();
  }

  function renderProgress() {
    $("#totalAnswered").textContent = state.answered;
    $("#totalCorrect").textContent = state.correct;
    $("#lessonsOpened").textContent = state.lessons;
    $("#accuracy").textContent = state.answered ? `${Math.round(state.correct / state.answered * 100)}%` : "—";
  }

  // Theme
  const savedTheme = localStorage.getItem("mathforge-theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  $("#themeToggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("mathforge-theme", next);
    drawGraph();
  });

  // Lessons
  const topics = window.MATHFORGE_TOPICS || [];
  $("#topicGrid").innerHTML = topics.map(t => `
    <button class="topic-card" data-topic="${t.id}" type="button">
      <span class="topic-icon">${t.icon}</span>
      <h3>${t.title}</h3>
      <p>${t.description}</p>
    </button>`).join("");

  $$(".topic-card").forEach(card => card.addEventListener("click", () => {
    const t = topics.find(x => x.id === card.dataset.topic);
    if (!t) return;
    $("#lessonContent").innerHTML = `
      <div class="lesson-kicker">${t.level} · mini lesson</div>
      <h2>${t.title}</h2>
      <p>${t.intro}</p>
      <h3>Core ideas</h3>
      <ul>${t.key.map(k => `<li>${k}</li>`).join("")}</ul>
      <h3>Worked example</h3>
      <div class="lesson-example">${t.example}</div>
      <h3>Remember</h3>
      <p>Understanding the structure is more valuable than memorizing a single procedure. Try changing the numbers in the example and predict what changes before calculating.</p>`;
    $("#lessonDialog").showModal();
    state.lessons++;
    save();
    if (window.MathJax?.typesetPromise) MathJax.typesetPromise([$("#lessonContent")]);
  }));
  $("#closeLesson").addEventListener("click", () => $("#lessonDialog").close());
  $("#lessonDialog").addEventListener("click", e => {
    const box = e.currentTarget.getBoundingClientRect();
    if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) e.currentTarget.close();
  });

  // Tool tabs
  $$(".tool-tab").forEach(tab => tab.addEventListener("click", () => {
    $$(".tool-tab").forEach(x => x.classList.toggle("active", x === tab));
    $$(".tool-panel").forEach(p => p.classList.toggle("active", p.dataset.panel === tab.dataset.tool));
  }));

  // Linear solver: parse ax+b=c with flexible signs.
  $("#linearForm").addEventListener("submit", e => {
    e.preventDefault();
    const raw = $("#linearInput").value.toLowerCase().replace(/\s+/g, "").replace(/\*/g, "");
    const sides = raw.split("=");
    const out = $("#linearResult");
    if (sides.length !== 2) return out.innerHTML = "Use an equation with exactly one equals sign, such as <strong>3x + 7 = 22</strong>.";
    const parseSide = s => {
      s = s.replace(/-/g, "+-");
      let a = 0, b = 0;
      for (let term of s.split("+").filter(Boolean)) {
        if (term.includes("x")) {
          let c = term.replace("x", "");
          if (c === "" || c === "+") c = "1";
          if (c === "-") c = "-1";
          if (!Number.isFinite(Number(c))) return null;
          a += Number(c);
        } else {
          if (!Number.isFinite(Number(term))) return null;
          b += Number(term);
        }
      }
      return [a,b];
    };
    const L = parseSide(sides[0]), R = parseSide(sides[1]);
    if (!L || !R) return out.textContent = "I couldn't parse that equation. Try a simple linear form like 2x - 4 = 10.";
    const a = L[0] - R[0], b = R[1] - L[1];
    if (Math.abs(a) < 1e-12) {
      out.innerHTML = Math.abs(b) < 1e-12 ? "<strong>Infinitely many solutions.</strong> Both sides are equivalent." : "<strong>No solution.</strong> The x-terms cancel but the constants disagree.";
    } else {
      const x = b / a;
      out.innerHTML = `<strong>x = ${formatNumber(x)}</strong><br><span>Collect x-terms on one side and constants on the other: ${formatNumber(a)}x = ${formatNumber(b)}. Divide both sides by ${formatNumber(a)}.</span>`;
    }
  });

  // Quadratic solver
  $("#quadraticForm").addEventListener("submit", e => {
    e.preventDefault();
    const a = Number($("#qa").value), b = Number($("#qb").value), c = Number($("#qc").value);
    const out = $("#quadraticResult");
    if (![a,b,c].every(Number.isFinite)) return out.textContent = "Enter valid numeric coefficients.";
    if (Math.abs(a) < 1e-12) return out.textContent = "a cannot be 0 for a quadratic equation.";
    const d = b*b - 4*a*c;
    if (d > 0) {
      const r1 = (-b + Math.sqrt(d))/(2*a), r2 = (-b - Math.sqrt(d))/(2*a);
      out.innerHTML = `<strong>x = ${formatNumber(r1)} or x = ${formatNumber(r2)}</strong><br>Discriminant: ${formatNumber(d)}. Since it is positive, there are two real roots.`;
    } else if (Math.abs(d) < 1e-12) {
      const r = -b/(2*a);
      out.innerHTML = `<strong>x = ${formatNumber(r)}</strong><br>The discriminant is 0, so there is one repeated real root.`;
    } else {
      const real = -b/(2*a), imag = Math.sqrt(-d)/(2*Math.abs(a));
      out.innerHTML = `<strong>x = ${formatNumber(real)} ± ${formatNumber(imag)}i</strong><br>The discriminant is ${formatNumber(d)}, so the roots are complex.`;
    }
  });

  // Safe-ish expression evaluator: strict whitelist + explicit function mapping.
  function normalizeExpression(expr, variable = null, value = null) {
    let s = String(expr).toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[×·]/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/π/g, "pi");
    if (!s || s.length > 120) throw new Error("Expression is empty or too long.");
    if (!/^[0-9a-z+\-*/^().,]+$/.test(s)) throw new Error("Unsupported character.");
    const allowedNames = ["sin","cos","tan","asin","acos","atan","sqrt","abs","log","ln","exp","floor","ceil","round","pi","e"];
    const names = s.match(/[a-z]+/g) || [];
    for (const name of names) if (name !== variable && !allowedNames.includes(name)) throw new Error(`Unsupported term: ${name}`);
    if (variable) {
      s = s
        .replace(new RegExp(`(\\d|\\))${variable}\\b`, "g"), `$1*${variable}`)
        .replace(new RegExp(`\\b${variable}(?=\\d|\\()`, "g"), `${variable}*`);
    }
    s = s.replace(/(\d|\))(?=(pi|e|sin|cos|tan|asin|acos|atan|sqrt|abs|log|ln|exp|floor|ceil|round)\b)/g, "$1*");
    s = s.replace(/\^/g, "**");
    const replacements = {
      "asin":"Math.asin","acos":"Math.acos","atan":"Math.atan",
      "sin":"Math.sin","cos":"Math.cos","tan":"Math.tan","sqrt":"Math.sqrt",
      "abs":"Math.abs","log":"Math.log10","ln":"Math.log","exp":"Math.exp",
      "floor":"Math.floor","ceil":"Math.ceil","round":"Math.round"
    };
    Object.entries(replacements).forEach(([k,v]) => s = s.replace(new RegExp(`\\b${k}\\b`, "g"), v));
    s = s.replace(/\bpi\b/g, "Math.PI").replace(/\be\b/g, "Math.E");
    if (variable) s = s.replace(new RegExp(`\\b${variable}\\b`, "g"), `(${Number(value)})`);
    return s;
  }

  function evaluate(expr, variable = null, value = null) {
    const normalized = normalizeExpression(expr, variable, value);
    // Expression has passed a strict character/name whitelist before Function construction.
    const result = Function(`"use strict"; return (${normalized});`)();
    if (typeof result !== "number" || !Number.isFinite(result)) throw new Error("Result is not a finite real number.");
    return result;
  }

  $("#calcForm").addEventListener("submit", e => {
    e.preventDefault();
    try {
      const n = evaluate($("#calcInput").value);
      $("#calcResult").innerHTML = `<strong>${formatNumber(n)}</strong>`;
    } catch (err) {
      $("#calcResult").textContent = `Could not calculate that expression: ${err.message}`;
    }
  });
  $$("[data-expression]").forEach(b => b.addEventListener("click", () => {
    $("#calcInput").value = b.dataset.expression;
    $("#calcForm").requestSubmit();
  }));

  // Local guided tutor
  $("#tutorForm").addEventListener("submit", e => {
    e.preventDefault();
    const q = $("#tutorInput").value.trim().toLowerCase();
    const out = $("#tutorResult");
    if (!q) return out.textContent = "Type a math question first.";
    if (/(\d*\.?\d*)x\s*[+-]\s*\d/.test(q) || q.includes("linear equation")) {
      out.innerHTML = "<strong>Start by isolating the x-term.</strong><br>Undo addition or subtraction first, then undo multiplication or division. Whatever operation you apply to one side of an equation, apply to the other side too.";
    } else if (q.includes("quadratic") || q.includes("x^2") || q.includes("x²")) {
      out.innerHTML = "<strong>First identify a, b, and c.</strong><br>For \(ax^2+bx+c=0\), try factoring when the numbers are friendly. Otherwise use \(x=(-b\\pm\\sqrt{b^2-4ac})/(2a)\). The discriminant \(b^2-4ac\) tells you the root type.";
    } else if (q.includes("pythag") || q.includes("right triangle")) {
      out.innerHTML = "<strong>Use the side opposite the right angle as c.</strong><br>Then \(a^2+b^2=c^2\). If you need a missing leg, rearrange before taking the square root.";
    } else if (q.includes("derivative") || q.includes("differentiat")) {
      out.innerHTML = "<strong>Look for the function's structure first.</strong><br>For a power \(x^n\), the power rule gives \(nx^{n-1}\). Constants differentiate to 0. Apply sum, product, quotient, or chain rules as needed.";
    } else if (q.includes("percent") || q.includes("%")) {
      out.innerHTML = "<strong>Translate the percentage into a decimal.</strong><br>“p% of N” becomes \((p/100)\\times N\). For percentage change, divide the change by the original amount before multiplying by 100.";
    } else {
      out.innerHTML = "<strong>Break the problem into three parts:</strong><br>1) What is given? 2) What is unknown? 3) Which relationship connects them? Try rewriting the question as an equation, then use the most relevant tool or lesson on this page.";
    }
    if (window.MathJax?.typesetPromise) MathJax.typesetPromise([out]);
  });

  // Graphing
  const canvas = $("#graphCanvas");
  const ctx = canvas.getContext("2d");

  function canvasTheme() {
    const styles = getComputedStyle(document.documentElement);
    return {
      text: styles.getPropertyValue("--text").trim(),
      muted: styles.getPropertyValue("--muted").trim(),
      line: styles.getPropertyValue("--line").trim(),
      accent: styles.getPropertyValue("--accent").trim(),
      bg: styles.getPropertyValue("--bg-2").trim()
    };
  }

  function drawGraph() {
    const xMin = Number($("#xMin").value), xMax = Number($("#xMax").value), yMin = Number($("#yMin").value), yMax = Number($("#yMax").value);
    const expr = $("#graphExpression").value;
    const msg = $("#graphMessage");
    if (!(xMin < xMax && yMin < yMax)) return msg.textContent = "Minimum values must be smaller than maximum values.";

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(400, Math.round(rect.width * dpr));
    canvas.height = Math.max(300, Math.round(Math.max(rect.height, 440) * dpr));
    const W = canvas.width, H = canvas.height;
    const T = canvasTheme();
    ctx.fillStyle = T.bg; ctx.fillRect(0,0,W,H);

    const toX = x => (x - xMin) / (xMax - xMin) * W;
    const toY = y => H - (y - yMin) / (yMax - yMin) * H;

    ctx.lineWidth = 1 * dpr;
    ctx.strokeStyle = T.line;
    const xStep = niceStep(xMax-xMin), yStep = niceStep(yMax-yMin);
    for (let x=Math.ceil(xMin/xStep)*xStep; x<=xMax; x+=xStep) {
      const px = toX(x); ctx.beginPath(); ctx.moveTo(px,0); ctx.lineTo(px,H); ctx.stroke();
    }
    for (let y=Math.ceil(yMin/yStep)*yStep; y<=yMax; y+=yStep) {
      const py = toY(y); ctx.beginPath(); ctx.moveTo(0,py); ctx.lineTo(W,py); ctx.stroke();
    }

    ctx.strokeStyle = T.muted; ctx.lineWidth = 1.4*dpr;
    if (xMin <= 0 && xMax >= 0) { const px=toX(0); ctx.beginPath(); ctx.moveTo(px,0);ctx.lineTo(px,H);ctx.stroke(); }
    if (yMin <= 0 && yMax >= 0) { const py=toY(0); ctx.beginPath(); ctx.moveTo(0,py);ctx.lineTo(W,py);ctx.stroke(); }

    ctx.strokeStyle = T.accent; ctx.lineWidth = 2.6*dpr; ctx.beginPath();
    let started = false, validCount = 0, lastPy = null;
    try {
      for (let px=0; px<=W; px+=Math.max(1,dpr)) {
        const x = xMin + px/W*(xMax-xMin);
        let y;
        try { y = evaluate(expr, "x", x); } catch { started=false; lastPy=null; continue; }
        const py = toY(y);
        if (!Number.isFinite(py) || py < -H*4 || py > H*5 || (lastPy !== null && Math.abs(py-lastPy) > H*.7)) {
          started = false; lastPy = null; continue;
        }
        if (!started) { ctx.moveTo(px,py); started = true; } else ctx.lineTo(px,py);
        lastPy = py; validCount++;
      }
      ctx.stroke();
      msg.innerHTML = validCount ? `Plotting <code>y = ${escapeHtml(expr)}</code>` : "No visible real values in this range.";
    } catch (err) {
      msg.textContent = `Could not plot: ${err.message}`;
    }
  }

  function niceStep(range) {
    const rough = range/10, power = 10 ** Math.floor(Math.log10(rough)), n = rough/power;
    return (n < 2 ? 1 : n < 5 ? 2 : 5) * power;
  }
  $("#plotButton").addEventListener("click", drawGraph);
  $$("[data-graph]").forEach(b => b.addEventListener("click", () => {
    $("#graphExpression").value = b.dataset.graph; drawGraph();
  }));
  window.addEventListener("resize", debounce(drawGraph, 140));

  // Practice engine
  function newQuestion() {
    const kind = Math.floor(Math.random()*4);
    let text, answer, topic;
    if (kind === 0) {
      const a = rand(3,18), b = rand(2,18);
      text = `${a} × ${b} = ?`; answer = a*b; topic = "Arithmetic";
    } else if (kind === 1) {
      const x = rand(-9,12), a = rand(2,9), b = rand(-12,12), c = a*x+b;
      text = `${a}x ${b>=0?"+":"−"} ${Math.abs(b)} = ${c}`; answer = x; topic = "Linear equations";
    } else if (kind === 2) {
      const base = rand(20,200), p = [10,20,25,50][rand(0,3)];
      text = `${p}% of ${base} = ?`; answer = p/100*base; topic = "Percentages";
    } else {
      const a = rand(3,15), b = rand(3,15);
      text = `√(${a*a} + ${b*b}) ≈ ?`; answer = Math.sqrt(a*a+b*b); topic = "Geometry · round to 2 decimals";
    }
    session.current = { answer, kind };
    session.locked = false;
    $("#practiceTopic").textContent = topic;
    $("#questionCount").textContent = `Question ${session.answered + 1}`;
    $("#practiceQuestion").textContent = text;
    $("#practiceAnswer").value = "";
    $("#practiceAnswer").disabled = false;
    $("#practiceFeedback").textContent = "";
    $("#nextQuestion").classList.add("hidden");
  }

  $("#practiceForm").addEventListener("submit", e => {
    e.preventDefault();
    if (session.locked) return;
    const input = Number($("#practiceAnswer").value);
    if (!Number.isFinite(input)) return $("#practiceFeedback").textContent = "Enter a numeric answer.";
    const tolerance = session.current.kind === 3 ? .011 : 1e-9;
    const right = Math.abs(input - session.current.answer) <= tolerance;
    session.answered++; state.answered++;
    if (right) { session.correct++; state.correct++; }
    session.locked = true;
    $("#practiceAnswer").disabled = true;
    $("#practiceFeedback").className = `practice-feedback ${right ? "correct":"incorrect"}`;
    $("#practiceFeedback").textContent = right ? "Correct — nice work." : `Not quite. The answer is ${formatNumber(session.current.answer)}.`;
    $("#nextQuestion").classList.remove("hidden");
    updateSessionScore(); save();
  });
  $("#nextQuestion").addEventListener("click", newQuestion);
  $("#resetPractice").addEventListener("click", () => {
    session = { answered:0, correct:0, current:null, locked:false };
    updateSessionScore(); newQuestion();
  });

  function updateSessionScore() {
    $("#scoreValue").textContent = `${session.correct} / ${session.answered}`;
    $("#scoreBar").style.width = session.answered ? `${session.correct/session.answered*100}%` : "0%";
  }

  function rand(a,b) { return Math.floor(Math.random()*(b-a+1))+a; }
  function formatNumber(n) {
    if (!Number.isFinite(n)) return String(n);
    return Number.isInteger(n) ? String(n) : String(Number(n.toFixed(6)));
  }
  function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
  function debounce(fn, ms) { let t; return (...args) => { clearTimeout(t); t=setTimeout(()=>fn(...args),ms); }; }

  $("#year").textContent = new Date().getFullYear();
  renderProgress();
  updateSessionScore();
  newQuestion();
  setTimeout(drawGraph, 120);
})();
