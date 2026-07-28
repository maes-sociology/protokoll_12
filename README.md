# PROTOKOLL 12 – Version 1.0

## Enthaltene Missionen

- DATEI 03: Turm → 1945 → Fragment 4
- DATEI 04: Pizzeria → 405 → Quersumme 9 → Fragment 9
- DATEI 05: Joppie Remoulade → Schütze → 9. Stelle im Tierkreis → Fragment 9

## Struktur

- `js/mission.js`: gemeinsame Missionslogik
- `js/missions/03.js`, `04.js`, `05.js`: Inhalte und Lösungen
- `js/terminal.js`: Animationen, Navigation, Fortschritt und localStorage

## Versteckter Admin-Reset

Klicke innerhalb von etwa zwei Sekunden fünfmal auf die Überschrift `PROTOKOLL 12 // DATEI XX` oder im Archiv auf `MISSIONSARCHIV // PROTOKOLL 12`. Nach einer Bestätigung werden nur localStorage-Einträge gelöscht, die mit `protokoll12_` beginnen.
