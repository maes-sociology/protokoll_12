(function () {
    "use strict";

    const KNOWN_FRAGMENTS = {
        datei01: "N",
        datei03: "4",
        datei04: "9",
        datei05: "9"
    };

    const ARCHIVE_METADATA = {
        datei01: { title: "DATEI 01", category: "ORTSKENNTNIS / VERBINDUNGEN" },
        datei03: { title: "DATEI 03", category: "BEOBACHTUNG / NETZRECHERCHE" },
        datei04: { title: "DATEI 04", category: "RECHERCHE / MUSTERERKENNUNG" },
        datei05: { title: "DATEI 05", category: "ORTSKENNTNIS / SPRACHMUSTER" }
    };

    window.P12 = {
        playSequence(output, lines, done, delay = 480) {
            output.innerHTML = "";
            let index = 0;

            function nextLine() {
                if (index < lines.length) {
                    output.textContent += lines[index] + "\n";
                    index += 1;
                    setTimeout(nextLine, delay);
                    return;
                }
                output.innerHTML += "\n<span class='cursor'>█</span>";
                setTimeout(done, 550);
            }
            nextLine();
        },

        typeHtml(output, html, done = function () {}, speed = 20) {
            output.innerHTML = "";
            let index = 0;
            let buffer = "";
            let insideTag = false;

            function typeNext() {
                if (index >= html.length) {
                    output.innerHTML = buffer;
                    done();
                    return;
                }

                const char = html[index];
                buffer += char;
                if (char === "<") insideTag = true;
                if (char === ">") {
                    insideTag = false;
                    output.innerHTML = buffer;
                    index += 1;
                    typeNext();
                    return;
                }
                if (!insideTag) {
                    output.innerHTML = buffer + "<span class='cursor'>█</span>";
                }
                index += 1;
                setTimeout(typeNext, speed);
            }
            typeNext();
        },

        loadingTransition(lines, destination) {
            const overlay = document.createElement("div");
            Object.assign(overlay.style, {
                position: "fixed",
                inset: "0",
                background: "#050505",
                color: "#66ffcc",
                fontFamily: 'Consolas,"Courier New",monospace',
                padding: "30px",
                zIndex: "9999",
                whiteSpace: "pre-wrap"
            });
            document.body.appendChild(overlay);

            let index = 0;
            function step() {
                if (index < lines.length) {
                    overlay.textContent += lines[index] + "\n";
                    index += 1;
                    setTimeout(step, 430);
                    return;
                }
                overlay.innerHTML += "\n<span class='cursor'>█</span>";
                setTimeout(() => { window.location.href = destination; }, 700);
            }
            step();
        },

        bindTerminalLinks(selector = "[data-terminal-link]") {
            document.querySelectorAll(selector).forEach((link) => {
                if (link.dataset.p12Bound === "true") return;
                link.dataset.p12Bound = "true";
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    const destination = link.getAttribute("href");
                    const label = link.dataset.file || "DATEI";
                    this.loadingTransition([
                        `${label} WIRD ANGEFORDERT ...`,
                        "PRÜFE ZUGRIFFSRECHTE",
                        "SIGNATUR BESTÄTIGT",
                        "DATEI WIRD GELADEN ..."
                    ], destination);
                });
            });
        },

        progressKey(fileId) { return `protokoll12_${fileId}_solved`; },
        fragmentKey(fileId) { return `protokoll12_${fileId}_fragment`; },

        markSolved(fileId, fragment) {
            localStorage.setItem(this.progressKey(fileId), "true");
            if (fragment !== undefined && fragment !== null) {
                localStorage.setItem(this.fragmentKey(fileId), String(fragment));
            }
        },

        isSolved(fileId) {
            return localStorage.getItem(this.progressKey(fileId)) === "true";
        },

        getFragment(fileId) {
            let fragment = localStorage.getItem(this.fragmentKey(fileId));
            if (fragment === null && this.isSolved(fileId) && KNOWN_FRAGMENTS[fileId]) {
                fragment = KNOWN_FRAGMENTS[fileId];
                localStorage.setItem(this.fragmentKey(fileId), fragment);
            }
            return fragment;
        },

        solvedCount(total = 10) {
            let count = 0;
            for (let i = 1; i <= total; i += 1) {
                const id = `datei${String(i).padStart(2, "0")}`;
                if (this.isSolved(id)) count += 1;
            }
            return count;
        },

        getFragments(total = 10) {
            return Array.from({ length: total }, (_, index) => {
                const id = `datei${String(index + 1).padStart(2, "0")}`;
                return this.getFragment(id);
            });
        },

        updateArchiveProgress() {
            const total = 10;
            const count = this.solvedCount(total);
            const fragments = this.getFragments(total);
            const countNode = document.getElementById("progressCount");
            const barNode = document.getElementById("progressBar");
            const reconstructionNode = document.getElementById("reconstructionSlots");
            const finaleNode = document.getElementById("finalePanel");

            if (countNode) countNode.textContent = `${count} / ${total}`;
            if (barNode) barNode.textContent = "█".repeat(count) + "░".repeat(total - count);

            document.querySelectorAll("[data-file-id]").forEach((file) => {
                const fileId = file.dataset.fileId;
                const metadata = ARCHIVE_METADATA[fileId];

                // Offene Missionskarten werden immer aus derselben Vorlage aufgebaut.
                // Dadurch bleiben DATEI 03, 04 und 05 auch nach späteren Änderungen identisch.
                if (metadata) {
                    file.innerHTML = `
                        <div class="file-title">${metadata.title} <span class="file-marker" data-marker></span></div>
                        <div class="file-meta">KATEGORIE: ${metadata.category}</div>
                        <div class="file-meta">STATUS: <span class="open" data-status>OFFEN</span></div>
                        <div class="fragment-row" data-fragment-row hidden>FRAGMENT: <span class="fragment-value" data-fragment></span></div>
                    `;
                }

                file.classList.toggle("file-solved", this.isSolved(fileId));
                const status = file.querySelector("[data-status]");
                const marker = file.querySelector("[data-marker]");
                const row = file.querySelector("[data-fragment-row]");
                const node = file.querySelector("[data-fragment]");

                if (!this.isSolved(fileId)) {
                    if (marker) marker.textContent = "";
                    if (row) row.hidden = true;
                    return;
                }

                if (status) {
                    status.textContent = "ABGESCHLOSSEN";
                    status.className = "complete";
                }
                if (marker) marker.textContent = "✓";

                const value = this.getFragment(fileId);
                if (row && value !== null) row.hidden = false;
                if (node && value !== null) node.textContent = `[ ${value} ]`;
            });

            if (reconstructionNode) {
                reconstructionNode.innerHTML = "";
                fragments.forEach((fragment, index) => {
                    const slot = document.createElement("span");
                    slot.className = fragment === null ? "reconstruction-slot empty" : "reconstruction-slot filled";
                    slot.textContent = fragment === null ? "_" : fragment;
                    slot.setAttribute("aria-label", `Fragment ${index + 1}: ${fragment === null ? "fehlt" : fragment}`);
                    reconstructionNode.appendChild(slot);
                });
            }
            if (finaleNode) finaleNode.hidden = count !== total;
        },

        installAdminReset(trigger) {
            if (!trigger) return;
            let clicks = 0;
            let timer;
            trigger.addEventListener("click", () => {
                clicks += 1;
                clearTimeout(timer);
                timer = setTimeout(() => { clicks = 0; }, 1800);
                if (clicks < 5) return;
                clicks = 0;
                if (!window.confirm("ADMIN: Fortschritt von PROTOKOLL 12 löschen?")) return;
                Object.keys(localStorage)
                    .filter((key) => key.startsWith("protokoll12_"))
                    .forEach((key) => localStorage.removeItem(key));
                window.location.reload();
            });
        }
    };
}());
