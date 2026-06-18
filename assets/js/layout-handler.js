// ========================================================
// RE-ENGINEERED HERO BLOCK & TYPOGRAPHY ENGINE (V6.3 - UNDERSCORE & SYNC FIX)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    const heroTitleEl = document.getElementById("dyn-hero-title");
    const heroSubtitleEl = document.getElementById("dyn-hero-subtitle");

    if (!heroTitleEl || !heroSubtitleEl) return;

    // 1. Initial Instant Display (Zero network delay fallback)
    const fallbackTitle = "We Decode How Startups Win";
    const fallbackSubtitle = "Complex startup business models aur unki hidden marketing strategies ka sabse simplified aur high-signal database.";
    
    applyHeroTexts(fallbackTitle, fallbackSubtitle);

    // 2. TIMING DELAY & KEY COMPATIBILITY SYNC ENGINE
    async function syncHeroWithSheet() {
        // Agar function load nahi hua, toh wait karega aur 300ms baad check karega
        if (typeof getLiveLayoutConfigs !== "function") {
            setTimeout(syncHeroWithSheet, 300);
            return;
        }

        try {
            const layoutConfigs = await getLiveLayoutConfigs();
            
            if (layoutConfigs && layoutConfigs.length > 0) {
                // Compatible with both underscore (hero_title) and hyphen (hero-title)
                const titleConfig = layoutConfigs.find(c => c.key === "hero_title" || c.key === "hero-title");
                const subtitleConfig = layoutConfigs.find(c => c.key === "hero_subtitle" || c.key === "hero-subtitle");
                
                let targetTitle = fallbackTitle;
                let targetSubtitle = fallbackSubtitle;

                if (titleConfig && titleConfig.value) targetTitle = titleConfig.value;
                if (subtitleConfig && subtitleConfig.value) targetSubtitle = subtitleConfig.value;

                // Apply sheet data instantly
                applyHeroTexts(targetTitle, targetSubtitle);
            }
        } catch (error) {
            console.warn("Hero dynamic sync bypassed, safe backup running.");
        }
    }

    // Helper formatting function to highlight specific words beautifully
    function applyHeroTexts(title, subtitle) {
        // Standard bold styles with high-contrast text color
        heroTitleEl.className = "text-4xl sm:text-7xl font-black tracking-tight mb-6 font-['Space_Grotesk'] leading-[1.1] text-center text-white";
        
        // Highlight logic with gradient overrides
        const highlightedText = title.replace(
            /(Startups Win|Wins|How Startups Win|acha lode)/gi, 
            `<span class="bg-gradient-to-r from-[#9333EA] via-[#EC4899] to-[#22C55E] bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(236,72,153,0.15)]">$1</span>`
        );
        
        heroTitleEl.innerHTML = highlightedText;

        // Bright subtitle to pop flawlessly on dark background
        heroSubtitleEl.className = "max-w-2xl mx-auto text-sm sm:text-base tracking-wide font-normal leading-relaxed mb-10 text-neutral-200/90 text-center";
        heroSubtitleEl.innerText = subtitle;
    }

    // Start the layout handler
    syncHeroWithSheet();
});