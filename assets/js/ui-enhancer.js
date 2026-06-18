document.addEventListener("DOMContentLoaded", function() {

    // 1. SYSTEM DEFAULT THEME DETECTOR
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem("genzest-theme");
    
    // Set default if no manual override exists
    if (!savedTheme) {
        document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }

    // 2. DYNAMIC THEME-PROOF STYLING SYSTEM
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = `
        /* --- DYNAMIC SEARCH BAR --- */
        input[placeholder*="Search"] {
            background-color: var(--bg-base) !important;
            border: 2px solid rgba(168, 85, 247, 0.4) !important;
            color: var(--text-base) !important;
        }
        
        /* --- DYNAMIC GLOWING CARDS --- */
        .sexy-glowing-card {
            background-color: var(--bg-base) !important;
            border: 2px solid rgba(168, 85, 247, 0.2) !important;
        }
        
        /* --- NEWSLETTER CARD --- */
        section .relative {
            background: var(--bg-base) !important;
            border: 1px solid rgba(168, 85, 247, 0.2) !important;
        }

        /* --- SUBTITLE BOX --- */
        #dyn-hero-subtitle {
            background-color: var(--bg-base) !important;
            border: 1px solid rgba(168, 85, 247, 0.2) !important;
            color: var(--text-base) !important;
        }

        /* --- FORCED DARK/LIGHT CONTEXT OVERRIDES --- */
        html[data-theme="light"] .vibrant-card-title { color: #0f172a !important; }
        html[data-theme="light"] .vibrant-card-desc { color: #334155 !important; }
        html[data-theme="dark"] .vibrant-card-title { color: #ffffff !important; }
        html[data-theme="dark"] .vibrant-card-desc { color: #e2e8f0 !important; }
    `;
    document.head.appendChild(styleBlock);

    // 3. UI WATCHDOG (Syncing all elements dynamically)
    function applyThemeFixes() {
        // Force search bar contrast
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) {
            searchInput.style.setProperty("color", "var(--text-base)", "important");
        }
    }

    applyThemeFixes();
    setInterval(applyThemeFixes, 500);
});
