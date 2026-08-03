# PROTOKOLL 12 – Version 1.0

## Enthaltene Missionen

- DATEI 03: Turm → 1945 → Fragment 4
- DATEI 04: Pizzeria → 405 → Quersumme 9 → Fragment 9
- DATEI 05: Joppie Remoulade → Schütze → 9. Stelle im Tierkreis → Fragment 9

## Weitere Ideen:
- Gruppe 1: fährt mit Linie 1 nach Weimar Nord und Ehringsdorf
- Gruppe 2: fährt mit Linie 7 nach Schöndorf und

## Datei 1: Kipperquelle
Frage aufbauen über das Fahrradhotel. Dieses hat den Namen Kipperquelle. So finden die Kinder die Quelle. Dort muss etwas gefunden werden
(Kinder müssen mit Linie 1 zur Haltstelle Kippergasse -> dort was verstecken)

## Datei 10: Schöndorf
Kinder fahren bis maximal Siedlung Schöndorf

## Struktur

- `js/mission.js`: gemeinsame Missionslogik
- `js/missions/03.js`, `04.js`, `05.js`: Inhalte und Lösungen
- `js/terminal.js`: Animationen, Navigation, Fortschritt und localStorage

## Versteckter Admin-Reset

Klicke innerhalb von etwa zwei Sekunden fünfmal auf die Überschrift `PROTOKOLL 12 // DATEI XX` oder im Archiv auf `MISSIONSARCHIV // PROTOKOLL 12`. Nach einer Bestätigung werden nur localStorage-Einträge gelöscht, die mit `protokoll12_` beginnen.


## Version 1.0.1
- Archivkarten DATEI 03–05 werden aus einer gemeinsamen Vorlage erzeugt.
- DATEI 05 hat nach Abschluss exakt dieselbe Struktur wie DATEI 03 und 04.
- Cache-Version der CSS- und JavaScript-Dateien wurde erhöht.
