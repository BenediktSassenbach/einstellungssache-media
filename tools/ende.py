# Video endet direkt nach dem letzten Wort (Skript 3.0): python3 tools/ende.py videos/P007V3
# Kuerzt in zeiten.json die Dauer der letzten Szene auf das Ende des Tons (Stille am Ende der Aufnahme weg) plus 0,1 s und setzt im Skript die Pause nach dem Schluss auf 0,05 s.
# Nach jedem Lauf von audio_einbau.py bzw. zeiten.py erneut ausfuehren.
import json, os, sys
d = sys.argv[1]; zp = os.path.join(d, 'zeiten.json'); sp = os.path.join(d, 'script.json')
S = json.load(open(sp, encoding='utf8')); S['scenes'][-1]['pause'] = 0.05
json.dump(S, open(sp, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
if os.path.exists(zp):
    import re, subprocess
    Z = json.load(open(zp)); z = Z['szenen'][-1]; f = os.path.join(d, 'audio', str(len(Z['szenen'])) + '.mp3')
    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)
    out = subprocess.run(['ffmpeg', '-v', 'info', '-i', f, '-af', 'silencedetect=noise=-38dB:d=0.2', '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)', out)]  # Stille am Ende der Aufnahme: ab dem letzten silence_start, wenn er in der letzten Sekunde liegt
    end = st[-1] if st and st[-1] > dur - 1.0 else dur
    alt = z['dauer']; z['dauer'] = round(min(dur, end + 0.1), 3); json.dump(Z, open(zp, 'w'), indent=1); print(d, 'Schluss', alt, '->', z['dauer'])
