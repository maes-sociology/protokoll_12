const ids=["bootStage","videoStage","decisionStage","deleteStage","afterDeleteStage"];
const el=id=>document.getElementById(id);
const systemStatus=el("systemStatus");

function hideAll(){ids.forEach(id=>el(id).hidden=true)}
function playLines(target,lines,done,delay=520){
  target.innerHTML="";let i=0;
  const next=()=>{if(i<lines.length){target.textContent+=lines[i++]+"\n";setTimeout(next,delay)}
  else{target.innerHTML+="\n<span class='cursor'>█</span>";setTimeout(done,650)}};
  next();
}

playLines(el("bootOutput"),[
"SYSTEMKERN WIRD INITIALISIERT ...","","VERSCHLÜSSELTER KANAL GEFUNDEN","SIGNATUR: < K_ >","DATENSTROM VERIFIZIERT","","EINE AUFZEICHNUNG WURDE GEFUNDEN"
],()=>{el("startTransmissionBtn").hidden=false;systemStatus.textContent="STATUS: BEREIT"});

el("startTransmissionBtn").addEventListener("click",async()=>{
  el("startTransmissionBtn").hidden=true;hideAll();el("videoStage").hidden=false;systemStatus.textContent="STATUS: ÜBERTRAGUNG AKTIV";
  try{el("finaleVideo").currentTime=0;await el("finaleVideo").play()}
  catch(err){console.error(err);el("videoError").hidden=false;systemStatus.textContent="STATUS: VIDEOFEHLER"}
});

el("finaleVideo").addEventListener("ended",()=>{
  hideAll();el("decisionStage").hidden=false;systemStatus.textContent="STATUS: ENTSCHEIDUNG ERFORDERLICH";
  playLines(el("decisionIntro"),["ÜBERTRAGUNG BEENDET","","ANWEISUNG EMPFANGEN","SYSTEMKERN WARTET AUF BESTÄTIGUNG ..."],()=>el("deleteDialog").hidden=false);
});

el("cancelDeleteBtn").addEventListener("click",()=>{
  el("cancelMessage").hidden=false;el("cancelDeleteBtn").disabled=true;
  setTimeout(()=>{el("cancelMessage").innerHTML="ABBRUCH NICHT EMPFOHLEN.<br>DER ZUGANG BLEIBT GEFÄHRDET.<br><br>&gt; ENTSCHEIDUNG ERNEUT PRÜFEN";el("cancelDeleteBtn").disabled=false},1100);
});

el("confirmDeleteBtn").addEventListener("click",()=>{
  localStorage.setItem("protokoll12_delete_confirmed","true");
  hideAll();el("deleteStage").hidden=false;systemStatus.textContent="STATUS: LÖSCHUNG AKTIV";
  playLines(el("deleteOutput"),[
  "> AUTHENTIFIZIERUNG ...","MASTER KEY GEFUNDEN","",
  "> DELETE protocol12.sys","OK","",
  "> REMOVE access_keys.db","OK","",
  "> REMOVE archive.db","OK","",
  "> REMOVE network.key","OK","",
  "> PURGE memory_cache","OK","",
  "> DELETE K","ERROR: PROCESS PROTECTED","",
  "LÖSCHVORGANG ABGESCHLOSSEN"
  ],showAfterDelete,430);
});

function showAfterDelete(){
  setTimeout(()=>{
    hideAll();el("afterDeleteStage").hidden=false;systemStatus.textContent="STATUS: SIGNAL VERLOREN";
    playLines(el("afterDeleteOutput"),["PROTOKOLL 12 WURDE GELÖSCHT","","SIGNAL VERLOREN ...","","NEUES DATENPAKET ERKANNT"],()=>{
      el("continueBtn").hidden=false;systemStatus.textContent="STATUS: NEUE NACHRICHT"
    },650);
  },1600);
}

el("continueBtn").addEventListener("click",()=>{
  el("continueBtn").hidden=true;el("afterDeleteOutput").hidden=true;el("part2Placeholder").hidden=false;
});
