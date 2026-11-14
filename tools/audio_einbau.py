# Audio einbauen nach Bauplan Schritt 6: python3 tools/audio_einbau.py videos/C001 <Rohordner mit 1.mp3, 1.json ...> [SFX-Kuerzel]
# - entfernt Regie-Anweisungen [..] aus den Zeitstempeln, legt den Gag (Beginn der letzten Zeile in Szene 1) auf den Beginn der Anweisung
# - ersetzt ausgeschriebene Sprechweisen durch den Skripttext (Schluessel "sprich" im Skript: {"eins eins zwei": "112"})
# - haengt den Schlusssatz aus videos/_outro an die letzte Szene, ruft zeiten.py auf
# - mischt in Szene 1 die Soundeffekte videos/_sfx/<ID>_0.wav (endet am Einschlag) und <ID>_1.wav (beginnt am Einschlag),
#   Stimme nach dem Einschlag leicht gedaempft. "gagDelay" im Skript = Sekunden zwischen Gag-Beginn und Einschlag.
import json, os, re, subprocess, sys
d, roh = sys.argv[1], sys.argv[2]; S = json.load(open(os.path.join(d, 'script.json'), encoding='utf8')); sid = sys.argv[3] if len(sys.argv) > 3 else S['id']
A = os.path.join(d, 'audio'); os.makedirs(A, exist_ok=True); N = len(S['scenes']); root = os.path.dirname(os.path.dirname(os.path.abspath(d)))
ff = lambda *a: subprocess.run(['ffmpeg', '-y', '-v', 'error', *a], check=True)
dur = lambda f: float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
def cut(al, a, b, neu=''):  # Zeichen a..b-1 durch neu ersetzen, Zeit gleichmaessig verteilt
    c, s, e = al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']
    t0, t1 = s[a], e[b - 1]; n = len(neu); ns = [t0 + (t1 - t0) * i / max(1, n) for i in range(n)]; ne = [t0 + (t1 - t0) * (i + 1) / max(1, n) for i in range(n)]
    c[a:b] = list(neu); s[a:b] = ns; e[a:b] = ne
gag = None
for i in range(1, N + 1):
    al = json.load(open(os.path.join(roh, f'{i}.json'), encoding='utf-8-sig'))['alignment']
    while True:
        txt = ''.join(al['characters']); m = re.search(r'(\[[^\]]*\] ?)+', txt)
        if not m: break
        if i == 1 and gag is None: gag = al['character_start_times_seconds'][m.start()]
        cut(al, m.start(), m.end())
    for k, v in (S.get('sprich') or {}).items():
        txt = ''.join(al['characters']); p = txt.find(k)
        if p >= 0: cut(al, p, p + len(k), v)
    src = os.path.join(roh, f'{i}.mp3'); dst = os.path.join(A, f'{i}.mp3')
    if i == N:  # Schlusssatz anhaengen
        o = os.path.join(root, 'videos', '_outro', 'einstellungssache'); oa = json.load(open(o + '.json', encoding='utf-8-sig'))['alignment']
        skip = ''.join(oa['characters']).index('] ') + 2; off = dur(src) + 0.3
        ff('-i', src, '-i', o + '.mp3', '-filter_complex', '[0:a]apad=pad_dur=0.3[a];[a][1:a]concat=n=2:v=0:a=1', '-b:a', '192k', dst)
        al['characters'] += [' '] + oa['characters'][skip:]; e0 = al['character_end_times_seconds'][-1]
        al['character_start_times_seconds'] += [e0] + [x + off for x in oa['character_start_times_seconds'][skip:]]
        al['character_end_times_seconds'] += [off + oa['character_start_times_seconds'][skip]] + [x + off for x in oa['character_end_times_seconds'][skip:]]
    elif i == 1 and gag is not None:
        hit = gag + S.get('gagDelay', 0); s0 = os.path.join(root, 'videos', '_sfx', sid + '_0.wav'); s1 = os.path.join(root, 'videos', '_sfx', sid + '_1.wav'); d0 = dur(s0)
        lp = 'lowpass=f=2600,volume=1.15' if S.get('gagDumpf') else 'anull'
        fc = (f'[0:a]asplit[v1][v2];[v1]atrim=0:{hit},asetpts=PTS-STARTPTS[a];[v2]atrim={hit},asetpts=PTS-STARTPTS,{lp}[b];[a][b]concat=n=2:v=0:a=1[v];'
              f'[1:a]volume=0.5,adelay={int(max(0, hit - d0) * 1000)}:all=1[x];[2:a]volume=0.9,adelay={int(hit * 1000)}:all=1[y];[v][x][y]amix=inputs=3:normalize=0:duration=first')
        ff('-i', src, '-i', s0, '-i', s1, '-filter_complex', fc, '-b:a', '192k', dst)
    else: ff('-i', src, '-c', 'copy', dst)
    json.dump({'alignment': al}, open(os.path.join(A, f'{i}.json'), 'w', encoding='utf8'), ensure_ascii=False)
subprocess.run([sys.executable, os.path.join(root, 'tools', 'zeiten.py'), d], check=True)
zp = os.path.join(d, 'zeiten.json'); Z = json.load(open(zp))
if gag is not None: Z['szenen'][0]['zeilen'][-1][0] = round(gag, 3); json.dump(Z, open(zp, 'w'), indent=1)
print('Gag bei', gag, '| Quellen:', [z['quelle'] for z in Z['szenen']])
