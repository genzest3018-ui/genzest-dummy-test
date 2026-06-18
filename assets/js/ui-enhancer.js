// ========================================================
// GENZEST PREMIUM UI ENHANCER ENGINE (V4.1 - NO GHOST TEXT BUG)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {

    // 1. DEVICE THEME SYSTEM DETECTOR
    const savedTheme = localStorage.getItem("genzest-theme");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (!savedTheme) {
        document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }

    // 2. ADAPTIVE OVERRIDES AND EMERALD SAFEGUARDS
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

        /* Force subtitle and company detail paragraph text visibility based on active theme status */
        html[data-theme="light"] #dyn-hero-subtitle,
        html[data-theme="light"] #comp-revenue p,
        html[data-theme="light"] #comp-moat p,
        html[data-theme="light"] #comp-marketing p,
        html[data-theme="light"] #comp-takeaway p,
        html[data-theme="light"] .space-y-3 p,
        html[data-theme="light"] .space-y-3 span {
            color: #1e293b !important; /* Premium readable dark slate on white bg */
            text-shadow: none !important;
            opacity: 1 !important;
        }

        html[data-theme="dark"] #dyn-hero-subtitle,
        html[data-theme="dark"] #comp-revenue p,
        html[data-theme="dark"] #comp-moat p,
        html[data-theme="dark"] #comp-marketing p,
        html[data-theme="dark"] #comp-takeaway p,
        html[data-theme="dark"] .space-y-3 p,
        html[data-theme="dark"] .space-y-3 span {
            color: #E2E8F0 !important; /* Soft premium white on dark bg */
            opacity: 1 !important;
        }

        /* Hero Subtitle shadows */
        html[data-theme="dark"] #dyn-hero-subtitle {
            text-shadow: 0 2px 4px rgba(0,0,0,0.8) !important;
        }

        /* --- GENERAL FOOTER LINKS LIGHT SYSTEM --- */
        html[data-theme="light"] .vibrant-card-link {
            color: #A855F7 !important;
        }
        html[data-theme="light"] footer a, html[data-theme="light"] #footer-component a {
            color: #475569 !important;
        }
        html[data-theme="light"] footer a:hover, 
        html[data-theme="light"] #footer-component a:hover {
            color: #A855F7 !important;
        }

        /* --- CRITICAL GMAIL INVISIBILITY FIXED --- */
        .footer-email-link {
            color: #00FFFF !important; /* Cyan pop on Dark theme */
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.4) !important;
            font-weight: 700 !important;
            transition: all 0.3s ease !important;
        }

        html[data-theme="light"] .footer-email-link {
            color: #7C3AED !important; /* Sexy Sleek Purple on Light theme (Maximum contrast!) */
            text-shadow: none !important;
            font-weight: 800 !important;
        }
        .footer-email-link:hover {
            color: #FF2E93 !important;
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