window.P12_MISSION = {
    fileId: "datei02",
    fragment: "G",
    bootLines: [
        "DATEI 02 WIRD GELADEN ...", "", "QUELLE: < K_ >", "SIGNATUR VERIFIZIERT",
        "DATENPAKET GEFUNDEN", "", "ZUGRIFF ERFORDERT BESTÄTIGUNG"
    ],
    decryptLines: ["ENTSCHLÜSSELUNG GESTARTET ...", "PRÜFE DATENINTEGRITÄT", "KANAL STABIL", "NACHRICHT FREIGEGEBEN"],
    message: `Die KI kennt jedes Denkmal.

Aber sie kennt keine Kindheit.

In Weimar gibt es viele Brunnen.

Dort findet man alles:
Frösche, Götter und Muscheln.

Einen Brunnen lieben aber fast alle Kinder.

Denn dort kann man sich besonders gut
und ganz ohne Klettereinlagen
nassspritzen.

Welche berühmte Person wollte unbedingt,
dass dieser Brunnen in Weimar gebaut wird?

<span class="signature">&lt; K_ &gt;</span>`,
    stages: [
        {
            label: "PERSON EINGEBEN",
            hint: "Gib den Nachnamen der gesuchten Person ein.",
            placeholder: "Nachname",
            inputMode: "text",
            maxLength: 24,
            normalizeUmlauts: true,
            answers: ["Goethe", "Johann Wolfgang von Goethe"],
            error: "ANTWORT NICHT AKZEPTIERT. FINDE ZUERST DEN BRUNNEN, DEN VIELE WEIMARER KINDER ZUM NASSSPRITZEN NUTZEN.",
            transition: `RICHTIG.

Die KI kennt den Namen.

Ihr kennt die Erinnerung.

Für PROTOKOLL 12
brauche ich nur
den ersten Buchstaben.

Gib ihn ein.`
        },
        {
            label: "ERSTEN BUCHSTABEN EINGEBEN",
            hint: "Gib nur den ersten Buchstaben des Nachnamens ein.",
            placeholder: "Buchstabe",
            inputMode: "text",
            maxLength: 1,
            answers: ["G"],
            error: "BUCHSTABE NICHT AKZEPTIERT. NIMM DEN ERSTEN BUCHSTABEN DES GEFUNDENEN NACHNAMENS."
        }
    ],
    successHtml: `RICHTIG.<div class="fragment">FRAGMENT GESICHERT<strong>G</strong></div><span class="signature">&lt; K_ &gt;</span>`
};
