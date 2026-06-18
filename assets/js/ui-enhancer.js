// ========================================================
// GENZEST PREMIUM UI ENHANCER ENGINE (V3.0 - LIGHT/DARK SYSTEM SAFE)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. INJECT ULTRA-DYNAMIC THEME VARIABLE OVERRIDES
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = `
        /* --- GENERAL TYPOGRAPHY SYSTEM UNDER LIGHT THEME --- */
        html[data-theme="light"] #dyn-hero-title {
            color: #0f172a !important; /* Force strong slate black title on white bg */
        }
        html[data-theme="light"] .vibrant-card-title {
            color: #0f172a !important;
        }
        html[data-theme="light"] .vibrant-card-desc {
            color: #334155 !important; /* Dark grey readability description */
        }
        html[data-theme="light"] footer, html[data-theme="light"] #footer-component, html[data-theme="light"] div[class*="footer"] {
            color: #1e293b !important;
        }
        html[data-theme="light"] footer a, html[data-theme="light"] #footer-component a {
            color: #475569 !important;
        }
        html[data-theme="light"] footer a:hover, html[data-theme="light"] #footer-component a:hover {
            color: #A855F7 !important;
        }

        /* --- ULTRA-SEXY SEARCH BAR GLOW SYSTEM --- */
        input[placeholder*="Search"], .search-input, #search-input {
            border: 2px solid rgba(168, 85, 247, 0.35) !important;
            background-color: rgba(10, 5, 22, 0.95) !important;
            color: #FFFFFF !important;
            font-weight: 600 !important;
            font-size: 0.95rem !important;
            border-radius: 1rem !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6) !important;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        html[data-theme="light"] input[placeholder*="Search"] {
            background-color: #ffffff !important;
            color: #0f172a !important;
            border: 2px solid rgba(168, 85, 247, 0.4) !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
        }

        input[placeholder*="Search"]:focus, .search-input:focus, #search-input:focus {
            border-color: #00FFFF !important;
            box-shadow: 0 0 25px rgba(0, 255, 255, 0.35) !important;
            outline: none !important;
        }

        html[data-theme="light"] input[placeholder*="Search"]:focus {
            border-color: #A855F7 !important;
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.2) !important;
        }

        /* Vibrant Placeholder */
        input[placeholder*="Search"]::placeholder {
            color: rgba(255, 255, 255, 0.65) !important;
            font-weight: 500 !important;
        }
        html[data-theme="light"] input[placeholder*="Search"]::placeholder {
            color: rgba(15, 23, 42, 0.5) !important;
        }

        /* --- STUNNING NEON CARD WRAPPERS --- */
        .sexy-glowing-card {
            border: 2px solid rgba(168, 85, 247, 0.4) !important;
            background-color: #0f0a1e !important;
            border-radius: 1.25rem !important;
            box-shadow: 0 8px 32px rgba(168, 85, 247, 0.15) !important;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        html[data-theme="light"] .sexy-glowing-card {
            background-color: #ffffff !important;
            border: 2px solid rgba(168, 85, 247, 0.2) !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05) !important;
        }

        .sexy-glowing-card:hover {
            border-color: #00FFFF !important;
            transform: translateY(-5px) !important;
            box-shadow: 0 12px 35px rgba(168, 85, 247, 0.3), 0 0 20px rgba(0, 255, 255, 0.2) !important;
        }

        html[data-theme="light"] .sexy-glowing-card:hover {
            border-color: #A855F7 !important;
            box-shadow: 0 15px 30px rgba(168, 85, 247, 0.15) !important;
        }

        /* Card Links */
        .vibrant-card-link {
            color: #00FFFF !important;
            font-weight: 700;
            letter-spacing: 0.1em !important;
        }
        html[data-theme="light"] .vibrant-card-link {
            color: #A855F7 !important;
        }
    `;
    document.head.appendChild(styleBlock);

    // 2. DOM ENHANCEMENT ENGINE WITH LIGHT MODE PROTECTION
    function enhanceDOMElements() {
        const isLight = document.documentElement.getAttribute("data-theme") === "light";

        // Fix Main Hero Title Text Visibility
        const heroTitle = document.getElementById("dyn-hero-title");
        if (heroTitle) {
            if (isLight) {
                // If title has plain text nodes (like "We Decode"), keep them slate dark
                heroTitle.style.setProperty("color", "#0f172a", "important");
            } else {
                heroTitle.style.setProperty("color", "#FAFAFA", "important");
            }
        }

        // Apply to search inputs
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput && !searchInput.classList.contains('enhanced-search')) {
            searchInput.classList.add('enhanced-search');
        }

        // Apply styles to Cards
        const cards = document.querySelectorAll(".sexy-glowing-card");
        cards.forEach(cardContainer => {
            const titleEl = cardContainer.querySelector('h3, h2, .text-xl, .text-2xl, div.font-bold');
            if (titleEl) titleEl.className = "vibrant-card-title";

            const descEl = cardContainer.querySelector('p, .text-sm, .text-neutral-400');
            if (descEl && descEl !== titleEl) descEl.className = "vibrant-card-desc";
        });

        // FIX FOOTER/DISCLAIMER SYSTEM TEXT CLIPPING IN LIGHT MODE
        const footerElements = document.querySelectorAll('#footer-component, footer, .text-neutral-400, div[class*="footer"] p, div[class*="footer"] li, div[class*="footer"] a');
        footerElements.forEach(el => {
            if (isLight) {
                if (!el.classList.contains('vibrant-card-link')) {
                    el.style.setProperty("color", "#334155", "important");
                }
            } else {
                if (!el.id && !el.classList.contains('vibrant-card-link') && !el.className.includes('title')) {
                    el.style.setProperty("color", "", ""); // Let dark theme style handle it natively
                }
            }
        });
    }

    // Execute engine scan loops
    enhanceDOMElements();
    setInterval(enhanceDOMElements, 250);
});
