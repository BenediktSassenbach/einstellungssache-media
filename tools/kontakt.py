# Kontaktboegen fuer den Bildschirm-Pruefer (10 TikTok-Nutzertypen), 20.11.2026
# python3 tools/kontakt.py <video.mp4> <ausgabeordner> [ID] [abstand_s]
# Ein Standbild alle 2 s (Standard), 15 Kacheln pro Bogen (5 x 3, je 360 x 640), Sekunde oben links.
import os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont
v, out = sys.argv[1], sys.argv[2]
vid = sys.argv[3] if len(sys.argv) > 3 else os.path.splitext(os.path.basename(v))[0]
step = float(sys.argv[4]) if len(sys.argv) > 4 else 2.0
os.makedirs(out, exist_ok=True)
fp = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
font = ImageFont.truetype(fp, 30) if os.path.exists(fp) else ImageFont.load_default()
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', v], capture_output=True, text=True).stdout)
tiles = []
for i in range(int(dur / step) + 1):
    t = round(i * step, 1); f = os.path.join(out, '_k_%s.jpg' % t)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t), '-i', v, '-frames:v', '1', '-vf', 'scale=360:640', f])
    if not os.path.exists(f): continue
    im = Image.open(f).convert('RGB'); d = ImageDraw.Draw(im); d.rectangle([0, 0, 110, 40], fill=(255, 225, 77)); d.text((6, 2), '%ss' % t, fill=(0, 0, 0), font=font); tiles.append(im); os.remove(f)
for s in range(0, len(tiles), 15):
    W = Image.new('RGB', (1800, 1920), (20, 20, 20))
    for i, im in enumerate(tiles[s:s + 15]): W.paste(im, ((i % 5) * 360, (i // 5) * 640))
    W.save(os.path.join(out, '%s_teil%d.jpg' % (vid, s // 15 + 1)), quality=80)
print(vid, round(dur, 1), 's,', len(tiles), 'Kacheln')
