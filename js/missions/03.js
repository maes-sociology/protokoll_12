window.P12_MISSION = {
    fileId: "datei03",
    fragment: "4",
    bootLines: [
        "DATEI 03 WIRD GELADEN ...", "", "QUELLE: < K_ >", "SIGNATUR VERIFIZIERT",
        "DATENPAKET GEFUNDEN", "", "ZUGRIFF ERFORDERT BESTÄTIGUNG"
    ],
    decryptLines: ["ENTSCHLÜSSELUNG GESTARTET ...", "PRÜFE DATENINTEGRITÄT", "KANAL STABIL", "NACHRICHT FREIGEGEBEN"],
    message: `Die KI kennt Karten.

Sie kennt Satellitenbilder.

Sie kennt Millionen Fotos.

Aber sie weiß nicht,
wie sich eine Stadt anfühlt,
wenn man mitten in ihr steht.

Weimar liegt in einem Tal.

Von fast überall in der Stadt
kannst du denselben Turm erkennen.

Er wacht hoch über der Stadt.

Finde ihn.

An seiner Spitze befindet sich
eine Jahreszahl.

Sie wurde nicht mit unseren Zahlen geschrieben.

Übersetze die Jahreszahl vollständig.

Welche Ziffer für PROTOKOLL 12 wichtig ist,
erfährst du erst nach der richtigen Eingabe.

<span class="signature">&lt; K_ &gt;</span>`,
    stages: [{
        label: "JAHRESZAHL EINGEBEN",
        hint: "Gib die vollständig übersetzte Jahreszahl ein.",
        placeholder: "Jahreszahl",
        inputMode: "numeric",
        maxLength: 4,
        answers: ["1945"],
        error: "CODE NICHT AKZEPTIERT. PRÜFE DIE RÖMISCHE ZAHL UND ÜBERSETZE SIE VOLLSTÄNDIG."
    }],
    successHtml: `JAHRESZAHL BESTÄTIGT.<div class="fragment">FÜR PROTOKOLL 12 IST NUR DIE ZEHNERSTELLE RELEVANT<strong>4</strong></div>`
};
