// ========================================================
// GENZEST PREMIUM UI ENHANCER ENGINE (V1.0 - NEON CONTEXT OVERRIDE)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. DYNAMIC CYBERPUNK CSS INJECTION (Overrides dull classes without breaking layout)
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = `
        /* --- ULTRA-SEXY SEARCH BAR GLOW SYSTEM --- */
        input[placeholder*="Search"], .search-input, #search-input {
            border: 2px solid rgba(168, 85, 247, 0.3) !important;
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
            box-shadow: 0 0 25px rgba(0, 255, 255, 0.25) !important;
            background-color: rgba(15, 8, 32, 0.98) !important;
            outline: none !important;
        }

        /* Vibrant Placeholder */
        input[placeholder*="Search"]::placeholder {
            color: rgba(255, 255, 255, 0.6) !important;
            font-weight: 500 !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
        }

        /* --- STUNNING NEON CARD WRAPPERS --- */
        .sexy-glowing-card {
            border: 1.5px solid rgba(168, 85, 247, 0.25) !important;
            background-color: rgba(15, 10, 30, 0.85) !important;
            backdrop-filter: blur(16px) !important;
            border-radius: 1.25rem !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
            overflow: hidden !important;
        }

        .sexy-glowing-card:hover {
            border-color: #00FFFF !important;
            transform: translateY(-5px) !important;
            box-shadow: 0 15px 40px rgba(168, 85, 247, 0.25), 0 0 15px rgba(0, 255, 255, 0.1) !important;
        }

        /* Card Text High Contrast Overrides */
        .vibrant-card-title {
            color: #FFFFFF !important;
            font-weight: 900 !important;
            font-size: 1.5rem !important;
            letter-spacing: -0.025em !important;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8) !important;
            margin-bottom: 0.5rem !important;
        }

        .vibrant-card-desc {
            color: rgba(255, 255, 255, 0.95) !important;
            font-weight: 500 !important;
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
            text-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.7) !important;
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
            text-shadow: 0 0 8px rgba(255, 46, 147, 0.5) !important;
        }
    `;
    document.head.appendChild(styleBlock);

    // 2. DOM WATCHDOG (Scan & Force Premium Classes on Dynamically Loaded Cards)
    function enhanceDOMElements() {
        // Target search input
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput && !searchInput.classList.contains('enhanced-search')) {
            searchInput.classList.add('enhanced-search');
            // Force extra inline styles to prevent styling loss
            searchInput.style.setProperty("color", "#FFFFFF", "important");
        }

        // Target Playbook Cards dynamically
        const cardLinks = document.querySelectorAll('span, p, a, div');
        cardLinks.forEach(el => {
            if (el.textContent && el.textContent.includes("READ FULL PLAYBOOK")) {
                // Ascend to find the parent Card Container
                const cardContainer = el.closest('div.relative.rounded-2xl, div.rounded-xl, div.bg-card');
                if (cardContainer && !cardContainer.classList.contains('sexy-glowing-card')) {
                    cardContainer.classList.add('sexy-glowing-card');

                    // Style Title (e.g., "hi")
                    const titleEl = cardContainer.querySelector('h3, h2, .text-xl, .text-2xl, div.font-bold');
                    if (titleEl) {
                        titleEl.className = "vibrant-card-title";
                    }

                    // Style Description / Hook (e.g., "Jai ho")
                    const descEl = cardContainer.querySelector('p, .text-sm, .text-neutral-400');
                    if (descEl && descEl !== titleEl && !descEl.textContent.includes("READ FULL PLAYBOOK")) {
                        descEl.className = "vibrant-card-desc";
                    }

                    // Style Footer Text ("READ FULL PLAYBOOK")
                    const linkEl = el;
                    if (linkEl) {
                        linkEl.className = "vibrant-card-link text-[11px] font-mono tracking-widest uppercase";
                    }
                }
            }
        });
    }

    // Run dynamic enhancement instantly and hook into continuous scroll/sync renders
    enhanceDOMElements();
    setInterval(enhanceDOMElements, 250); // Checks every 250ms for newly loaded sheet data cards
});