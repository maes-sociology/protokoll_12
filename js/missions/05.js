window.P12_MISSION = {
    fileId: "datei05",
    fragment: "9",
    bootLines: [
        "DATEI 05 WIRD GELADEN ...", "", "QUELLE: < K_ >", "SIGNATUR VERIFIZIERT",
        "DATENPAKET GEFUNDEN", "", "ZUGRIFF ERFORDERT BESTÄTIGUNG"
    ],
    decryptLines: ["ENTSCHLÜSSELUNG GESTARTET ...", "PRÜFE DATENINTEGRITÄT", "KANAL STABIL", "NACHRICHT FREIGEGEBEN"],
    message: `Die KI sucht nach Adressen.

Menschen erkennen,
dass manche Straßennamen
mehr verraten als Wegbeschreibungen.

Finde heraus,
wo man in Weimar
die Joppie Remoulade
bekommen kann.

Im Namen der Straße
verbirgt sich
ein Sternzeichen.

Finde es.

<span class="signature">&lt; K_ &gt;</span>`,
    stages: [
        {
            label: "STERNZEICHEN EINGEBEN",
            hint: "Gib das Sternzeichen ein, das sich im Straßennamen verbirgt.",
            placeholder: "Sternzeichen",
            inputMode: "text",
            maxLength: 16,
            normalizeUmlauts: true,
            answers: ["Schütze", "Schuetze"],
            error: "ANTWORT NICHT AKZEPTIERT. FINDE DEN ORT UND UNTERSUCHE DEN NAMEN DER STRASSE.",
            transition: `RICHTIG.

Die KI erkennt Straßennamen.

Menschen erkennen,
was sich darin verbirgt.

Der Schütze
ist nicht nur ein Wort.

An welcher Stelle
steht dieses Sternzeichen
im Tierkreis?`
        },
        {
            label: "POSITION IM TIERKREIS EINGEBEN",
            hint: "Gib die Position des Sternzeichens als Zahl ein.",
            placeholder: "Position",
            inputMode: "numeric",
            maxLength: 2,
            answers: ["9", "09"],
            error: "POSITION NICHT AKZEPTIERT. ZÄHLE DIE STERNZEICHEN IM TIERKREIS."
        }
    ],
    successHtml: `RICHTIG.<div class="fragment">FRAGMENT GESICHERT<strong>9</strong></div><span class="signature">&lt; K_ &gt;</span>`
};
