// ========================================================
// GENZEST PREMIUM UI ENHANCER ENGINE (V3.8 - NO-CLASH SYSTEM)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {

    // 1. DEVICE THEME SYSTEM DETECTOR
    const savedTheme = localStorage.getItem("genzest-theme");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (!savedTheme) {
        document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }

    // 2. INJECT ADAPTIVE OVERRIDES Block
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = `
        /* --- DYNAMIC GLOWING CARDS --- */
        .sexy-glowing-card {
            background-color: var(--card-bg) !important;
            border: 2px solid var(--border-color) !important;
            box-shadow: 0 8px 32px var(--glow-primary) !important;
        }

        /* --- FORCED SHARP CONTRAST FOR LIGHT/DARK MODES --- */
        html[data-theme="light"] .vibrant-card-title { color: #0f172a !important; }
        html[data-theme="light"] .vibrant-card-desc { color: #334155 !important; }
        html[data-theme="dark"] .vibrant-card-title { color: #FAFAFA !important; }
        html[data-theme="dark"] .vibrant-card-desc { color: #E2E8F0 !important; }

        /* Force subtitle block text shadow protection */
        html[data-theme="dark"] #dyn-hero-subtitle {
            text-shadow: 0 2px 4px rgba(0,0,0,0.8) !important;
        }
        html[data-theme="light"] #dyn-hero-subtitle {
            text-shadow: none !important;
        }
    `;
    document.head.appendChild(styleBlock);

    // 3. CONTINUOUS RENDERING CHECKER
    function applyDynamicUIFixes() {
        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        const heroTitle = document.getElementById("dyn-hero-title");

        if (heroTitle) {
            heroTitle.style.setProperty("opacity", "1", "important");
            if (isLight) {
                heroTitle.style.setProperty("color", "#0f172a", "important");
                heroTitle.style.setProperty("text-shadow", "none", "important");
            } else {
                heroTitle.style.setProperty("color", "#FAFAFA", "important");
                // Safety block so default non-gradient title gets a clean shadow without breaking dynamic spans
                heroTitle.style.setProperty("text-shadow", "0 2px 6px rgba(0, 0, 0, 0.4)", "important");
            }
        }

        const heroSubtitle = document.getElementById("dyn-hero-subtitle");
        if (heroSubtitle) {
            heroSubtitle.style.setProperty("opacity", "1", "important");
            if (isLight) {
                heroSubtitle.style.setProperty("color", "#1e293b", "important");
            } else {
                heroSubtitle.style.setProperty("color", "#FAFAFA", "important");
            }
        }

        // Apply watch classes dynamically to cards loaded via sheet actions
        const cards = document.querySelectorAll(".sexy-glowing-card");
        cards.forEach(cardContainer => {
            const titleEl = cardContainer.querySelector('h3, h2, div.font-bold');
            if (titleEl) titleEl.className = "vibrant-card-title";

            const descEl = cardContainer.querySelector('p, .text-sm, .text-neutral-400');
            if (descEl && descEl !== titleEl) descEl.className = "vibrant-card-desc";
        });
    }

    // Run active watchdog loop
    applyDynamicUIFixes();
    setInterval(applyDynamicUIFixes, 250);
});