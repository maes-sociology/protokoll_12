window.P12 = {
    playSequence(output, lines, done, delay = 480){
        output.innerHTML = "";
        let index = 0;

        function nextLine(){
            if(index < lines.length){
                output.textContent += lines[index] + "\n";
                index++;
                setTimeout(nextLine, delay);
            }else{
                output.innerHTML += "\n<span class='cursor'>█</span>";
                setTimeout(done, 550);
            }
        }
        nextLine();
    },

    typeHtml(output, html, done, speed = 20){
        output.innerHTML = "";
        let index = 0;
        let buffer = "";
        let insideTag = false;

        function typeNext(){
            if(index >= html.length){
                output.innerHTML = buffer;
                done();
                return;
            }

            const char = html[index];
            buffer += char;

            if(char === "<") insideTag = true;

            if(char === ">"){
                insideTag = false;
                output.innerHTML = buffer;
                index++;
                typeNext();
                return;
            }

            if(!insideTag){
                output.innerHTML = buffer + "<span class='cursor'>█</span>";
            }

            index++;
            setTimeout(typeNext, speed);
        }

        typeNext();
    },

    loadingTransition(lines, destination){
        const body = document.body;
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.background = "#050505";
        overlay.style.color = "#66ffcc";
        overlay.style.fontFamily = 'Consolas,"Courier New",monospace';
        overlay.style.padding = "30px";
        overlay.style.zIndex = "9999";
        overlay.style.whiteSpace = "pre-wrap";
        body.appendChild(overlay);

        let i = 0;
        function step(){
            if(i < lines.length){
                overlay.textContent += lines[i] + "\n";
                i++;
                setTimeout(step, 430);
            }else{
                overlay.innerHTML += "\n<span class='cursor'>█</span>";
                setTimeout(() => location.href = destination, 700);
            }
        }
        step();
    },

    bindTerminalLinks(selector = "[data-terminal-link]"){
        document.querySelectorAll(selector).forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault();
                const destination = link.getAttribute("href");
                const label = link.dataset.file || "DATEI";
                P12.loadingTransition([
                    `${label} WIRD ANGEFORDERT ...`,
                    "PRÜFE ZUGRIFFSRECHTE",
                    "SIGNATUR BESTÄTIGT",
                    "DATEI WIRD GELADEN ..."
                ], destination);
            });
        });
    },

    progressKey(fileId){
        return `protokoll12_${fileId}_solved`;
    },

    fragmentKey(fileId){
        return `protokoll12_${fileId}_fragment`;
    },

    markSolved(fileId, fragment){
        localStorage.setItem(this.progressKey(fileId), "true");
        if(fragment !== undefined && fragment !== null){
            localStorage.setItem(this.fragmentKey(fileId), String(fragment));
        }
    },

    isSolved(fileId){
        return localStorage.getItem(this.progressKey(fileId)) === "true";
    },

    getFragment(fileId){
        return localStorage.getItem(this.fragmentKey(fileId));
    },

    solvedCount(total = 10){
        let count = 0;
        for(let i = 1; i <= total; i++){
            const id = `datei${String(i).padStart(2, "0")}`;
            if(this.isSolved(id)) count++;
        }
        return count;
    },

    getFragments(total = 10){
        const fragments = [];
        for(let i = 1; i <= total; i++){
            const id = `datei${String(i).padStart(2, "0")}`;
            fragments.push(this.getFragment(id));
        }
        return fragments;
    },

    updateArchiveProgress(){
        const total = 10;
        const count = this.solvedCount(total);
        const fragments = this.getFragments(total);
        const countNode = document.getElementById("progressCount");
        const barNode = document.getElementById("progressBar");
        const reconstructionNode = document.getElementById("reconstructionSlots");
        const finaleNode = document.getElementById("finalePanel");

        if(countNode) countNode.textContent = `${count} / ${total}`;
        if(barNode) barNode.textContent = "█".repeat(count) + "░".repeat(total - count);

        document.querySelectorAll("[data-file-id]").forEach(file => {
            const fileId = file.dataset.fileId;
            if(!this.isSolved(fileId)) return;

            file.classList.add("file-solved");

            const status = file.querySelector("[data-status]");
            if(status){
                status.textContent = "ABGESCHLOSSEN";
                status.className = "complete";
            }

            const marker = file.querySelector("[data-marker]");
            if(marker) marker.textContent = "✓";

            const fragmentValue = this.getFragment(fileId);
            const fragmentRow = file.querySelector("[data-fragment-row]");
            const fragmentNode = file.querySelector("[data-fragment]");

            if(fragmentRow && fragmentValue !== null){
                fragmentRow.hidden = false;
            }
            if(fragmentNode && fragmentValue !== null){
                fragmentNode.textContent = `[ ${fragmentValue} ]`;
            }
        });

        if(reconstructionNode){
            reconstructionNode.innerHTML = "";
            fragments.forEach((fragment, index) => {
                const slot = document.createElement("span");
                slot.className = fragment === null
                    ? "reconstruction-slot empty"
                    : "reconstruction-slot filled";
                slot.textContent = fragment === null ? "_" : fragment;
                slot.setAttribute("aria-label", `Fragment ${index + 1}: ${fragment === null ? "fehlt" : fragment}`);
                reconstructionNode.appendChild(slot);
            });
        }

        if(finaleNode){
            finaleNode.hidden = count !== total;
        }
    }
};