// Slide-Generator Einstellungssache: node slides.js post.json outdir
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const post=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));const out=process.argv[3];
const css=`*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1920px;background:#0B1020;color:#F4F6FB;font-family:'Inter Display','Inter',sans-serif;position:relative;overflow:hidden}
.glow{position:absolute;width:1100px;height:1100px;border-radius:50%;background:#111A33;right:-420px;top:-380px}
.wrap{position:absolute;left:84px;right:150px;top:230px;bottom:470px;display:flex;flex-direction:column}
.brand{position:absolute;left:84px;top:120px;display:flex;align-items:center;gap:20px;font-size:34px;font-weight:600;color:#9AA6C4;letter-spacing:.01em}
.tg{width:74px;height:40px;border-radius:20px;background:#C6FF3D;position:relative}
.tg i{position:absolute;right:5px;top:5px;width:30px;height:30px;border-radius:50%;background:#0B1020}
.count{position:absolute;right:84px;top:120px;font-size:34px;font-weight:600;color:#9AA6C4}
h1{font-size:128px;line-height:1.02;font-weight:800;letter-spacing:-.035em;margin-top:150px}
h1 b{color:#C6FF3D;font-weight:800}
.sub{font-size:48px;line-height:1.3;color:#B9C2DA;margin-top:48px;font-weight:500}
.num{font-size:200px;font-weight:800;line-height:.85;color:#C6FF3D;letter-spacing:-.05em;margin-top:10px}
h2{font-size:92px;line-height:1.04;font-weight:800;letter-spacing:-.03em;margin-top:24px}
.path{margin-top:48px;display:flex;flex-direction:column;gap:18px}
.step{display:flex;align-items:center;gap:22px;font-size:44px;font-weight:600;background:#18223F;border-radius:26px;padding:22px 30px}
.step s{flex:none;width:52px;height:52px;border-radius:50%;background:#0B1020;color:#C6FF3D;font-size:30px;font-weight:700;display:flex;align-items:center;justify-content:center;text-decoration:none}
.step.act{background:#C6FF3D;color:#0B1020}.step.act s{background:#0B1020}
.why{font-size:44px;line-height:1.32;color:#B9C2DA;margin-top:40px;font-weight:500}
.cta{position:absolute;left:84px;bottom:500px;font-size:44px;font-weight:700;color:#C6FF3D}
.big{font-size:150px}`;
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\*(.+?)\*/g,'<b>$1</b>');
const head=(i,n)=>`<div class="glow"></div><div class="brand"><span class="tg"><i></i></span>Einstellungssache</div><div class="count">${i}/${n}</div>`;
function html(s,i,n){let b='';
 if(s.type==='cover')b=`<div class="wrap"><h1>${esc(s.title)}</h1><div class="sub">${esc(s.sub||'')}</div></div><div class="cta">Wischen →</div>`;
 if(s.type==='tip')b=`<div class="wrap"><div class="num">${s.num}</div><h2>${esc(s.title)}</h2><div class="path">${s.path.map((p,k)=>`<div class="step"><s>${k+1}</s>${esc(p)}</div>`).join('')}<div class="step act"><s>✓</s>${esc(s.action)}</div></div><div class="why">${esc(s.why)}</div></div>`;
 if(s.type==='outro')b=`<div class="wrap"><h1 class="big">${esc(s.title)}</h1><div class="sub">${esc(s.sub||'')}</div></div><div class="cta">@einstellungssache</div>`;
 return `<!doctype html><meta charset="utf-8"><style>${css}</style><body>${head(i,n)}${b}</body>`;}
(async()=>{fs.mkdirSync(out,{recursive:true});const br=await chromium.launch();const pg=await br.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
 const n=post.slides.length;for(let i=0;i<n;i++){await pg.setContent(html(post.slides[i],i+1,n));
  const over=await pg.evaluate(()=>{const w=document.querySelector('.wrap');return w.scrollHeight-w.clientHeight});
  if(over>0)console.log('UEBERLAUF Slide',i+1,over,'px');
  await pg.screenshot({path:path.join(out,String(i+1).padStart(2,'0')+'.jpg'),type:'jpeg',quality:92});}
 await br.close();console.log('fertig',n);})();
