# Option Dance (Skript Schicht fuer Schicht, Abschnitt 6b). # Mischt den Tanz-Song in ein Video: Start = Ende der Ankuendigung (zeitplan.json), Ausblenden am Videoende.
# Aufruf: python3 mix_tanz.py video.mp4 zeitplan.json song.mp3 ziel.mp4 [lautstaerke_db]
import sys, json, subprocess
vid, zp, song, out = sys.argv[1:5]; db = float(sys.argv[5]) if len(sys.argv) > 5 else -1
z = json.load(open(zp)); sc = z['scenes'] if isinstance(z, dict) else z
start = sc[-1]['lines'][-1]['end'] + .05
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', vid]).decode())
rest = dur - start
ms = int(start * 1000)
fc = f"[1:a]atrim=0:{rest:.3f},volume={db}dB,afade=t=in:d=0.05,afade=t=out:st={max(0, rest - .35):.3f}:d=0.35,adelay={ms}|{ms},apad[m]"
has_a = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=index', '-of', 'csv=p=0', vid], capture_output=True).stdout.strip()
if has_a: fc += ";[0:a][m]amix=inputs=2:normalize=0:duration=first[a]"
else: fc += ";[m]atrim=0:" + f"{dur:.3f}" + "[a]"
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', vid, '-i', song, '-filter_complex', fc, '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-shortest', out], check=True)
print('Song ab', round(start, 2), 's, Laenge', round(rest, 2), 's ->', out)
