window.P12_MISSION = {
    fileId: "datei04",
    fragment: "9",
    bootLines: [
        "DATEI 04 WIRD GELADEN ...", "", "QUELLE: < K_ >", "SIGNATUR VERIFIZIERT",
        "DATENPAKET GEFUNDEN", "", "ZUGRIFF ERFORDERT BESTÄTIGUNG"
    ],
    decryptLines: ["ENTSCHLÜSSELUNG GESTARTET ...", "PRÜFE DATENINTEGRITÄT", "KANAL STABIL", "NACHRICHT FREIGEGEBEN"],
    message: `Die KI kennt Suchmaschinen.

Sie kennt Speisekarten.

Sie kennt Millionen von Einträgen.

Aber sie weiß nicht,
welcher Ort für die Menschen
wirklich der beste ist.

Finde heraus,
wo viele Weimarer sagen,
dass es die beste Pizza der Stadt gibt.

Ein Hinweis:

Der gesuchte Ort liegt direkt
neben einem Eisladen.

Die Speisekarte findest du,
wenn du richtig suchst.

Jede Pizza trägt eine Nummer.

Suche die höchste Nummer.

Gib sie ein.

<span class="signature">&lt; K_ &gt;</span>`,
    stages: [
        {
            label: "HÖCHSTE PIZZANUMMER EINGEBEN",
            hint: "Gib die höchste Nummer auf der Speisekarte ein.",
            placeholder: "Nummer",
            inputMode: "numeric",
            maxLength: 8,
            answers: ["405"],
            error: "CODE NICHT AKZEPTIERT. PRÜFE DIE SPEISEKARTE UND SUCHE DIE HÖCHSTE PIZZANUMMER.",
            transition: `405 BESTÄTIGT.

Die KI sammelt Zahlen.
Menschen erkennen Zusammenhänge.

Bilde die Quersumme:

4 + 0 + 5 = ?

Gib das Ergebnis ein.`
        },
        {
            label: "QUERSUMME EINGEBEN",
            hint: "Addiere die einzelnen Ziffern der bestätigten Nummer.",
            placeholder: "Quersumme",
            inputMode: "numeric",
            maxLength: 2,
            answers: ["9"],
            error: "ERGEBNIS NICHT AKZEPTIERT. ADDIERE 4 + 0 + 5."
        }
    ],
    successHtml: `RICHTIG.<div class="fragment">FRAGMENT GESICHERT<strong>9</strong></div><span class="signature">&lt; K_ &gt;</span>`
};
