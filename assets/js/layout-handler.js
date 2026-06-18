// ========================================================
// RE-ENGINEERED HERO BLOCK & TYPOGRAPHY ENGINE (V6.6 - ULTRA-ROBUST SEO)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    const heroTitleEl = document.getElementById("dyn-hero-title");
    const heroSubtitleEl = document.getElementById("dyn-hero-subtitle");

    if (!heroTitleEl || !heroSubtitleEl) return;

    // 1. Premium SEO Fallback (Instantly visible on load)
    const fallbackTitle = "We Decode Startup Business Models & Growth Moats";
    const fallbackSubtitle = "Complex startup marketing strategies, unit economics, and hidden growth engines simplified into a high-signal database.";
    
    applyHeroTexts(fallbackTitle, fallbackSubtitle);

    // 2. TIMING DELAY & SAFETY OVERRIDE ENGINE
    async function syncHeroWithSheet() {
        if (typeof getLiveLayoutConfigs !== "function") {
            setTimeout(syncHeroWithSheet, 250);
            return;
        }

        try {
            const layoutConfigs = await getLiveLayoutConfigs();
            
            if (layoutConfigs && layoutConfigs.length > 0) {
                const titleConfig = layoutConfigs.find(c => c.key === "hero_title" || c.key === "hero-title");
                const subtitleConfig = layoutConfigs.find(c => c.key === "hero_subtitle" || c.key === "hero-subtitle");
                
                let targetTitle = fallbackTitle;
                let targetSubtitle = fallbackSubtitle;

                if (titleConfig && titleConfig.value && titleConfig.value.trim() !== "") {
                    // Line breaks aur double spaces ko cleanly single-line space mein convert karega
                    targetTitle = titleConfig.value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
                }
                if (subtitleConfig && subtitleConfig.value && subtitleConfig.value.trim() !== "") {
                    targetSubtitle = subtitleConfig.value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
                }

                applyHeroTexts(targetTitle, targetSubtitle);
            }
        } catch (error) {
            console.warn("Hero dynamic sync bypassed, safe backup running.");
        }
    }

    // 3. ZERO-BREAKAGE HIGH-CONTRAST RENDER ENGINE
    function applyHeroTexts(title, subtitle) {
        // Safe standard CSS layout wrapper to prevent clipping on mobile
        heroTitleEl.className = "text-4xl sm:text-7xl font-black tracking-tight mb-6 font-['Space_Grotesk'] leading-[1.2] text-center text-white block w-full px-2";
        
        // Exact premium SEO keywords to automatically highlight with gradients
        const highlightRegex = /(Business Models|Growth Moats|Scale & Win|Startups Scale|Growth Strategies|Startups Win|Wins)/gi;
        
        let highlightedText = title;
        
        if (highlightRegex.test(title)) {
            // Match milne par gradient apply karega safely
            highlightedText = title.replace(
                highlightRegex, 
                `<span class="bg-gradient-to-r from-[#9333EA] via-[#EC4899] to-[#22C55E] bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(236,72,153,0.15)] inline-block">$1</span>`
            );
        } else {
            // Fallback: Agar koi keyword match nahi hua, toh aakhri 2 words ko safe highlight dega
            const words = title.split(" ");
            if (words.length > 2) {
                const lastTwo = words.slice(-2).join(" ");
                const remaining = words.slice(0, -2).join(" ");
                highlightedText = `${remaining} <span class="bg-gradient-to-r from-[#9333EA] via-[#EC4899] to-[#22C55E] bg-clip-text text-transparent inline-block">${lastTwo}</span>`;
            }
        }
        
        heroTitleEl.innerHTML = highlightedText;

        // Subtitle rendering with clean contrast
        heroSubtitleEl.className = "max-w-3xl mx-auto text-sm sm:text-base tracking-wide font-normal leading-relaxed mb-10 text-neutral-200/90 text-center block px-4";
        heroSubtitleEl.innerText = subtitle;
    }

    syncHeroWithSheet();
});