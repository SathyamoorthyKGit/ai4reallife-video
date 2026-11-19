const fs=require('fs');
const src=fs.readFileSync(process.argv[2],'utf8');
const ev=[];const FX=new Set(['tick','click','doubleclick','pop','ding','chime','sparkle','whoosh','revswell','roll','boing','thud']);const DR=new Set(['kick','snare','clap','sidestick','hat','openhat','shaker','tamb','woodblock','cowbell','tom','crash','ride']);
const S={tempo(){},beat:b=>b*0.6,toBeat:t=>t/0.6,program(){},note(){ev.push('note')},chord(){ev.push('chord')},
fx(n,t,o){if(!FX.has(n))throw Error('bad fx '+n);if(!(t>=-0.05&&t<96))throw Error('bad t '+n+' '+t);ev.push(['fx',n,t])},
drum(n,o){if(!DR.has(n))throw Error('bad drum '+n);ev.push(['dr',n,o.t])},ticks(ts,o){ts.forEach(t=>ev.push(['tick',t]))},master(){}};
let fn;const kit={score:f=>fn=f,rng:s=>{let x=s>>>0||1;return()=>{x^=x<<13;x>>>=0;x^=x>>17;x^=x<<5;x>>>=0;return x/4294967296}}};
new Function('kit',src)(kit);
const starts={"hook": 0, "test": 3.55, "y2015": 11.6, "parrot": 18.3, "pattern": 23.9, "bet": 32.1, "retain": 43.3, "plan": 53.6, "rule1": 58.9, "rule2": 63.7, "rule3": 68.3, "future": 75.1, "cta": 84.2, "brand": 91.72, "END": 94.12};
fn(S,starts);console.log('events',ev.length);const per={};ev.forEach(e=>{const s=Math.floor(e[2]??e[1]);per[s]=(per[s]||0)+1});console.log(JSON.stringify(per));
