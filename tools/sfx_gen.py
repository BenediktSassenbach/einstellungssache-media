# Gag-Geraeusche synthetisch erzeugen (keine fremden Aufnahmen): python3 tools/sfx_gen.py <ID> ...
# Je Video zwei Dateien in videos/_sfx: <ID>_0.wav endet am Einschlag (Aufbau), <ID>_1.wav beginnt am Einschlag.
# Pegel bewusst unter der Stimme (Spitze etwa -6 dB), weich ein- und ausgeblendet.
import sys, os, wave
import numpy as np
SR = 44100
rng = np.random.default_rng(7)
T = lambda d: np.arange(int(SR * d)) / SR
def noise(n): return rng.standard_normal(n)
def lp(x, a):  # einfacher Tiefpass 1. Ordnung, a in (0,1): kleiner = dumpfer
    y = np.empty_like(x); s = 0.0
    for i, v in enumerate(x): s += a * (v - s); y[i] = s
    return y
def hp(x, a): return x - lp(x, a)
def env(n, att, rel, sr=SR):
    e = np.ones(n); A = max(1, int(att * sr)); R = max(1, int(rel * sr))
    e[:A] = np.linspace(0, 1, A); e[-R:] *= np.linspace(1, 0, R) ** 1.5; return e
def norm(x, peak=0.5): m = np.max(np.abs(x)) or 1; return x / m * peak
def save(name, x):
    x = np.clip(x, -1, 1); d = os.path.join(os.path.dirname(__file__), '..', 'videos', '_sfx'); os.makedirs(d, exist_ok=True)
    with wave.open(os.path.join(d, name), 'w') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype('<i2').tobytes())
    print(name, round(len(x) / SR, 2), 's')

def growl(d, f0, f1, rough=.6):
    t = T(d); f = np.linspace(f0, f1, len(t)); ph = 2 * np.pi * np.cumsum(f) / SR
    am = 1 + rough * np.sin(2 * np.pi * 28 * t + 3 * np.sin(2 * np.pi * 7 * t))
    s = (np.sin(ph) + .5 * np.sin(2 * ph + .3) + .3 * np.sin(3 * ph + .9)) * am
    s += .5 * lp(noise(len(t)), .08) * am
    return s

def B006():  # Velociraptor faucht: tiefes Grollen, dann geschichteter Fauch-Schrei mit Atem und Hall, Spitze unter der Stimme
    a = growl(.8, 70, 120, .7) * np.linspace(.2, 1, int(SR * .8)) ** 1.5
    save('B006_0.wav', norm(lp(a, .25) * env(len(a), .15, .02), .45))
    d = 1.3; t = T(d)
    scr = growl(d, 420, 260, .9); scr = hp(lp(scr, .5), .02)
    hiss = hp(noise(len(t)), .35) * np.exp(-t * 2.2)
    low = growl(d, 110, 70, .5)
    x = .55 * scr * np.exp(-t * 1.6) + .5 * low * np.exp(-t * 2.5) + .35 * hiss
    for dl, g in ((.07, .35), (.13, .25), (.21, .15)): k = int(dl * SR); x[k:] += g * x[:-k]
    save('B006_1.wav', norm(x * env(len(t), .01, .5), .5))

def I028():  # Schalti zeichnet 30 Bilder im Akkord: immer schnellere Blaetter-Ticks, dann ein weicher Plumps
    d = 1.0; n = int(SR * d); x = np.zeros(n); t = 0.0; step = .12
    while t < d - .02:
        k = int(t * SR); m = min(n - k, int(.025 * SR)); x[k:k + m] += hp(noise(m), .3) * np.exp(-np.arange(m) / SR * 160); step = max(.03, step * .9); t += step
    save('I028_0.wav', norm(x * np.linspace(.4, 1, n), .4))
    d = .6; t = T(d); th = np.sin(2 * np.pi * np.linspace(90, 45, len(t)) * t) * np.exp(-t * 9) + .4 * lp(noise(len(t)), .05) * np.exp(-t * 12)
    save('I028_1.wav', norm(th * env(len(t), .003, .3), .5))

def I029():  # Kiste unter Druck: aechzendes Knarzen, das ansteigt, dann ein Plopp mit herumfliegenden Spielehuellen
    d = .9; t = T(d); f = np.linspace(55, 140, len(t)); ph = 2 * np.pi * np.cumsum(f) / SR
    cr = np.sign(np.sin(ph)) * (1 + .5 * np.sin(2 * np.pi * 13 * t)); cr = lp(cr, .2) + .3 * lp(noise(len(t)), .1)
    save('I029_0.wav', norm(cr * np.linspace(.2, 1, len(t)) ** 1.3 * env(len(t), .1, .02), .38))
    d = 1.2; t = T(d); pop = (np.sin(2 * np.pi * np.linspace(160, 60, len(t)) * t) * np.exp(-t * 18) + .8 * lp(noise(len(t)), .3) * np.exp(-t * 25))
    cl = np.zeros(len(t))
    for i in range(9):
        k = int((.08 + .1 * i + .04 * rng.random()) * SR); m = int(.04 * SR)
        if k + m < len(t): cl[k:k + m] += hp(noise(m), .4) * np.exp(-np.arange(m) / SR * 90) * (1 - i / 10)
    save('I029_1.wav', norm((pop + .5 * cl) * env(len(t), .002, .4), .5))

def C021():  # Cola: Sprudeln, das immer staerker wird, dann zischende Fontaene mit Platschen
    d = 1.0; t = T(d); x = np.zeros(len(t))
    for i in range(int(260)):
        k = int(rng.random() ** .6 * (len(t) - 600)); m = 300; f = 1200 + 2500 * rng.random()
        x[k:k + m] += np.sin(2 * np.pi * f * np.arange(m) / SR) * np.exp(-np.arange(m) / SR * 400)
    x += .4 * hp(noise(len(t)), .3) * np.linspace(0, 1, len(t)) ** 2
    save('C021_0.wav', norm(x * env(len(t), .2, .02), .38))
    d = 1.5; t = T(d); wh = hp(lp(noise(len(t)), .35), .05) * (np.exp(-t * 1.8)); sp = np.zeros(len(t))
    for i in range(6):
        k = int((.35 + .17 * i) * SR); m = int(.12 * SR)
        if k + m < len(t): sp[k:k + m] += lp(noise(m), .2) * np.exp(-np.arange(m) / SR * 30) * (1 - i / 7)
    save('C021_1.wav', norm((wh + .7 * sp) * env(len(t), .01, .5), .5))

for a in sys.argv[1:]: globals()[a]()
