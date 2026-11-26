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

def P028():  # Schaltis Schatten rennt hinterher: schnelle Schritte, ein anschwellendes Vorbeisausen, dann ein leises Wusch und Ausrutschen
    d = 1.2; n = int(SR * d); x = np.zeros(n); t = 0.0; step = .2
    while t < d - .03:
        k = int(t * SR); m = min(n - k, int(.04 * SR)); x[k:k + m] += lp(noise(m), .25) * np.exp(-np.arange(m) / SR * 90); step = max(.09, step * .9); t += step
    tt = T(d); wh = hp(lp(noise(n), .3), .02) * (tt / d) ** 3
    save('P028_0.wav', norm((.8 * x + wh) * env(n, .05, .02), .4))
    d = 1.0; tt = T(d); n = len(tt); wh = hp(lp(noise(n), .25), .02) * np.exp(-tt * 4); sl = lp(noise(n), .06) * np.exp(-((tt - .45) / .12) ** 2)
    save('P028_1.wav', norm((wh + .6 * sl) * env(n, .005, .4), .45))

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

def P022H():  # Schalti hoert seine eigene Aufnahme: Bandstopp nach unten (Aufbau), dann ein trockenes, tiefes "Bonk" und kurzes Zirpen (Fremdscham)
    d = .6; t = T(d); f = 520 * (1 - .8 * (t / d) ** 1.5); ph = 2 * np.pi * np.cumsum(f) / SR
    x = (np.sin(ph) + .4 * np.sin(2 * ph)) * (1 - .6 * t / d) + .15 * hp(noise(len(t)), .3)
    save('P022H_0.wav', norm(x * env(len(t), .02, .05), .32))
    d = .9; t = T(d); bonk = np.sin(2 * np.pi * (140 - 60 * t) * t) * np.exp(-t * 14)
    ch = np.zeros(len(t))
    for i in range(3):
        k = int((.32 + .14 * i) * SR); m = int(.05 * SR); tt = np.arange(m) / SR; ch[k:k + m] += np.sin(2 * np.pi * 4200 * tt) * np.exp(-tt * 60)
    save('P022H_1.wav', norm((bonk + .25 * ch) * env(len(t), .003, .3), .42))

def C020H():  # Chili: Zischen, das anschwillt, dann ein weicher Feuerstoss
    d = .7; t = T(d); x = hp(noise(len(t)), .2) * (t / d) ** 2
    save('C020H_0.wav', norm(x * env(len(t), .05, .03), .3))
    d = .9; t = T(d); x = lp(noise(len(t)), .12) * np.exp(-t * 5) + .3 * hp(noise(len(t)), .3) * np.exp(-t * 9)
    save('C020H_1.wav', norm(x * env(len(t), .005, .3), .42))
def I022H():  # iPhone: Ausschalt-Ton nach unten, dann leise Bluetooth-Pings
    d = .5; t = T(d); f = 900 * (1 - .7 * t / d); x = np.sin(2 * np.pi * np.cumsum(f) / SR) * (1 - t / d)
    save('I022H_0.wav', norm(x * env(len(t), .01, .05), .28))
    d = 1.0; t = T(d); x = np.zeros(len(t))
    for i in range(3):
        k = int((.1 + .28 * i) * SR); m = int(.12 * SR); tt = np.arange(m) / SR; x[k:k + m] += np.sin(2 * np.pi * 1800 * tt) * np.exp(-tt * 30) * (1 - .25 * i)
    save('I022H_1.wav', norm(x, .3))
def B017H():  # T. rex: tiefes Grollen, dann geschichtetes Bruellen mit Atem, Spitze unter der Stimme
    d = .8; g = growl(d, 55, 80, .5); save('B017H_0.wav', norm(lp(g, .2) * env(len(g), .2, .05), .3))
    d = 1.4; t = T(d); r = growl(d, 120, 70, .9) + .6 * hp(lp(noise(len(t)), .3), .02) * np.exp(-t * 2)
    save('B017H_1.wav', norm(lp(r, .35) * env(len(t), .04, .6), .45))
def B023H():  # Kitzeln: Federwisch, dann klappernde Knochen
    d = .5; t = T(d); x = hp(lp(noise(len(t)), .4), .05) * np.sin(np.pi * t / d)
    save('B023H_0.wav', norm(x, .25))
    d = 1.0; t = T(d); x = np.zeros(len(t))
    for i in range(9):
        k = int((.04 + .1 * i + .02 * np.sin(i * 3)) * SR); m = int(.03 * SR); tt = np.arange(m) / SR; x[k:k + m] += np.sin(2 * np.pi * (700 + 160 * (i % 3)) * tt) * np.exp(-tt * 120)
    save('B023H_1.wav', norm(x * env(len(t), .005, .3), .35))
def B029H():  # Schichten loesen sich: kurzes Rascheln, dann weiche Aufpraller nacheinander
    d = .4; t = T(d); x = hp(lp(noise(len(t)), .3), .03) * (t / d)
    save('B029H_0.wav', norm(x * env(len(t), .05, .02), .22))
    d = 1.6; t = T(d); x = np.zeros(len(t))
    for i in range(5):
        k = int((.12 * i + .25) * SR); m = int(.18 * SR); tt = np.arange(m) / SR; x[k:k + m] += np.sin(2 * np.pi * (110 - 8 * i) * tt) * np.exp(-tt * 22) + .3 * lp(noise(m), .1) * np.exp(-tt * 30)
    save('B029H_1.wav', norm(x * env(len(t), .005, .3), .4))

def C006H():  # Streusalz: kurzes Wegrutschen (Quietschen), dann dumpfer Aufprall aufs Eis und Schlittern, das ausklingt
    d = .32; t = T(d); f = np.linspace(900, 1700, len(t)); sq = np.sin(2 * np.pi * np.cumsum(f) / SR) * (1 + .3 * np.sin(2 * np.pi * 40 * t))
    a = .6 * sq + .4 * hp(noise(len(t)), .3)
    save('C006H_0.wav', norm(a * env(len(t), .05, .03), .32))
    d = 2.6; t = T(d)
    thud = lp(noise(len(t)), .03) * np.exp(-t * 14) + .8 * np.sin(2 * np.pi * 70 * t) * np.exp(-t * 12)
    scrape = hp(lp(noise(len(t)), .5), .05) * (1 + .5 * np.sin(2 * np.pi * 9 * t)) * np.exp(-t * 1.1) * np.clip(t / .08, 0, 1)
    x = .9 * thud + .45 * scrape
    save('C006H_1.wav', norm(x * env(len(t), .002, .5), .45))

def B013H():  # Schwanzkeule: Ausholen mit anschwellendem Luftzug, dann Holz bricht (Krachen, dumpfer Schlag, Splitter)
    d = .95; t = T(d); w = hp(lp(noise(len(t)), .35), .02) * (t / d) ** 2.2 + .25 * np.sin(2 * np.pi * 55 * t) * (t / d) ** 3
    save('B013H_0.wav', norm(w * env(len(t), .3, .01), .3))
    d = 1.6; t = T(d)
    thud = lp(noise(len(t)), .04) * np.exp(-t * 16) + .9 * np.sin(2 * np.pi * 62 * t) * np.exp(-t * 10)
    crack = hp(noise(len(t)), .4) * np.exp(-t * 28)
    spl = np.zeros(len(t))
    for i in range(7):
        k = int((.06 + .09 * i + .03 * rng.random()) * SR); m = int(.05 * SR); tt = np.arange(m) / SR; spl[k:k + m] += hp(noise(m), .3) * np.exp(-tt * 60) * (1 - i / 9)
    x = .9 * thud + .7 * crack + .4 * spl
    save('B013H_1.wav', norm(x * env(len(t), .002, .4), .45))

def P017():  # Lichterkette: Kerze wird gedreht (knirschende Klicks, schneller werdend), dann Klick und Abschalten (tiefes Ploppen, Brummen faellt ab)
    d = 1.05; t = T(d); x = np.zeros(len(t))
    for i in range(9):
        k = int((.05 + .11 * i - .004 * i * i) * SR); m = int(.03 * SR); tt = np.arange(m) / SR; x[k:k + m] += hp(noise(m), .4) * np.exp(-tt * 120) * (.4 + .06 * i)
    save('P017_0.wav', norm(x * env(len(t), .01, .02), .25))
    d = 1.2; t = T(d); click = np.zeros(len(t)); m = int(.02 * SR); click[:m] = hp(noise(m), .5) * np.exp(-np.arange(m) / SR * 200)
    hum = np.sin(2 * np.pi * np.cumsum(100 * (1 - .6 * t / d)) / SR) * np.exp(-t * 3) * .5
    pop = np.sin(2 * np.pi * 70 * t) * np.exp(-t * 18)
    save('P017_1.wav', norm((click + .8 * pop + hum) * env(len(t), .002, .3), .35))

for a in sys.argv[1:]: globals()[a]()
