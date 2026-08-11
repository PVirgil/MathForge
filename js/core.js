(function(global){
"use strict";
function formatNumber(n){if(!Number.isFinite(n))return String(n);if(Number.isInteger(n))return String(n);return String(Number(n.toFixed(8)))}
function parseLinearSide(text){
  let s=String(text).toLowerCase().replace(/\s+/g,"").replace(/\*/g,"");
  if(!s)return {x:0,c:0};
  if(!/^[0-9x+\-.]+$/.test(s)) throw new Error("Unsupported characters.");
  s=s.replace(/-/g,"+-");
  let x=0,c=0;
  for(const term of s.split("+").filter(Boolean)){
    if(term.includes("x")){
      if((term.match(/x/g)||[]).length!==1 || !term.endsWith("x")) throw new Error("Use simple linear terms like 3x.");
      let k=term.slice(0,-1);
      if(k===""||k==="+")k="1";
      if(k==="-")k="-1";
      const n=Number(k);
      if(!Number.isFinite(n)) throw new Error("Invalid x coefficient.");
      x+=n;
    }else{
      const n=Number(term);
      if(!Number.isFinite(n)) throw new Error("Invalid constant.");
      c+=n;
    }
  }
  return {x,c};
}
function solveLinear(eq){
  const parts=String(eq).split("=");
  if(parts.length!==2) throw new Error("Use exactly one equals sign.");
  const L=parseLinearSide(parts[0]),R=parseLinearSide(parts[1]);
  const a=L.x-R.x,b=R.c-L.c;
  if(Math.abs(a)<1e-12)return Math.abs(b)<1e-12?{type:"infinite"}:{type:"none"};
  return {type:"one",x:b/a,a,b};
}
function solveQuadratic(a,b,c){
  a=Number(a);b=Number(b);c=Number(c);
  if(![a,b,c].every(Number.isFinite))throw new Error("Coefficients must be numbers.");
  if(Math.abs(a)<1e-12)throw new Error("a cannot be 0.");
  const d=b*b-4*a*c;
  if(d>1e-12)return{type:"two-real",d,r1:(-b+Math.sqrt(d))/(2*a),r2:(-b-Math.sqrt(d))/(2*a)};
  if(Math.abs(d)<=1e-12)return{type:"double",d:0,r:-b/(2*a)};
  return{type:"complex",d,real:-b/(2*a),imag:Math.sqrt(-d)/(2*Math.abs(a))};
}
function normalizeExpression(expr,variable,value){
  let s=String(expr).trim().toLowerCase().replace(/[×·]/g,"*").replace(/÷/g,"/").replace(/−/g,"-").replace(/π/g,"pi");
  if(!s||s.length>160)throw new Error("Expression is empty or too long.");
  if(!/^[0-9a-z+\-*/^().,\s]+$/.test(s))throw new Error("Unsupported character.");
  s=s.replace(/\s+/g,"");
  const allowed=["sin","cos","tan","asin","acos","atan","sqrt","abs","log","ln","exp","floor","ceil","round","pi","e"];
  const names=s.match(/[a-z]+/g)||[];
  for(const name of names)if(name!==variable&&!allowed.includes(name))throw new Error("Unsupported term: "+name);
  if(variable){
    const v=variable;
    s=s.replace(new RegExp("(\\d|\\)|pi|e)"+v,"g"),"$1*"+v);
    s=s.replace(new RegExp(v+"(\\d|\\(|pi|e)","g"),v+"*$1");
  }
  s=s.replace(/\^/g,"**");
  const repl={asin:"Math.asin",acos:"Math.acos",atan:"Math.atan",sin:"Math.sin",cos:"Math.cos",tan:"Math.tan",sqrt:"Math.sqrt",abs:"Math.abs",log:"Math.log10",ln:"Math.log",exp:"Math.exp",floor:"Math.floor",ceil:"Math.ceil",round:"Math.round"};
  for(const [k,v] of Object.entries(repl))s=s.replace(new RegExp("\\b"+k+"\\b","g"),v);
  s=s.replace(/\bpi\b/g,"Math.PI").replace(/\be\b/g,"Math.E");
  if(variable)s=s.replace(new RegExp("\\b"+variable+"\\b","g"),"("+Number(value)+")");
  return s;
}
function evaluate(expr,variable,value){
  const normalized=normalizeExpression(expr,variable,value);
  const result=Function('"use strict"; return ('+normalized+');')();
  if(typeof result!=="number"||!Number.isFinite(result))throw new Error("Result is not a finite real number.");
  return result;
}
function tutorHint(q){
  q=String(q).toLowerCase();
  if(/linear|solve.*x|[0-9]x/.test(q))return{title:"Isolate the variable",body:"Undo addition or subtraction first, then undo multiplication or division. Apply the same operation to both sides."};
  if(/quadratic|x\^2|x²/.test(q))return{title:"Identify a, b, and c",body:"Try factoring when the numbers are friendly. Otherwise use the quadratic formula. The discriminant b²−4ac tells you how many real roots exist."};
  if(/percent|%/.test(q))return{title:"Convert percent to a decimal",body:"For p% of N, calculate (p/100)×N. For percent change, divide the change by the original amount, then multiply by 100."};
  if(/derivative|differentiat/.test(q))return{title:"Look for the function structure",body:"For x^n, use the power rule nx^(n−1). Then apply sum, product, quotient, or chain rules as needed."};
  if(/pythag|right triangle|hypotenuse/.test(q))return{title:"Use the Pythagorean theorem",body:"For a right triangle, a²+b²=c², where c is the hypotenuse opposite the right angle."};
  return{title:"Translate the question",body:"Write down what is known, what is unknown, and the relationship connecting them. Turn that relationship into an equation, then solve one step at a time."};
}
const api={formatNumber,solveLinear,solveQuadratic,normalizeExpression,evaluate,tutorHint};
global.MathForgeCore=api;
if(typeof module!=="undefined"&&module.exports)module.exports=api;
})(typeof window!=="undefined"?window:globalThis);
