// ========================================================
// GENZEST UNIFIED UI & THEME ENGINE (V3.5 - Navbar & Device Sync Fixed)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {

    // 1. DEVICE THEME AUTO-DETECTION ENGINE
    const savedTheme = localStorage.getItem("genzest-theme");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // An initial theme is set based on device preference if no saved preference exists.
    if (!savedTheme) {
        document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }

    // 2. ULTRADYNAMIC UI ENHANCER STYLE Block (Light/Dark Navbar Protection)
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = `
        /* --- NAV/HEADER FIXED THEME BACKGROUNDS --- */
        header.sticky, #navbar-component header {
            background-color: var(--header-bg) !important;
            border-color: var(--border-base) !important;
            backdrop-filter: blur(12px) !important;
        }
        
        /* Dynamic Brand text color for Light/Dark transitions */
        header a.group span[style*="var(--text-base)"] {
            color: var(--text-base) !important;
        }

        /* --- THEME-PROOF SEARCH BAR SYSTEM --- */
        input[placeholder*="Search"], #search-input {
            border: 2px solid rgba(168, 85, 247, 0.35) !important;
            background-color: var(--bg-base) !important;
            color: var(--text-base) !important;
            font-weight: 600 !important;
            transition: all 0.3s ease !important;
        }

        /* Input Focus Glow (Cyan for Dark, Purple for Light) */
        input[placeholder*="Search"]:focus, #search-input:focus {
            outline: none !important;
            box-shadow: 0 0 25px var(--glow-primary) !important;
        }

        /* --- STUNNING NEON CARD WRAPPERS (Dynamic Colors) --- */
        .sexy-glowing-card {
            border: 2px solid rgba(168, 85, 247, 0.4) !important;
            background-color: var(--card-bg) !important;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
            box-shadow: 0 8px 32px var(--glow-secondary) !important;
        }

        .sexy-glowing-card:hover {
            border-color: var(--highlight-primary) !important;
            transform: translateY(-5px) !important;
            box-shadow: 0 12px 35px var(--glow-primary), 0 0 20px var(--glow-secondary) !important;
        }

        /* --- CONTEXT-AWARE CARD FONT OVERRIDES --- */
        html[data-theme="light"] .vibrant-card-title { color: #0f172a !important; }
        html[data-theme="light"] .vibrant-card-desc { color: #334155 !important; }
        html[data-theme="dark"] .vibrant-card-title { color: #FAFAFA !important; }
        html[data-theme="dark"] .vibrant-card-desc { color: #E2E8F0 !important; }

        /* Dynamic Hero Title Handling (Caveat fix for multi-color words) */
        h1#dyn-hero-title span[style*="gradient"] { display: inline-block !important; }

        /* --- GLOBAL THEME COLOR VARIABLES --- */
        :root {
            --highlight-primary: #00FFFF; /* Cyber Cyan */
            --glow-primary: rgba(0, 255, 255, 0.3);
            --glow-secondary: rgba(168, 85, 247, 0.15);
        }
        
        html[data-theme="light"] {
            --highlight-primary: #FF2E93; /* Neon Pink */
            --glow-primary: rgba(168, 85, 247, 0.2);
            --glow-secondary: rgba(0, 0, 0, 0.05);
        }
    `;
    document.head.appendChild(styleBlock);

    // 3. UI CONTEXT WATCHDOG (Scan for dynamic theme consistency every 250ms)
    function enhanceDOMElements() {
        const isLight = document.documentElement.getAttribute("data-theme") === "light";

        // Active State Injection for Hero Elements
        const heroTitle = document.getElementById("dyn-hero-title");
        if (heroTitle) {
            heroTitle.style.setProperty("opacity", "1", "important");
            // Special color override for the basic "We Decode" part (non-gradient words)
            if (isLight) {
                // Remove hardcoded text-shadow and colors if present
                heroTitle.style.setProperty("color", "#0f172a", "important");
                heroTitle.style.setProperty("text-shadow", "none", "important");
            } else {
                heroTitle.style.setProperty("color", "#FAFAFA", "important");
                heroTitle.style.setProperty("text-shadow", "0 2px 4px rgba(0, 0, 0, 0.8)", "important");
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

        // Apply Styles to Cards as they get loaded by main-cards.js
        const cards = document.querySelectorAll(".sexy-glowing-card");
        cards.forEach(cardContainer => {
            const titleEl = cardContainer.querySelector('h3, h2, div.font-bold');
            if (titleEl) titleEl.className = "vibrant-card-title";

            const descEl = cardContainer.querySelector('p, .text-sm, .text-neutral-400');
            if (descEl && descEl !== titleEl) descEl.className = "vibrant-card-desc";
        });
    }

    // Execute engine scan instantly and continuously to catch lazy-loaded content
    enhanceDOMElements();
    setInterval(enhanceDOMElements, 250);
});