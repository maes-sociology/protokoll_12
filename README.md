# PROTOKOLL 12 – Finale Cleanup

Neue Videos:

Video 1:
https://youtu.be/vS7MWTPu1gw

Video 2:
https://youtu.be/BfsF_5ogz8c

## Ablauf

1. Bootsequenz
2. Video 1
3. Löschabfrage
4. Löschanimation
5. Wiederherstellungssequenz
6. Video 2
7. Endbildschirm: KEINE DATEN VORHANDEN

Der Cursor verschwindet nach fünf Sekunden.

## Installation

Ersetze im GitHub-Projekt:

- finale.html
- css/finale.css
- js/finale.js

Danach:
1. Commit to main
2. Push origin
3. finale.html mit Cmd+Shift+R / Strg+F5 neu laden

Wichtig:
Der Fehler, bei dem „KEINE DATEN VORHANDEN“ bereits zu Beginn erschien,
ist durch `[hidden]{display:none !important;}` behoben.
