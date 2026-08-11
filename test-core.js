const C=require("./js/core.js");
const approx=(a,b,e=1e-8)=>Math.abs(a-b)<=e;
const tests=[
["linear simple",()=>approx(C.solveLinear("3x + 7 = 22").x,5)],
["linear both sides",()=>approx(C.solveLinear("2x+5=x+9").x,4)],
["linear none",()=>C.solveLinear("2x+1=2x+3").type==="none"],
["linear infinite",()=>C.solveLinear("2x+1=2x+1").type==="infinite"],
["quadratic roots",()=>{const r=C.solveQuadratic(1,-5,6);return [r.r1,r.r2].sort((a,b)=>a-b).join(",")==="2,3"}],
["quadratic complex",()=>C.solveQuadratic(1,0,1).type==="complex"],
["calculator sqrt",()=>approx(C.evaluate("sqrt(144)+2^5"),44)],
["calculator symbols",()=>approx(C.evaluate("2×3 + π - pi"),6)],
["calculator trig",()=>approx(C.evaluate("sin(pi/2)"),1)],
["graph implicit 2x",()=>approx(C.evaluate("2x","x",4),8)],
["graph x^2",()=>approx(C.evaluate("x^2","x",3),9)],
["tutor percentage",()=>C.tutorHint("how do percentages work").title.toLowerCase().includes("percent")]
];
let failed=0;
for(const [name,fn] of tests){let ok=false;try{ok=!!fn()}catch(e){console.error(e.message);ok=false}console.log((ok?"PASS":"FAIL")+" - "+name);if(!ok)failed++}
if(failed)process.exit(1); else console.log(`All ${tests.length} core tests passed.`);
