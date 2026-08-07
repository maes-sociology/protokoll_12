const EXPECTED_FRAGMENTS = [
  "N","G","4","9","9",
  "___","___","___","___","___"
];

const el=id=>document.getElementById(id);
const introStage=el("introStage"),codeStage=el("codeStage"),successStage=el("successStage");
const introOutput=el("introOutput"),successOutput=el("successOutput"),openBtn=el("openBtn"),finaleBtn=el("finaleBtn"),feedback=el("feedback"),form=el("codeForm"),status=el("status");

function normalize(value){
  return String(value||"").trim().toUpperCase().replace(/\s+/g," ").replace(/Ä/g,"AE").replace(/Ö/g,"OE").replace(/Ü/g,"UE").replace(/ß/g,"SS");
}

function playLines(target,lines,done,delay=480){
  target.innerHTML="";let index=0;
  function next(){
    if(index<lines.length){target.textContent+=lines[index++]+"\n";setTimeout(next,delay);return}
    target.innerHTML+="\n<span class='cursor'>█</span>";setTimeout(done,600)
  }
  next()
}

playLines(introOutput,[
  "EXTERNER ZUGANGSPUNKT ERKANNT","",
  "QUELLE: UNBEKANNT",
  "DATENPAKET: PROTOKOLL 12","",
  "REKONSTRUKTION NICHT VOLLSTÄNDIG",
  "ZEHN FRAGMENTE ERFORDERLICH"
],()=>{openBtn.hidden=false;status.textContent="STATUS: EINGABE ERFORDERLICH"});

openBtn.addEventListener("click",()=>{introStage.hidden=true;codeStage.hidden=false;setTimeout(()=>el("code01").focus(),50)});

form.addEventListener("submit",event=>{
  event.preventDefault();
  const inputs=Array.from(form.querySelectorAll("input[data-index]"));
  const values=inputs.map(input=>normalize(input.value));

  if(values.some(v=>v==="")){
    feedback.className="feedback warning";
    feedback.textContent="REKONSTRUKTION UNVOLLSTÄNDIG. ALLE ZEHN FRAGMENTE WERDEN BENÖTIGT.";
    return;
  }

  if(EXPECTED_FRAGMENTS.some(v=>v==="___")){
    feedback.className="feedback warning";
    feedback.textContent="SYSTEMKONFIGURATION NOCH NICHT VOLLSTÄNDIG. FRAGMENTE 06–10 MÜSSEN NOCH FESTGELEGT WERDEN.";
    return;
  }

  const correct=values.every((value,index)=>value===normalize(EXPECTED_FRAGMENTS[index]));

  if(!correct){
    feedback.className="feedback error";
    feedback.innerHTML="REKONSTRUKTION FEHLGESCHLAGEN.<br>MINDESTENS EIN FRAGMENT IST UNGÜLTIG.<br><br>&gt; PRÜFT EURE LÖSUNGEN.";
    return;
  }

  localStorage.setItem("protokoll12_finale_unlocked","true");
  codeStage.hidden=true;successStage.hidden=false;status.textContent="STATUS: REKONSTRUKTION ERFOLGREICH";

  playLines(successOutput,[
    "FRAGMENT 01 ... OK","FRAGMENT 02 ... OK","FRAGMENT 03 ... OK","FRAGMENT 04 ... OK","FRAGMENT 05 ... OK",
    "FRAGMENT 06 ... OK","FRAGMENT 07 ... OK","FRAGMENT 08 ... OK","FRAGMENT 09 ... OK","FRAGMENT 10 ... OK","",
    "REKONSTRUKTION ABGESCHLOSSEN","",
    "ZUGANG ZU PROTOKOLL 12 FREIGEGEBEN"
  ],()=>{finaleBtn.hidden=false},230);
});

finaleBtn.addEventListener("click",()=>{window.location.href="finale.html"});
