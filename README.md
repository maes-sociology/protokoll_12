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
