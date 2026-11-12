// Slide-Generator Einstellungssache v3 (Inhalt in der sichtbaren Zone zwischen y=300 und y=1570) (Maskottchen "Schalti"): node slides2.js post.json outdir
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const post=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));const out=process.argv[3];
const A=post.accent||'#C6FF3D';const BG='#0B1020';
function mascot(m,w){const e={
 happy:`<circle cx="194" cy="94" r="14" fill="#fff"/><circle cx="230" cy="94" r="14" fill="#fff"/><circle cx="197" cy="96" r="6.5" fill="${BG}"/><circle cx="233" cy="96" r="6.5" fill="${BG}"/><path d="M196 120 Q212 136 228 120" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>`,
 shock:`<circle cx="194" cy="90" r="16" fill="#fff"/><circle cx="230" cy="90" r="16" fill="#fff"/><circle cx="194" cy="90" r="5" fill="${BG}"/><circle cx="230" cy="90" r="5" fill="${BG}"/><ellipse cx="212" cy="126" rx="9" ry="12" fill="#fff"/>`,
 wink:`<circle cx="194" cy="94" r="14" fill="#fff"/><circle cx="197" cy="96" r="6.5" fill="${BG}"/><path d="M217 96 Q230 84 243 96" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M194 118 Q214 138 232 116" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>`,
 sleepy:`<path d="M181 96 Q194 106 207 96" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M217 96 Q230 106 243 96" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="212" cy="124" r="6" fill="#fff"/><text x="252" y="50" font-size="34" font-weight="800" fill="#fff" font-family="Inter Display">z</text><text x="274" y="26" font-size="24" font-weight="800" fill="#fff" font-family="Inter Display">z</text>`,
 angry:`<path d="M178 74 L206 84" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M246 74 L218 84" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle cx="194" cy="98" r="12" fill="#fff"/><circle cx="230" cy="98" r="12" fill="#fff"/><circle cx="196" cy="99" r="5.5" fill="${BG}"/><circle cx="228" cy="99" r="5.5" fill="${BG}"/><path d="M198 130 Q212 120 226 130" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>`,
 cool:`<rect x="174" y="80" width="76" height="26" rx="10" fill="#fff"/><rect x="180" y="85" width="28" height="16" rx="6" fill="${BG}"/><rect x="216" y="85" width="28" height="16" rx="6" fill="${BG}"/><path d="M198 122 Q216 134 230 118" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>`}[m]||'';
 return `<svg width="${w}" viewBox="-10 0 320 235" xmlns="http://www.w3.org/2000/svg"><path d="M112 150 L104 205 M190 150 L198 205" stroke="${A}" stroke-width="12" stroke-linecap="round"/><path d="M84 207 L108 207 M194 207 L218 207" stroke="${A}" stroke-width="12" stroke-linecap="round"/><path d="M40 86 Q10 70 6 40" stroke="${A}" stroke-width="12" stroke-linecap="round" fill="none"/><rect x="30" y="40" width="240" height="120" rx="60" fill="${A}"/><circle cx="212" cy="100" r="54" fill="${BG}"/>${e}</svg>`;}
const css=`*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1920px;background:${BG};color:#F4F6FB;font-family:'Inter Display','Inter','Noto Color Emoji',sans-serif;position:relative;overflow:hidden}
.blob{position:absolute;border-radius:50%;background:#131C38}
.b1{width:1100px;height:1100px;right:-430px;top:-400px}.b2{width:520px;height:520px;left:-220px;bottom:-60px}
.dots{position:absolute;left:640px;top:1250px;width:300px;height:200px;background-image:radial-gradient(#22305A 5px,transparent 6px);background-size:44px 44px;opacity:.9}
.brand{position:absolute;left:84px;top:330px;display:flex;align-items:center;gap:18px;font-size:34px;font-weight:700;color:#AEB9D6}
.tg{width:74px;height:40px;border-radius:20px;background:${A};position:relative}.tg i{position:absolute;right:5px;top:5px;width:30px;height:30px;border-radius:50%;background:${BG}}
.count{position:absolute;right:150px;top:324px;font-size:32px;font-weight:800;color:${BG};background:${A};border-radius:40px;padding:8px 22px;transform:rotate(4deg)}
.wrap{position:absolute;left:84px;right:150px;top:405px;bottom:350px;display:flex;flex-direction:column}
h1{font-size:108px;line-height:1.0;font-weight:900;letter-spacing:-.04em;margin-top:26px}
h1 b{color:${BG};background:${A};padding:0 18px;border-radius:22px;display:inline-block;transform:rotate(-2deg);font-weight:900}
.sub{font-size:44px;line-height:1.28;color:#C3CCE4;margin-top:34px;font-weight:600}
.hero{position:absolute;left:84px;top:1150px;display:flex;align-items:flex-end;gap:10px}
.bub{background:#fff;color:${BG};font-size:40px;font-weight:800;line-height:1.15;padding:24px 30px;border-radius:34px;position:relative;max-width:440px}
.bub:after{content:'';position:absolute;width:34px;height:34px;background:#fff;transform:rotate(45deg)}
.hero .bub{margin-bottom:150px;margin-left:-20px;transform:rotate(3deg)}.hero .bub:after{left:-10px;bottom:26px}
.stick{position:absolute;font-size:40px;font-weight:900;color:${BG};background:#fff;padding:14px 28px;border-radius:18px;transform:rotate(-6deg);left:84px;bottom:372px;box-shadow:8px 8px 0 ${A}}
.top{display:flex;align-items:center;gap:8px;height:180px}
.num{font-size:176px;font-weight:900;line-height:.85;color:${A};letter-spacing:-.05em;min-width:150px}
.top .bub{font-size:34px;max-width:330px;transform:rotate(-3deg);margin-left:18px}.top .bub:after{right:-10px;top:42%}
.top .m{margin-left:6px;transform:rotate(6deg)}
h2{font-size:78px;line-height:1.03;font-weight:900;letter-spacing:-.035em;margin-top:20px}
.path{margin-top:32px;display:flex;flex-direction:column;gap:13px}
.step{display:flex;align-items:center;gap:22px;font-size:39px;font-weight:700;background:#18223F;border-radius:24px;padding:17px 26px}
.step s{flex:none;width:52px;height:52px;border-radius:50%;background:${BG};color:${A};font-size:30px;font-weight:800;display:flex;align-items:center;justify-content:center;text-decoration:none}
.step.act{background:${A};color:${BG};transform:rotate(-1.2deg);box-shadow:8px 8px 0 #fff;margin-top:8px}.step.act s{color:${A}}
.why{font-size:39px;line-height:1.3;color:#C3CCE4;margin-top:34px;font-weight:600}
.big{font-size:120px}`;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\*(.+?)\*/g,'<b>$1</b>');
const head=(i,n)=>`<div class="blob b1"></div><div class="blob b2"></div><div class="dots"></div><div class="brand"><span class="tg"><i></i></span>Einstellungssache</div><div class="count">${i}/${n}</div>`;
function html(s,i,n){let b='';
 if(s.type==='cover')b=`<div class="wrap"><h1>${esc(s.title)}</h1><div class="sub">${esc(s.sub||'')}</div></div><div class="hero">${mascot(s.mood||'shock',370)}<div class="bub">${esc(s.quip||'')}</div></div><div class="stick">Wischen 👉</div>`;
 if(s.type==='tip')b=`<div class="wrap"><div class="top"><div class="num">${s.num}</div><div class="bub">${esc(s.quip||'')}</div><div class="m">${mascot(s.mood||'happy',215)}</div></div><h2>${esc(s.title)}</h2><div class="path">${s.path.map((p,k)=>`<div class="step"><s>${k+1}</s>${esc(p)}</div>`).join('')}<div class="step act"><s>✓</s>${esc(s.action)}</div></div><div class="why">${esc(s.why)}</div></div>`;
 if(s.type==='outro')b=`<div class="wrap"><h1 class="big">${esc(s.title)}</h1><div class="sub">${esc(s.sub||'')}</div></div><div class="hero">${mascot(s.mood||'wink',370)}<div class="bub">${esc(s.quip||'')}</div></div><div class="stick">@einstellungssache</div>`;
 return `<!doctype html><meta charset="utf-8"><style>${css}</style><body>${head(i,n)}${b}</body>`;}
(async()=>{fs.mkdirSync(out,{recursive:true});const br=await chromium.launch();const pg=await br.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
 const n=post.slides.length;for(let i=0;i<n;i++){await pg.setContent(html(post.slides[i],i+1,n));
  const over=await pg.evaluate(()=>{const w=document.querySelector('.wrap');return w.scrollHeight-w.clientHeight});
  if(over>0)console.log(post.id,'UEBERLAUF Slide',i+1,over,'px');
  await pg.screenshot({path:path.join(out,String(i+1).padStart(2,'0')+'.jpg'),type:'jpeg',quality:92});}
 await br.close();console.log(post.id,'fertig',n);})();
