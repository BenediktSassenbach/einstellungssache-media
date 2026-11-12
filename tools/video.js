// Video-Generator Einstellungssache (Schalti, 1080x1920, 30 fps)
// node tools/video.js videos/V001/script.json <Ausgabeordner> [--frames 3.5,20,40]
// Mit Stimme: audio/1.mp3 ... (eine Datei pro Szene) ablegen, python3 tools/zeiten.py videos/V001 ausfuehren, dann rendern.
// Ohne zeiten.json werden die Sprechzeiten nach Zeichenzahl geschaetzt und das Video bleibt stumm.
const fs = require('fs'), path = require('path'), { spawn, execFileSync } = require('child_process');
const { chromium } = require('playwright');
const FPS = 30, W = 1080, H = 1920, GAP = 0.22, CPS = 14.5;
const args = process.argv.slice(2);
const scriptPath = args[0], out = args[1];
const opt = k => { const i = args.indexOf(k); return i > 0 ? args[i + 1] : null; };
const S = JSON.parse(fs.readFileSync(scriptPath, 'utf8'));
const zeitenPath = path.join(path.dirname(scriptPath), 'zeiten.json');
const zeiten = fs.existsSync(zeitenPath) ? JSON.parse(fs.readFileSync(zeitenPath, 'utf8')).szenen : null;

// ---- Zeitplan: jede Zeile bekommt Start und Ende, jede Szene eine ganze Zahl an Frames
let t = 0, li = 0;
S.scenes.forEach((sc, si) => {
  sc.start = t; t += 0.35; sc.audioAt = t;
  if (zeiten) { sc.lines.forEach((l, k) => { l.start = t + zeiten[si].zeilen[k][0]; l.end = t + zeiten[si].zeilen[k][1]; }); t += zeiten[si].dauer; }
  else for (const l of sc.lines) {
    const d = Math.max(0.9, l.t.length / CPS);
    l.start = t; l.end = t + d; t = l.end + GAP; li++;
  }
  t += sc.type === 'outro' ? 1.6 : 0.45;
  t = Math.round(t * FPS) / FPS; sc.end = t;
});
S.total = t;

// ---- Seite: draw(t) zeichnet den Zustand zur Zeit t
const page = `<!doctype html><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:${W}px;height:${H}px;background:#0B1020;color:#F4F6FB;font-family:'Inter Display','Inter',sans-serif;position:relative;overflow:hidden}
.blob{position:absolute;border-radius:50%;background:#131C38}
.b1{width:1100px;height:1100px;right:-430px;top:-400px}.b2{width:520px;height:520px;left:-200px;bottom:120px}
.brand{position:absolute;left:84px;top:118px;display:flex;align-items:center;gap:18px;font-size:34px;font-weight:700;color:#AEB9D6}
.tg{width:74px;height:40px;border-radius:20px;background:var(--a);position:relative;display:inline-block}.tg i{position:absolute;right:5px;top:5px;width:30px;height:30px;border-radius:50%;background:#0B1020}
.prog{position:absolute;left:84px;right:84px;top:190px;height:10px;border-radius:5px;background:#18223F}.prog i{display:block;height:10px;border-radius:5px;background:var(--a)}
#stage{position:absolute;left:84px;width:856px;top:230px;height:960px}
h1{font-size:112px;line-height:1.02;font-weight:900;letter-spacing:-.04em}
h1 b,.hl{color:#0B1020;background:var(--a);padding:0 16px;border-radius:20px;display:inline-block;transform:rotate(-2deg);font-weight:900}
.top{display:flex;align-items:center;gap:26px;height:210px}
.num{font-size:210px;font-weight:900;line-height:.85;color:var(--a);letter-spacing:-.05em}
h2{font-size:74px;line-height:1.03;font-weight:900;letter-spacing:-.035em}
.path{margin-top:18px;display:flex;flex-direction:column;gap:12px}
.step{display:flex;align-items:center;gap:20px;font-size:40px;font-weight:700;background:#18223F;border-radius:24px;padding:16px 24px;width:fit-content;min-width:520px}
.step s{flex:none;width:48px;height:48px;border-radius:50%;background:#0B1020;color:var(--a);font-size:28px;font-weight:800;display:flex;align-items:center;justify-content:center;text-decoration:none}
.step.on{background:var(--a);color:#0B1020}
.panel{position:absolute;left:0;right:0;bottom:0;background:#F4F6FB;color:#0B1020;border-radius:36px;padding:24px 30px;box-shadow:10px 10px 0 var(--a)}
.ph{font-size:30px;font-weight:800;color:#5A6686;margin-bottom:10px;display:flex;justify-content:space-between}
.row{display:flex;align-items:center;gap:20px;font-size:38px;font-weight:700;height:74px;border-top:2px solid #DDE2EE}
.ic{width:50px;height:50px;border-radius:14px;flex:none}
.sw{margin-left:auto;width:92px;height:52px;border-radius:26px;background:#C9CFDD;position:relative;flex:none}.sw i{position:absolute;top:5px;left:5px;width:42px;height:42px;border-radius:50%;background:#fff}
.bar{height:26px;border-radius:13px;background:#0B1020;margin-left:auto}.pct{width:110px;text-align:right;font-weight:900}
.stick{position:absolute;font-size:40px;font-weight:900;color:#0B1020;background:#fff;padding:14px 28px;border-radius:18px;box-shadow:8px 8px 0 var(--a)}
.step{position:relative}.tap{position:absolute;right:-34px;top:26px;font-size:74px;z-index:3}.ring{position:absolute;right:-10px;top:50%;border:6px solid var(--a);border-radius:50%;translate:50% -50%}
.ld{width:30px;height:30px;border-radius:50%;border:5px solid #C9CFDD;border-top-color:#0B1020;display:inline-block}
.row{position:relative}.stamp{position:absolute;right:26px;bottom:26px;font-size:54px;font-weight:900;color:#E5383B;border:8px solid #E5383B;border-radius:16px;padding:4px 18px;background:#fff}
.popx{position:absolute;width:250px;background:#fff;border-radius:40px;box-shadow:10px 10px 0 var(--a);text-align:center;padding:10px 10px 18px;color:#0B1020;z-index:4}.popx span{font-size:118px;line-height:1.15;display:block;font-family:'Noto Color Emoji'}.popx em{font-style:normal;font-size:33px;font-weight:900;display:block;line-height:1.05}
#fx{position:absolute;inset:0}#wipe{position:absolute;left:-20%;top:0;width:140%;height:100%;background:var(--a);z-index:9;display:none}
#stage{transform-origin:50% 40%}
#cap{position:absolute;z-index:6;left:60px;width:900px;top:1215px;height:170px;display:flex;align-items:center;justify-content:center}
#cap div{font-size:66px;font-weight:900;line-height:1.1;text-align:center;letter-spacing:-.02em;background:#0B1020;border:5px solid #26335E;border-radius:30px;padding:16px 30px}
#cap span.w{color:var(--a)}
#masc{position:absolute;left:70px;top:1395px}
#bub{position:absolute;left:440px;top:1430px;background:#fff;color:#0B1020;font-size:40px;font-weight:800;line-height:1.15;padding:20px 28px;border-radius:30px;max-width:500px;transform-origin:left bottom}
.chk{display:flex;align-items:center;gap:24px;font-size:52px;font-weight:800;background:#18223F;border-radius:28px;padding:24px 30px;margin-top:20px}
.chk s{flex:none;width:64px;height:64px;border-radius:50%;background:var(--a);color:#0B1020;font-size:40px;font-weight:900;display:flex;align-items:center;justify-content:center;text-decoration:none}
</style><body><div class="blob b1"></div><div class="blob b2"></div>
<div class="brand"><span class="tg"><i></i></span>Einstellungssache</div><div class="prog"><i id="pg"></i></div>
<div id="fx"></div><div id="stage"></div><div id="wipe"></div><div id="cap"></div><div id="masc"></div><div id="bub"></div>
<script>
const S=${JSON.stringify(S)};const A=S.accent,BG='#0B1020';document.body.style.setProperty('--a',A);
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=x=>{x=cl(x);return 1-Math.pow(1-x,3)};
const back=x=>{x=cl(x);const c=1.70158;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\\*(.+?)\\*/g,'<b>$1</b>');
const pop=(k,o='center')=>'opacity:'+cl(k*3)+';transform:scale('+(0.6+0.4*back(k))+');transform-origin:'+o+';';
const rise=k=>'opacity:'+ease(k)+';transform:translateY('+(40*(1-ease(k)))+'px);';
function mascot(m,open,blink,w){
 const arcs='<path d="M181 96 Q194 106 207 96" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M217 96 Q230 106 243 96" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>';
 const eyes={happy:'<circle cx="194" cy="94" r="14" fill="#fff"/><circle cx="230" cy="94" r="14" fill="#fff"/><circle cx="197" cy="96" r="6.5" fill="'+BG+'"/><circle cx="233" cy="96" r="6.5" fill="'+BG+'"/>',
  shock:'<circle cx="194" cy="90" r="16" fill="#fff"/><circle cx="230" cy="90" r="16" fill="#fff"/><circle cx="194" cy="90" r="5" fill="'+BG+'"/><circle cx="230" cy="90" r="5" fill="'+BG+'"/>',
  wink:'<circle cx="194" cy="94" r="14" fill="#fff"/><circle cx="197" cy="96" r="6.5" fill="'+BG+'"/><path d="M217 96 Q230 84 243 96" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>',
  sleepy:arcs+'<text x="252" y="50" font-size="34" font-weight="800" fill="#fff" font-family="Inter Display">z</text><text x="274" y="26" font-size="24" font-weight="800" fill="#fff" font-family="Inter Display">z</text>',
  angry:'<path d="M178 74 L206 84" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M246 74 L218 84" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle cx="194" cy="98" r="12" fill="#fff"/><circle cx="230" cy="98" r="12" fill="#fff"/><circle cx="196" cy="99" r="5.5" fill="'+BG+'"/><circle cx="228" cy="99" r="5.5" fill="'+BG+'"/>',
  cool:'<rect x="174" y="80" width="76" height="26" rx="10" fill="#fff"/><rect x="180" y="85" width="28" height="16" rx="6" fill="'+BG+'"/><rect x="216" y="85" width="28" height="16" rx="6" fill="'+BG+'"/>'};
 const rest={happy:'<path d="M196 120 Q212 136 228 120" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>',shock:'<ellipse cx="212" cy="126" rx="9" ry="12" fill="#fff"/>',
  wink:'<path d="M194 118 Q214 138 232 116" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>',sleepy:'<circle cx="212" cy="124" r="6" fill="#fff"/>',
  angry:'<path d="M198 130 Q212 120 226 130" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>',cool:'<path d="M198 122 Q216 134 230 118" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>'};
 const e=(blink&&(m==='happy'||m==='shock'||m==='angry'))?arcs:eyes[m];
 const mouth=open>0.08?'<ellipse cx="212" cy="'+(m==='cool'?126:125)+'" rx="'+(8+3*open)+'" ry="'+(2.5+10*open)+'" fill="#fff"/>':rest[m];
 return '<svg width="'+w+'" viewBox="-10 0 320 235" xmlns="http://www.w3.org/2000/svg"><path d="M112 150 L104 205 M190 150 L198 205" stroke="'+A+'" stroke-width="12" stroke-linecap="round"/><path d="M84 207 L108 207 M194 207 L218 207" stroke="'+A+'" stroke-width="12" stroke-linecap="round"/><path d="M40 86 Q10 70 6 40" stroke="'+A+'" stroke-width="12" stroke-linecap="round" fill="none"/><rect x="30" y="40" width="240" height="120" rx="60" fill="'+A+'"/><circle cx="212" cy="100" r="54" fill="'+BG+'"/>'+e+mouth+'</svg>';}
function sw(k,nm){k=ease(k);const c=k>0.5?A:'#C9CFDD';return '<span class="sw" style="background:'+c+(nm?';margin-left:0':'')+'"><i style="left:'+(5+40*k)+'px"></i></span>';}
function chunks(l){const ws=l.t.split(' ');const cs=[];let cur=[];let n=0;
 for(const w of ws){if(cur.length&&(n+w.length>20||cur.length>=4)){cs.push(cur);cur=[];n=0}cur.push(w);n+=w.length+1}if(cur.length)cs.push(cur);
 const tot=l.t.length;let pos=0;const d=l.end-l.start;
 return cs.map(c=>c.map(w=>{const a=l.start+d*pos/tot;pos+=w.length+1;return{w,a,b:l.start+d*Math.min(pos,tot)/tot}}));}
const rnd=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
function confetti(e,x,y,n){if(e===undefined||e>1.5)return '';let s='';const cols=[A,'#fff','#7C5CFF','#3DB8FF','#FF7A59'];
 for(let i=0;i<n;i++){const a=rnd(i+x)*6.283,v=240+rnd(i*3+y)*460;const px=x+Math.cos(a)*v*e,py=y+Math.sin(a)*v*e*0.8-200*e+560*e*e;
  s+='<i style="position:absolute;left:'+px+'px;top:'+py+'px;width:18px;height:'+(10+rnd(i)*16)+'px;background:'+cols[i%5]+';border-radius:4px;opacity:'+cl(1.7-e*1.3)+';transform:rotate('+(e*700*(rnd(i*7)-.5))+'deg)"></i>';}
 return s;}
function draw(t){
 const si=Math.max(0,S.scenes.findIndex(s=>t<s.end));const sc=S.scenes[si<0?S.scenes.length-1:si];const lt=t-sc.start;
 const ev={};let line=null,last=sc.lines[0];
 for(const l of sc.lines){if(t>=l.start){last=l;if(l.ev)ev[l.ev]=t-l.start}if(t>=l.start&&t<l.end+0.05)line=l}
 const E=(n,d=0.45)=>ev[n]===undefined?0:cl(ev[n]/d);const tl=t-last.start;
 document.getElementById('pg').style.width=(100*t/S.total)+'%';
 // Hintergrund in Bewegung
 document.querySelector('.b1').style.transform='translate('+(Math.sin(t*.5)*50)+'px,'+(Math.cos(t*.4)*40)+'px) scale('+(1+0.04*Math.sin(t*.7))+')';
 document.querySelector('.b2').style.transform='translate('+(Math.cos(t*.45)*40)+'px,'+(Math.sin(t*.6)*50)+'px)';
 let f='';for(let i=0;i<18;i++){const x=rnd(i)*1040,sp=40+rnd(i+50)*70,y=1920-((t*sp+rnd(i+9)*2000)%2060),sz=14+rnd(i+3)*26;
  f+=i%3===0?'<b style="position:absolute;left:'+x+'px;top:'+y+'px;font-size:'+(sz*2.2)+'px;font-weight:900;color:#22305A;transform:rotate('+(t*50*(rnd(i)-.5))+'deg)">+</b>':'<i style="position:absolute;left:'+x+'px;top:'+y+'px;width:'+sz+'px;height:'+sz+'px;border-radius:50%;background:#1B2748"></i>';}
 document.getElementById('fx').innerHTML=f;
 // Szenenwechsel: Akzentfläche wischt weg
 const wp=document.getElementById('wipe');if(si>0&&lt<0.42){const k=ease(lt/0.42);wp.style.display='block';wp.style.transform='translateX('+(k*135)+'%) skewX(-12deg)'}else wp.style.display='none';
 let h='';const k0=lt/0.45;
 if(sc.type==='hook'){
  const dr=ev.drain===undefined?100:Math.round(100-88*ease(ev.drain/1.5));const low=dr<=25;
  const col=dr>40?'#F4F6FB':(dr>20?A:'#FF5A5A');
  h+='<h1 style="margin-top:20px">'+sc.title.split(' ').map((w,i)=>{const k=cl((lt-0.05-i*0.07)/0.22);const m=/\\*/.test(w);const x=esc(w.replace(/\\*/g,''));
   const inner=m?(E('mark')?'<b style="transform:rotate(-2deg) scale('+(1+0.35*(1-ease(ev.mark/0.4)))+')">'+x.replace('.','')+'</b>.':x):x;
   return '<span style="display:inline-block;opacity:'+cl(k*3)+';transform:scale('+(0.4+0.6*back(k))+')">'+inner+'</span>'}).join(' ')+'</h1>';
  h+='<div style="position:absolute;left:0;top:560px;display:flex;align-items:center;gap:36px;'+rise(k0-0.3)+(low?'transform:translate('+(Math.sin(t*55)*5)+'px,'+(Math.cos(t*47)*3)+'px);':'')+'"><svg width="420" height="200" viewBox="0 0 420 200" style="'+(low?'filter:drop-shadow(0 0 '+(14+12*Math.sin(t*9))+'px #FF5A5A)':'')+'"><rect x="6" y="6" width="370" height="188" rx="44" fill="none" stroke="#F4F6FB" stroke-width="12"/><rect x="386" y="66" width="26" height="68" rx="10" fill="#F4F6FB"/><rect x="28" y="28" width="'+(326*dr/100)+'" height="144" rx="26" fill="'+col+'"/></svg><div style="font-size:150px;font-weight:900;letter-spacing:-.04em;color:'+col+';transform:scale('+(low?1+0.05*Math.sin(t*10):1)+')">'+dr+' %</div></div>';
  if(E('sticker'))h+='<div class="stick" style="left:0;top:820px;font-size:56px;'+pop(E('sticker'),'left center')+'rotate:'+(-4+2*Math.sin(t*6))+'deg">'+esc(sc.sticker)+' 👇</div>';
 }
 if(sc.type==='tip'){
  const nk=cl((lt-0.3)/0.3);
  h+='<div class="top"><div class="num" style="opacity:'+cl(nk*4)+';transform:scale('+(1+1.8*(1-ease(nk)))+') rotate('+(-8*(1-ease(nk)))+'deg)">'+sc.num+'</div><h2 style="'+rise(k0-0.6)+'">'+esc(sc.title)+'</h2></div><div class="path">';
  sc.path.forEach((p,i)=>{const e=ev['p'+(i+1)];const k=E('p'+(i+1),0.4);const cur=e!==undefined&&ev['p'+(i+2)]===undefined&&ev.act===undefined;
   const tap=e!==undefined&&e<0.75?'<span class="tap" style="transform:translateY('+(-26*Math.abs(Math.sin(e*8)))+'px)">👆</span><span class="ring" style="width:'+(60+e*260)+'px;height:'+(60+e*260)+'px;opacity:'+cl(1-e/0.6)+'"></span>':'';
   h+='<div class="step'+(cur?' on':'')+'" style="'+(e===undefined?'opacity:'+(0.3*cl(k0-1))+';':pop(k,'left center'))+'"><s>'+(i+1)+'</s>'+esc(p)+tap+'</div>'});
  h+='</div>';
  if(sc.panel==='apps'){const apps=[['Shopping-App','#FF7A59',1],['Spiele-App','#7C5CFF',1],['Wetter-App','#3DB8FF',1],['Nachrichten-App','#2ECC71',0]];
   h+='<div class="panel" style="'+rise(E('panel',0.5))+'"><div class="ph"><span>Hintergrundaktualisierung</span><span>Beispiel</span></div>'+apps.map((a,i)=>{const on=a[2]&&ev.act!==undefined?1-cl((ev.act-0.5-i*0.5)/0.3):1;
    const ind=on>0.5?'<span class="ld" style="transform:rotate('+(t*420+i*90)+'deg)"></span><span style="font-size:26px;color:#5A6686;width:86px">lädt'+'.'.repeat(1+Math.floor(t*3+i)%3)+'</span>':'<span style="font-size:40px;transform:scale('+(0.5+0.5*back(cl((ev.act-0.8-i*0.5)/0.3)))+')">💤</span>';
    return '<div class="row"><span class="ic" style="background:'+a[1]+';transform:translateY('+(on>0.5?Math.sin(t*9+i*2)*5:0)+'px)"></span>'+a[0]+'<span style="margin-left:auto;display:flex;align-items:center;gap:14px">'+ind+sw(on,1)+'</span></div>'}).join('')+'</div>';}
  if(sc.panel==='usage'){const apps=[['Spiele-App','#7C5CFF',41],['Video-App','#FF7A59',23],['Shopping-App','#3DB8FF',12],['Wetter-App','#2ECC71',4]];
   const scan=ev.panel!==undefined&&ev.panel>1.1&&ev.act===undefined?Math.floor((ev.panel-1.1)*2.4)%4:-1;
   const shk=ev.act!==undefined&&ev.act<0.6?Math.sin(ev.act*70)*12*(1-ev.act/0.6):0;
   h+='<div class="panel" style="'+rise(E('panel',0.5))+'"><div class="ph"><span>Batterie · Verbrauch pro App</span><span>Beispielwerte</span></div>'+apps.map((a,i)=>{const g=ev.bars===undefined?0:ease((ev.bars-0.1-i*0.15)/0.7);const hot=i===0&&ev.act!==undefined;
    return '<div class="row" style="'+(hot?'background:'+A+';margin:0 -18px;padding:0 18px;border-radius:18px;border-color:transparent;transform:translateX('+shk+'px) scale('+(1+0.03*Math.sin(t*8))+')':(i===scan?'background:'+A+'44;margin:0 -18px;padding:0 18px;border-radius:18px':''))+'"><span class="ic" style="background:'+a[1]+'"></span>'+a[0]+'<span class="bar" style="width:'+(a[2]*5.2*g)+'px"></span><span class="pct">'+(ev.bars===undefined?'?':Math.round(a[2]*g)+' %')+'</span></div>'}).join('')
    +(E('act2')?'<div class="stamp" style="opacity:'+cl(ev.act2*6)+';transform:rotate(-10deg) scale('+(1+2*(1-ease(ev.act2/0.25)))+')">SCHULDIG</div>':'')+'</div>';}
  if(sc.panel==='lowpower'){const on=E('act',0.35);const col=on>0.5?'#FFCC00':'#0B1020';
   h+='<div class="panel" style="'+rise(E('panel',0.5))+'"><div class="ph"><span>Batterie</span><span>Beispiel</span></div><div class="row" style="height:96px;font-size:44px">Stromsparmodus'+(ev.act!==undefined&&ev.act<0.7?'<span class="tap" style="right:60px;top:60px;transform:translateY('+(-26*Math.abs(Math.sin(ev.act*8)))+'px)">👆</span>':'')+sw(on)+'</div><div class="row" style="height:150px;gap:30px"><svg width="190" height="90" viewBox="0 0 420 200" style="overflow:visible;'+(on>0.5?'filter:drop-shadow(0 0 '+(10+10*Math.sin(t*7))+'px #FFCC00);transform:scale('+(1+0.05*Math.sin(t*7))+')':'')+'"><rect x="6" y="6" width="370" height="188" rx="44" fill="none" stroke="#0B1020" stroke-width="14"/><rect x="386" y="66" width="26" height="68" rx="10" fill="#0B1020"/><rect x="28" y="28" width="'+(on>0.5?210:210-18*Math.abs(Math.sin(t*1.5)))+'" height="144" rx="26" fill="'+col+'"/></svg><span style="font-size:34px;line-height:1.2;color:#5A6686">'+(on>0.5?'Akkusymbol wird gelb:<br>Stromsparmodus ist an':'64 %')+'</span></div></div>';
   if(E('act2'))h+='<div class="stick" style="right:0;bottom:375px;'+pop(E('act2'),'center')+'rotate:'+(4+3*Math.sin(t*6))+'deg">Kontrollzentrum ⚡</div>';}
 }
 if(sc.type==='outro'){
  sc.checks.forEach((c,i)=>{const e=ev['c'+(i+1)];h+='<div class="chk" style="'+pop(E('c'+(i+1),0.4),'left center')+'"><s style="transform:scale('+(e!==undefined?1+0.8*(1-ease(e/0.4)):1)+')">✓</s>'+esc(c)+'</div>'+confetti(e,120,70+i*135,14)});
  if(E('save'))h+='<h1 style="margin-top:60px;font-size:104px;'+rise(E('save',0.5))+'">'+esc(sc.title).replace('<b>','<b style="transform:rotate(-2deg) scale('+(1+0.06*Math.sin(t*8))+')">')+'</h1>'+confetti(ev.save,430,560,30);
  if(E('follow'))h+='<div class="stick" style="left:0;bottom:0;font-size:52px;'+pop(E('follow'),'left center')+'rotate:'+(-3+2*Math.sin(t*7))+'deg">@einstellungssache</div>';
 }
 // Emoji-Sticker pro Satz
 const P=last.pop;if(P&&tl>0.1&&t<last.end+0.28){const k=cl((tl-0.1)/0.3),o=cl((last.end+0.28-t)/0.16);
  const pos=sc.type==='tip'?'right:-14px;top:232px':sc.type==='hook'?'right:0;top:790px':'right:0;bottom:6px';
  h+='<div class="popx" style="'+pos+';transform:scale('+(back(k)*o)+') rotate('+(7*Math.sin(t*5))+'deg)"><span style="transform:translateY('+(-10*Math.abs(Math.sin(t*6)))+'px)">'+P[0]+'</span>'+(P[1]?'<em>'+esc(P[1])+'</em>':'')+'</div>';}
 const stage=document.getElementById('stage');stage.innerHTML=h;
 // Bild-Impuls bei jedem Satz, Wackler beim Einschlag der Nummer
 let shx=0,shy=0;if(sc.type==='tip'&&lt>0.45&&lt<0.85){const d=1-(lt-0.45)/0.4;shx=Math.sin(lt*95)*12*d;shy=Math.cos(lt*75)*9*d}
 stage.style.transform='translate('+shx+'px,'+shy+'px) scale('+(1+0.035*(1-ease(tl/0.3))+0.012*cl(tl/3))+')';
 // Untertitel
 let c='';if(line){const ch=chunks(line);let cur=ch[0];for(const x of ch){if(t>=x[0].a)cur=x}
  const k=cl((t-cur[0].a)/0.12);c='<div style="transform:scale('+(0.85+0.15*back(k))+') rotate('+(1.5*Math.sin(cur[0].a*40))+'deg)">'+cur.map(x=>'<span'+(t>=x.a&&t<x.b?' class="w"':'')+'>'+esc(x.w)+'</span>').join(' ')+'</div>';}
 document.getElementById('cap').innerHTML=c;
 // Schalti: spricht, hüpft bei jedem Satz, dreht sich bei den Höhepunkten
 const talking=line&&t<line.end-0.08;const open=talking?cl(0.15+0.55*Math.abs(Math.sin(t*17.3))+0.3*Math.abs(Math.sin(t*6.1+1))):0;
 const blink=(t%3.4)<0.12;const mood=last.mood||'happy';const big=sc.type==='hook'||sc.type==='outro';
 const hop=tl>0&&tl<0.34?Math.sin(Math.PI*tl/0.34):0;let spin=0,jump=0;
 for(const n of ['act','act2','mark','save','follow','sticker']){const e=ev[n];if(e!==undefined&&e<0.55){spin=360*ease(e/0.55);jump=Math.sin(Math.PI*e/0.55)*70}}
 const m=document.getElementById('masc');m.innerHTML=mascot(mood,open,blink,big?360:340);
 m.style.transform='translate('+(Math.sin(t*1.1)*10)+'px,'+(Math.sin(t*2.6)*7-(talking?open*5:0)-hop*44-jump)+'px) rotate('+(Math.sin(t*1.7)*3+spin)+'deg) scale('+(1-0.05*hop)+','+(1+0.08*hop)+')';
 const b=document.getElementById('bub');const q=sc.quip;const qs=sc.lines[sc.quipAt||1].start;
 if(q&&t>=qs){b.style.display='block';b.textContent=q;b.style.transform='rotate('+(3+2*Math.sin(t*4))+'deg) scale('+(0.5+0.5*back((t-qs)/0.35))+')';b.style.opacity=cl((t-qs)/0.15)}else b.style.display='none';
}
</script></body>`;

function ff(a) { return new Promise((res, rej) => { const p = spawn('ffmpeg', a, { stdio: ['pipe', 'ignore', 'pipe'] }); let e = ''; p.stderr.on('data', d => e += d); p.on('close', c => c === 0 ? res() : rej(new Error(e.slice(-600)))); ff.last = p; }); }
(async () => {
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'zeitplan.json'), JSON.stringify({ total: S.total, scenes: S.scenes.map(s => ({ start: s.start, end: s.end, lines: s.lines.map(l => ({ t: l.t, start: +l.start.toFixed(3), end: +l.end.toFixed(3) })) })) }, null, 1));
  console.log('Laenge', S.total.toFixed(2), 's');
  const br = await chromium.launch();
  const mk = async () => { const pg = await br.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 }); await pg.setContent(page); await pg.evaluate(() => document.fonts.ready); return pg; };
  const fr = opt('--frames');
  if (fr) { const pg = await mk(); for (const x of fr.split(',')) { await pg.evaluate(t => draw(t), +x); await pg.screenshot({ path: path.join(out, 'frame_' + x + '.jpg'), type: 'jpeg', quality: 80 }); } await br.close(); return; }
  await Promise.all(S.scenes.map(async (sc, i) => {
    const pg = await mk(); const tmp = path.join(out, 'tmp_' + i + '.mp4'), fin = path.join(out, 'szene_' + i + '.mp4');
    const done = ff(['-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264', '-crf', '18', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', String(FPS), tmp]); const proc = ff.last;
    const n = Math.round((sc.end - sc.start) * FPS);
    for (let f = 0; f < n; f++) { await pg.evaluate(t => draw(t), sc.start + f / FPS); const buf = await pg.screenshot({ type: 'jpeg', quality: 92 }); if (!proc.stdin.write(buf)) await new Promise(r => proc.stdin.once('drain', r)); }
    proc.stdin.end(); await done; fs.renameSync(tmp, fin); console.log('Szene', i, n, 'Frames');
  }));
  await br.close();
  const list = path.join(out, 'liste.txt'); fs.writeFileSync(list, S.scenes.map((_, i) => "file 'szene_" + i + ".mp4'").join('\n'));
  const stumm = path.join(out, 'stumm.mp4'); execFileSync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', stumm], { stdio: 'ignore' });
  const ziel = path.join(out, S.id + '.mp4'); const adir = path.join(path.dirname(scriptPath), 'audio');
  if (zeiten) { // Szenen-Audios an ihre Startzeit setzen und mischen
    const ins = [], fl = []; S.scenes.forEach((sc, i) => { ins.push('-i', path.join(adir, (i + 1) + '.mp3')); fl.push('[' + (i + 1) + ':a]adelay=' + Math.round(sc.audioAt * 1000) + ':all=1[a' + i + ']'); });
    const fc = fl.join(';') + ';' + S.scenes.map((_, i) => '[a' + i + ']').join('') + 'amix=inputs=' + S.scenes.length + ':normalize=0,apad[a]';
    execFileSync('ffmpeg', ['-y', '-i', stumm, ...ins, '-filter_complex', fc, '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-shortest', ziel], { stdio: 'ignore' });
  } else fs.copyFileSync(stumm, ziel);
  console.log('fertig', ziel);
})();
