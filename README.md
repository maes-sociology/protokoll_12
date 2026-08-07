# PROTOKOLL 12 – Finale-Zugang

QR-Code im Eisladen → `zugang.html`

Die Kinder tragen dort die zehn Fragmente aus DATEI 01–10 ein.
Erst wenn alle zehn stimmen, wird `finale.html` freigeschaltet.

Aktuell bekannte Fragmente:
01 = N
02 = G
03 = 4
04 = 9
05 = 9

06–10 stehen in `js/zugang.js` noch als `___`.

Sobald die fünf übrigen Rätsel feststehen, ändere dort nur:

const EXPECTED_FRAGMENTS = [
  "N","G","4","9","9",
  "...","...","...","...","..."
];

Optionaler Schutz für finale.html:
Füge direkt vor den bestehenden Scripts ein:

<script src="js/finale-guard.js?v=1"></script>

Dann wird ein direkter Aufruf von finale.html auf zugang.html zurückgeleitet,
solange die richtige Kombination noch nicht eingegeben wurde.


## Testmodus

Für Tests kannst du in alle zehn Eingabefelder einfach `42` eintragen.

Also:

01 = 42
02 = 42
03 = 42
04 = 42
05 = 42
06 = 42
07 = 42
08 = 42
09 = 42
10 = 42

Dann wird das Finale freigeschaltet, auch solange die echten Fragmente 06–10 noch nicht feststehen.
