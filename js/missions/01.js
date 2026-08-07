window.P12_MISSION = {
    fileId: "datei01",
    fragment: "N",
    bootLines: [
        "DATEI 01 WIRD GELADEN ...", "", "QUELLE: < K_ >", "SIGNATUR VERIFIZIERT",
        "DATENPAKET GEFUNDEN", "", "ZUGRIFF ERFORDERT BESTÄTIGUNG"
    ],
    decryptLines: ["ENTSCHLÜSSELUNG GESTARTET ...", "PRÜFE DATENINTEGRITÄT", "KANAL STABIL", "NACHRICHT FREIGEGEBEN"],
    message: `Die KI kennt alle Geschäfte.

Sie kennt ihre Adressen.

Sie kennt ihre Öffnungszeiten.

Aber kennt sie auch die Menschen,
die dort arbeiten?

In Weimar wird viel Rad gefahren.

Eines der älteren Fahrradgeschäfte
hat ein Geschwistergeschäft.

Dort drehen sich ebenfalls Räder.

Aber sie sind viel kleiner.

Was kann man dort kaufen?

<span class="signature">&lt; K_ &gt;</span>`,
    stages: [
        {
            label: "WARE EINGEBEN",
            hint: "Was kann man im Geschwistergeschäft kaufen?",
            placeholder: "Antwort",
            inputMode: "text",
            maxLength: 24,
            normalizeUmlauts: true,
            answers: ["Nähmaschine", "Nähmaschinen", "Naehmaschine", "Naehmaschinen"],
            error: "ANTWORT NICHT AKZEPTIERT. SUCHE NACH DER VERBINDUNG ZWISCHEN DEM FAHRRADGESCHÄFT UND SEINEM GESCHWISTERGESCHÄFT.",
            transition: `RICHTIG.

Die KI hat zwei Geschäfte gefunden.

Ihr habt erkannt,
was sie miteinander verbindet.

Für PROTOKOLL 12
brauche ich nur
den ersten Buchstaben.

Gib ihn ein.`
        },
        {
            label: "ERSTEN BUCHSTABEN EINGEBEN",
            hint: "Gib nur den ersten Buchstaben der Lösung ein.",
            placeholder: "Buchstabe",
            inputMode: "text",
            maxLength: 1,
            answers: ["N"],
            error: "BUCHSTABE NICHT AKZEPTIERT. NIMM DEN ERSTEN BUCHSTABEN DER GEFUNDENEN WARE."
        }
    ],
    successHtml: `RICHTIG.<div class="fragment">FRAGMENT GESICHERT<strong>N</strong></div><span class="signature">&lt; K_ &gt;</span>`
};
