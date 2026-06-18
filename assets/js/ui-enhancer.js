// ========================================================
// GENZEST PREMIUM UI ENHANCER ENGINE (V2.0 - DYNAMIC SCROLLER COMPATIBLE)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. ADVANCED STYLING OVERWRITES INJECTOR
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = `
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

        input[placeholder*="Search"]:focus, .search-input:focus, #search-input:focus {
            border-color: #00FFFF !important;
            box-shadow: 0 0 25px rgba(0, 255, 255, 0.35) !important;
            background-color: rgba(15, 8, 32, 0.98) !important;
            outline: none !important;
        }

        /* Vibrant Placeholder */
        input[placeholder*="Search"]::placeholder {
            color: rgba(255, 255, 255, 0.65) !important;
            font-weight: 500 !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
        }

        /* --- STUNNING NEON CARD WRAPPERS --- */
        .sexy-glowing-card {
            border: 2px solid rgba(168, 85, 247, 0.4) !important; /* Thick prominent neon border */
            background-color: #0f0a1e !important; /* Premium pitch black solid canvas background */
            border-radius: 1.25rem !important;
            box-shadow: 0 8px 32px rgba(168, 85, 247, 0.15) !important;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .sexy-glowing-card:hover {
            border-color: #00FFFF !important; /* Cyberpunk cyan border on hover */
            transform: translateY(-5px) !important;
            box-shadow: 0 12px 35px rgba(168, 85, 247, 0.3), 0 0 20px rgba(0, 255, 255, 0.2) !important;
        }

        /* Card Text High Contrast Overrides */
        .vibrant-card-title {
            color: #FFFFFF !important;
            font-weight: 900 !important;
            font-size: 1.6rem !important;
            letter-spacing: -0.025em !important;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9) !important;
            margin-bottom: 0.5rem !important;
        }

        .vibrant-card-desc {
            color: #E2E8F0 !important; /* Highly vibrant prominent white/slate color */
            font-weight: 500 !important;
            font-size: 0.9rem !important;
            line-height: 1.55 !important;
            opacity: 1 !important;
            text-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.8) !important;
        }

        /* Interactive Footer Link */
        .vibrant-card-link {
            color: #00FFFF !important;
            font-weight: 700 !important;
            letter-spacing: 0.1em !important;
            transition: all 0.3s ease !important;
        }

        .sexy-glowing-card:hover .vibrant-card-link {
            color: #FF2E93 !important;
            text-shadow: 0 0 8px rgba(255, 46, 147, 0.6) !important;
        }
    `;
    document.head.appendChild(styleBlock);

    // 2. DOM WATCHDOG (Continuous rendering safe sweeps)
    function enhanceDOMElements() {
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput && !searchInput.classList.contains('enhanced-search')) {
            searchInput.classList.add('enhanced-search');
            searchInput.style.setProperty("color", "#FFFFFF", "important");
        }

        const cards = document.querySelectorAll(".sexy-glowing-card");
        cards.forEach(cardContainer => {
            // Style Title inside container
            const titleEl = cardContainer.querySelector('h3, h2, .text-xl, .text-2xl, div.font-bold');
            if (titleEl && !titleEl.classList.contains('vibrant-card-title')) {
                titleEl.className = "vibrant-card-title";
            }

            // Style Description inside container
            const descEl = cardContainer.querySelector('p, .text-sm, .text-neutral-400');
            if (descEl && descEl !== titleEl && !descEl.classList.contains('vibrant-card-desc')) {
                descEl.className = "vibrant-card-desc";
            }
        });
    }

    // Export globally for fast inline calls
    window.enhanceDOMElements = enhanceDOMElements;

    enhanceDOMElements();
    setInterval(enhanceDOMElements, 250);
});