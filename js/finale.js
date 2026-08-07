const VIDEO_1_ID = "vS7MWTPu1gw";
const VIDEO_2_ID = "BfsF_5ogz8c";

const stageIds = [
  "bootStage",
  "video1Stage",
  "decisionStage",
  "deleteStage",
  "reconnectStage",
  "video2Stage",
  "finalStage"
];

const el = id => document.getElementById(id);
const systemStatus = el("systemStatus");

let player1 = null;
let player2 = null;
let player1Ready = false;
let player2Ready = false;
let deleteScreenShown = false;
let secondVideoStarted = false;

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
  player1 = new YT.Player("youtubePlayer1", {
    videoId: VIDEO_1_ID,
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
        player1Ready = true;
      },
      onStateChange(event){
        if(event.data === YT.PlayerState.ENDED){
          showDeleteDecision();
        }
      },
      onError(error){
        console.error("Video 1 error:", error.data);
        el("video1Error").hidden = false;
        systemStatus.textContent = "STATUS: VIDEOFEHLER";
      }
    }
  });

  player2 = new YT.Player("youtubePlayer2", {
    videoId: VIDEO_2_ID,
    playerVars: {
      playsinline: 1,
      controls: 0,
      rel: 0,
      modestbranding: 1,
      fs: 1,
      iv_load_policy: 3
    },
    events: {
      onReady(){
        player2Ready = true;
      },
      onStateChange(event){
        if(event.data === YT.PlayerState.ENDED){
          showFinalMessage();
        }
      },
      onError(error){
        console.error("Video 2 error:", error.data);
        el("video2Error").hidden = false;
        systemStatus.textContent = "STATUS: VIDEOFEHLER";
      }
    }
  });
};

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
    el("startTransmissionBtn").hidden = false;
    systemStatus.textContent = "STATUS: BEREIT";
  }
);

el("startTransmissionBtn").addEventListener("click", () => {
  if(!player1Ready || !player1){
    el("loadingMessage").hidden = false;
    return;
  }

  el("loadingMessage").hidden = true;
  hideAllStages();
  el("video1Stage").hidden = false;
  systemStatus.textContent = "STATUS: ÜBERTRAGUNG AKTIV";

  player1.playVideo();
});

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

el("cancelDeleteBtn").addEventListener("click", () => {
  const button = el("cancelDeleteBtn");
  const message = el("cancelMessage");

  message.hidden = false;
  button.disabled = true;

  setTimeout(() => {
    message.innerHTML =
      "ABBRUCH NICHT EMPFOHLEN.<br>" +
      "DER ZUGANG BLEIBT GEFÄHRDET.<br><br>" +
      "&gt; ENTSCHEIDUNG ERNEUT PRÜFEN";

    button.disabled = false;
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
    showReconnect,
    430
  );
});

function showReconnect(){
  setTimeout(() => {
    hideAllStages();
    el("reconnectStage").hidden = false;
    systemStatus.textContent = "STATUS: SIGNAL VERLOREN";

    playLines(
      el("reconnectOutput"),
      [
        "PROTOKOLL 12 WURDE GELÖSCHT",
        "",
        "SIGNAL VERLOREN ...",
        "",
        "NEUES DATENPAKET ERKANNT",
        "",
        "VERBINDUNG WIRD WIEDERHERGESTELLT ..."
      ],
      startSecondVideo,
      650
    );
  }, 1600);
}

function startSecondVideo(){
  if(secondVideoStarted) return;

  if(!player2Ready || !player2){
    setTimeout(startSecondVideo, 350);
    return;
  }

  secondVideoStarted = true;

  hideAllStages();
  el("video2Stage").hidden = false;
  systemStatus.textContent = "STATUS: ZWEITE ÜBERTRAGUNG";

  player2.playVideo();
}

function showFinalMessage(){
  hideAllStages();
  el("finalStage").hidden = false;
  systemStatus.textContent = "STATUS: LEER";

  setTimeout(() => {
    el("finalCursor").style.display = "none";
  }, 5000);
}
