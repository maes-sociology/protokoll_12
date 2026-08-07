
const stageIds=["bootStage","videoStage","decisionStage","deleteStage","afterDeleteStage","video2Stage","finalStage"];
const el=id=>document.getElementById(id);
const systemStatus=el("systemStatus");
let youtubePlayer1=null,youtubePlayer2=null,youtubeReady1=false,youtubeReady2=false,deleteScreenShown=false,secondVideoStarted=false;

function hideAllStages(){stageIds.forEach(id=>el(id).hidden=true)}
function playLines(target,lines,done,delay=520){
  target.innerHTML="";let index=0;
  function next(){
    if(index<lines.length){target.textContent+=lines[index++]+"\n";setTimeout(next,delay);return}
    target.innerHTML+="\n<span class='cursor'>█</span>";setTimeout(done,650)
  }
  next()
}

window.onYouTubeIframeAPIReady=function(){
  youtubePlayer1=new YT.Player("youtubePlayer",{videoId:"B92TGumLWn0",playerVars:{playsinline:1,controls:1,rel:0,modestbranding:1,fs:1,iv_load_policy:3},events:{
    onReady(){youtubeReady1=true},
    onStateChange(e){if(e.data===YT.PlayerState.ENDED)showDeleteDecision()},
    onError(e){console.error(e.data);el("videoError").hidden=false;systemStatus.textContent="STATUS: VIDEOFEHLER"}
  }});
  youtubePlayer2=new YT.Player("youtubePlayer2",{videoId:"XqSRAzm5FHU",playerVars:{playsinline:1,controls:0,rel:0,modestbranding:1,fs:1,iv_load_policy:3},events:{
    onReady(){youtubeReady2=true},
    onStateChange(e){if(e.data===YT.PlayerState.ENDED)showFinalMessage()},
    onError(e){console.error(e.data);el("video2Error").hidden=false;systemStatus.textContent="STATUS: VIDEOFEHLER"}
  }});
};

playLines(el("bootOutput"),["SYSTEMKERN WIRD INITIALISIERT ...","","VERSCHLÜSSELTER KANAL GEFUNDEN","SIGNATUR: < K_ >","DATENSTROM VERIFIZIERT","","EINE AUFZEICHNUNG WURDE GEFUNDEN"],()=>{
  el("startTransmissionBtn").hidden=false;systemStatus.textContent="STATUS: BEREIT"
});

el("startTransmissionBtn").addEventListener("click",()=>{
  if(!youtubeReady1){el("loadingMessage").hidden=false;return}
  el("loadingMessage").hidden=true;hideAllStages();el("videoStage").hidden=false;systemStatus.textContent="STATUS: ÜBERTRAGUNG AKTIV";youtubePlayer1.playVideo()
});

function showDeleteDecision(){
  if(deleteScreenShown)return;deleteScreenShown=true;hideAllStages();el("decisionStage").hidden=false;systemStatus.textContent="STATUS: ENTSCHEIDUNG ERFORDERLICH";
  playLines(el("decisionIntro"),["ÜBERTRAGUNG BEENDET","","ANWEISUNG EMPFANGEN","SYSTEMKERN WARTET AUF BESTÄTIGUNG ..."],()=>el("deleteDialog").hidden=false)
}

el("cancelDeleteBtn").addEventListener("click",()=>{
  const b=el("cancelDeleteBtn"),m=el("cancelMessage");m.hidden=false;b.disabled=true;
  setTimeout(()=>{m.innerHTML="ABBRUCH NICHT EMPFOHLEN.<br>DER ZUGANG BLEIBT GEFÄHRDET.<br><br>&gt; ENTSCHEIDUNG ERNEUT PRÜFEN";b.disabled=false},1100)
});

el("confirmDeleteBtn").addEventListener("click",()=>{
  localStorage.setItem("protokoll12_delete_confirmed","true");hideAllStages();el("deleteStage").hidden=false;systemStatus.textContent="STATUS: LÖSCHUNG AKTIV";
  playLines(el("deleteOutput"),["> AUTHENTIFIZIERUNG ...","MASTER KEY GEFUNDEN","","> DELETE protocol12.sys","OK","","> REMOVE access_keys.db","OK","","> REMOVE archive.db","OK","","> REMOVE network.key","OK","","> PURGE memory_cache","OK","","> DELETE K","ERROR: PROCESS PROTECTED","","LÖSCHVORGANG ABGESCHLOSSEN"],showAfterDelete,430)
});

function showAfterDelete(){
  setTimeout(()=>{
    hideAllStages();el("afterDeleteStage").hidden=false;systemStatus.textContent="STATUS: SIGNAL VERLOREN";
    playLines(el("afterDeleteOutput"),["PROTOKOLL 12 WURDE GELÖSCHT","","SIGNAL VERLOREN ...","","NEUES DATENPAKET ERKANNT","","VERBINDUNG WIRD WIEDERHERGESTELLT ..."],startSecondVideo,650)
  },1600)
}

function startSecondVideo(){
  if(secondVideoStarted)return;
  if(!youtubeReady2){setTimeout(startSecondVideo,350);return}
  secondVideoStarted=true;hideAllStages();el("video2Stage").hidden=false;systemStatus.textContent="STATUS: ZWEITE ÜBERTRAGUNG";youtubePlayer2.playVideo()
}

function showFinalMessage(){
  hideAllStages();el("finalStage").hidden=false;systemStatus.textContent="STATUS: LEER";
  setTimeout(()=>{el("finalCursor").style.display="none"},5000)
}
