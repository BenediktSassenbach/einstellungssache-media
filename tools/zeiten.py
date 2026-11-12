# Sprechzeiten aus den Szenen-Audios ableiten: python3 tools/zeiten.py videos/V001
# Erwartet audio/1.mp3 ... audio/N.mp3 (eine Datei pro Szene), schreibt zeiten.json.
import json, re, subprocess, sys, os
d = sys.argv[1]; S = json.load(open(os.path.join(d, 'script.json'), encoding='utf8')); out = []
for i, sc in enumerate(S['scenes']):
    f = os.path.join(d, 'audio', f'{i+1}.mp3')
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
    log = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'silencedetect=noise=-32dB:d=0.18', '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]; en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
    sil = [(a, b) for a, b in zip(st, en) if a > 0.2 and b < dur - 0.1]
    end_voice = st[-1] if len(st) > len(sil) and st[-1] > dur - 0.6 else dur
    L = [len(l['t']) for l in sc['lines']]; tot = sum(L); cum = 0; cuts = []; used = set()
    for n in L[:-1]:
        cum += n + 1; exp = end_voice * cum / (tot + len(L) - 1)
        best = min((k for k in range(len(sil)) if k not in used), key=lambda k: abs((sil[k][0] + sil[k][1]) / 2 - exp), default=None)
        if best is not None and abs((sil[best][0] + sil[best][1]) / 2 - exp) < 0.75: used.add(best); cuts.append(sil[best])
        else: cuts.append(None)
    for k, c in enumerate(cuts):  # ohne Pause: anteilig zwischen den Nachbar-Pausen verteilen
        if c is None:
            j = next((m for m in range(k + 1, len(cuts)) if cuts[m] is not None), None)
            lo = cuts[k - 1][1] if k else 0.0; hi = cuts[j][0] if j is not None else end_voice
            grp = L[k:(j + 1 if j is not None else len(L))]; x = lo + (hi - lo) * (L[k] + 1) / (sum(grp) + len(grp))
            cuts[k] = (x - 0.03, x + 0.03)
    z = []; a = 0.0
    for c in cuts: z.append([round(a, 3), round(c[0], 3)]); a = c[1]
    z.append([round(a, 3), round(end_voice, 3)])
    out.append({'dauer': round(dur, 3), 'zeilen': z})
    print(i + 1, round(dur, 2), [(x[0], x[1]) for x in z])
json.dump({'szenen': out}, open(os.path.join(d, 'zeiten.json'), 'w'), indent=1)
