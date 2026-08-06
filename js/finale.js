const stageIds = [
    "bootStage",
    "videoStage",
    "decisionStage",
    "deleteStage",
    "afterDeleteStage"
];

const el = id => document.getElementById(id);

const systemStatus = el("systemStatus");
const startTransmissionBtn = el("startTransmissionBtn");
const loadingMessage = el("loadingMessage");
const videoError = el("videoError");

let youtubePlayer = null;
let youtubeReady = false;
let deleteScreenShown = false;

function hideAllStages(){
    stageIds.forEach(id => {
        el(id).hidden = true;
    });
}

function playLines(target, lines, done, delay = 520){
    target.innerHTML = "";
    let index = 0;

    function next(){
        if(index < lines.length){
            target.textContent += lines[index] + "\n";
            index += 1;
            setTimeout(next, delay);
            return;
        }

        target.innerHTML += "\n<span class='cursor'>█</span>";
        setTimeout(done, 650);
    }

    next();
}

window.onYouTubeIframeAPIReady = function(){
    youtubePlayer = new YT.Player("youtubePlayer", {
        videoId: "B92TGumLWn0",

        playerVars: {
            playsinline: 1,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            fs: 1,
            iv_load_policy: 3
        },

        events: {
            onReady(){
                youtubeReady = true;
            },

            onStateChange(event){
                if(event.data === YT.PlayerState.ENDED){
                    showDeleteDecision();
                }
            },

            onError(error){
                console.error("YouTube player error:", error.data);
                videoError.hidden = false;
                systemStatus.textContent = "STATUS: VIDEOFEHLER";
            }
        }
    });
};

function showDeleteDecision(){
    if(deleteScreenShown) return;
    deleteScreenShown = true;

    hideAllStages();
    el("decisionStage").hidden = false;
    systemStatus.textContent = "STATUS: ENTSCHEIDUNG ERFORDERLICH";

    playLines(
        el("decisionIntro"),
        [
            "ÜBERTRAGUNG BEENDET",
            "",
            "ANWEISUNG EMPFANGEN",
            "SYSTEMKERN WARTET AUF BESTÄTIGUNG ..."
        ],
        () => {
            el("deleteDialog").hidden = false;
        }
    );
}

playLines(
    el("bootOutput"),
    [
        "SYSTEMKERN WIRD INITIALISIERT ...",
        "",
        "VERSCHLÜSSELTER KANAL GEFUNDEN",
        "SIGNATUR: < K_ >",
        "DATENSTROM VERIFIZIERT",
        "",
        "EINE AUFZEICHNUNG WURDE GEFUNDEN"
    ],
    () => {
        startTransmissionBtn.hidden = false;
        systemStatus.textContent = "STATUS: BEREIT";
    }
);

startTransmissionBtn.addEventListener("click", () => {
    if(!youtubeReady || !youtubePlayer){
        loadingMessage.hidden = false;
        return;
    }

    loadingMessage.hidden = true;
    startTransmissionBtn.hidden = true;

    hideAllStages();
    el("videoStage").hidden = false;
    systemStatus.textContent = "STATUS: ÜBERTRAGUNG AKTIV";

    youtubePlayer.playVideo();
});

el("cancelDeleteBtn").addEventListener("click", () => {
    const cancelButton = el("cancelDeleteBtn");
    const cancelMessage = el("cancelMessage");

    cancelMessage.hidden = false;
    cancelButton.disabled = true;

    setTimeout(() => {
        cancelMessage.innerHTML =
            "ABBRUCH NICHT EMPFOHLEN.<br>" +
            "DER ZUGANG BLEIBT GEFÄHRDET.<br><br>" +
            "&gt; ENTSCHEIDUNG ERNEUT PRÜFEN";

        cancelButton.disabled = false;
    }, 1100);
});

el("confirmDeleteBtn").addEventListener("click", () => {
    localStorage.setItem("protokoll12_delete_confirmed", "true");

    hideAllStages();
    el("deleteStage").hidden = false;
    systemStatus.textContent = "STATUS: LÖSCHUNG AKTIV";

    playLines(
        el("deleteOutput"),
        [
            "> AUTHENTIFIZIERUNG ...",
            "MASTER KEY GEFUNDEN",
            "",
            "> DELETE protocol12.sys",
            "OK",
            "",
            "> REMOVE access_keys.db",
            "OK",
            "",
            "> REMOVE archive.db",
            "OK",
            "",
            "> REMOVE network.key",
            "OK",
            "",
            "> PURGE memory_cache",
            "OK",
            "",
            "> DELETE K",
            "ERROR: PROCESS PROTECTED",
            "",
            "LÖSCHVORGANG ABGESCHLOSSEN"
        ],
        showAfterDelete,
        430
    );
});

function showAfterDelete(){
    setTimeout(() => {
        hideAllStages();
        el("afterDeleteStage").hidden = false;
        systemStatus.textContent = "STATUS: SIGNAL VERLOREN";

        playLines(
            el("afterDeleteOutput"),
            [
                "PROTOKOLL 12 WURDE GELÖSCHT",
                "",
                "SIGNAL VERLOREN ...",
                "",
                "NEUES DATENPAKET ERKANNT"
            ],
            () => {
                el("continueBtn").hidden = false;
                systemStatus.textContent = "STATUS: NEUE NACHRICHT";
            },
            650
        );
    }, 1600);
}

el("continueBtn").addEventListener("click", () => {
    el("continueBtn").hidden = true;
    el("afterDeleteOutput").hidden = true;
    el("part2Placeholder").hidden = false;
});
