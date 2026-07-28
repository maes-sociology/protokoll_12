(function(){
    "use strict";

    const config = window.P12_MISSION;
    if(!config) throw new Error("P12_MISSION configuration is missing.");

    const nodes = {
        terminal: document.querySelector(".terminal"),
        output: document.getElementById("output"),
        openBtn: document.getElementById("openBtn"),
        answerPanel: document.getElementById("answerPanel"),
        answer: document.getElementById("answer"),
        answerLabel: document.getElementById("answerLabel"),
        answerHint: document.getElementById("answerHint"),
        checkBtn: document.getElementById("checkBtn"),
        feedback: document.getElementById("feedback"),
        backRow: document.querySelector(".back-row")
    };

    let stageIndex = 0;

    function currentStage(){
        return config.stages[stageIndex];
    }

    function normalize(value, stage){
        let result = value.trim().toLowerCase();
        if(stage.normalizeUmlauts){
            result = result
                .replace(/ä/g, "ae")
                .replace(/ö/g, "oe")
                .replace(/ü/g, "ue")
                .replace(/ß/g, "ss");
        }
        if(stage.removeWhitespace !== false){
            result = result.replace(/\s+/g, "");
        }
        return result;
    }

    function resetFeedback(){
        nodes.feedback.className = "feedback";
        nodes.feedback.innerHTML = "";
    }

    function prepareStage(index){
        stageIndex = index;
        const stage = currentStage();

        nodes.answerLabel.innerHTML = `<b>${stage.label}</b>`;
        nodes.answerHint.textContent = stage.hint;
        nodes.answer.type = stage.inputType || "text";
        nodes.answer.inputMode = stage.inputMode || "text";
        nodes.answer.maxLength = stage.maxLength || 32;
        nodes.answer.placeholder = stage.placeholder || "Antwort";
        nodes.answer.value = "";
        nodes.answer.disabled = false;
        nodes.checkBtn.disabled = false;
        resetFeedback();
    }

    function showPuzzleImmediately(){
        prepareStage(0);
        nodes.output.innerHTML = config.message;
        nodes.answerPanel.style.display = "block";
        nodes.openBtn.style.display = "none";
        nodes.answer.focus();
    }

    function showSolvedNote(){
        const fragment = P12.getFragment(config.fileId) || config.fragment;
        const note = document.createElement("div");
        note.className = "fragment layer";
        note.innerHTML = `STATUS: BEREITS ABGESCHLOSSEN – ERNEUTE ANALYSE MÖGLICH<strong>${fragment}</strong>`;
        nodes.terminal.insertBefore(note, nodes.backRow);
    }

    function completeMission(){
        P12.markSolved(config.fileId, config.fragment);
        nodes.answer.disabled = true;
        nodes.checkBtn.disabled = true;
        nodes.feedback.className = "feedback success";
        nodes.feedback.innerHTML = config.successHtml;
    }

    function advanceStage(){
        const nextIndex = stageIndex + 1;
        const transition = currentStage().transition;

        prepareStage(nextIndex);
        nodes.feedback.className = "feedback success";

        if(transition){
            P12.typeHtml(nodes.feedback, transition, () => nodes.answer.focus(), 18);
        }else{
            nodes.answer.focus();
        }
    }

    function checkAnswer(){
        const stage = currentStage();
        const value = normalize(nodes.answer.value, stage);
        const accepted = stage.answers.map(answer => normalize(String(answer), stage));

        if(value === ""){
            nodes.feedback.className = "feedback error";
            nodes.feedback.textContent = "KEINE EINGABE ERKANNT.";
            return;
        }

        if(!accepted.includes(value)){
            nodes.feedback.className = "feedback error";
            nodes.feedback.textContent = stage.error;
            nodes.answer.select();
            return;
        }

        if(stageIndex < config.stages.length - 1){
            advanceStage();
        }else{
            completeMission();
        }
    }

    nodes.openBtn.addEventListener("click", () => {
        nodes.openBtn.style.display = "none";
        P12.playSequence(nodes.output, config.decryptLines, () => {
            P12.typeHtml(nodes.output, config.message, () => {
                prepareStage(0);
                nodes.answerPanel.style.display = "block";
                nodes.answer.focus();
            });
        });
    });

    nodes.checkBtn.addEventListener("click", checkAnswer);
    nodes.answer.addEventListener("keydown", event => {
        if(event.key === "Enter") checkAnswer();
    });

    P12.bindTerminalLinks();

    if(P12.isSolved(config.fileId)){
        showSolvedNote();
        showPuzzleImmediately();
    }else{
        P12.playSequence(nodes.output, config.bootLines, () => {
            nodes.openBtn.textContent = "> DATEI ENTSCHLÜSSELN";
            nodes.openBtn.style.display = "inline-block";
        });
    }
})();
