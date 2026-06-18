// ========================================================
// RE-ENGINEERED HERO BLOCK & TYPOGRAPHY ENGINE (V9.5 - MOBILE OPTIMIZED COMPACT)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    const heroTitleEl = document.getElementById("dyn-hero-title");
    const heroSubtitleEl = document.getElementById("dyn-hero-subtitle");

    if (!heroTitleEl || !heroSubtitleEl) return;

    // 1. DYNAMICALLY LOAD THE PREMIUM GOOGLE CURSIVE FONT
    if (!document.getElementById("genzest-handwritten-font")) {
        const fontLink = document.createElement("link");
        fontLink.id = "genzest-handwritten-font";
        fontLink.rel = "stylesheet";
        fontLink.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap";
        document.head.appendChild(fontLink);
    }

    // Default Fallbacks (Vibrant SEO-proof texts)
    const fallbackTitle = "We Decode Startup Business Models & Growth Moats";
    const fallbackSubtitle = "Complex startup marketing strategies, unit economics, and hidden growth engines simplified into a high-signal database.";
    
    applyHeroTexts(fallbackTitle, fallbackSubtitle);

    // 2. TIMING DELAY & SAFETY SYNC ENGINE FROM GOOGLE SHEET
    async function syncHeroWithSheet() {
        if (typeof getLiveLayoutConfigs !== "function") {
            setTimeout(syncHeroWithSheet, 200);
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

    // 3. UNIFIED COMPACT NEON & HIGH-READABILITY ENGINE
    function applyHeroTexts(title, subtitle) {
        // Optimized Font Sizes & Spacings
        // Mobile uses text-[2.2rem] (compact) and tighter leading-[1.15] to stop extreme vertical scrolling
        heroTitleEl.className = "text-[2.2rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-normal mb-6 sm:mb-8 font-['Caveat'] leading-[1.15] sm:leading-[1.3] text-center text-[#FAFAFA] block w-full px-2 overflow-visible filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.05)]";
        
        let highlightedText = title;

        // Custom Neon Gradient Block (Bypasses wrapping issues using whitespace-nowrap safely)
        const styleNeonHighlight = (word) => {
            return `<span class="inline-block transform -rotate-1 px-2 sm:px-4 py-0.5 sm:py-1.5 overflow-visible bg-gradient-to-r from-[#FF2E93] via-[#A855F7] to-[#00FFFF] bg-clip-text text-transparent filter drop-shadow-[0_2px_12px_rgba(255,46,147,0.45)] transition-all duration-300 hover:rotate-0 hover:scale-105 whitespace-nowrap">${word}</span>`;
        };

        const keywords = ["Startup", "Business Models", "Growth Moats", "Think Like Builders", "Scale & Win"];

        keywords.forEach(keyword => {
            if (title.toLowerCase().includes(keyword.toLowerCase())) {
                const regex = new RegExp(keyword, "gi");
                highlightedText = highlightedText.replace(regex, styleNeonHighlight(keyword));
            }
        });

        heroTitleEl.innerHTML = highlightedText;

        // COMPACT HIGH-CONTRAST NEON GLASS BOX CONTAINER SETUP
        // Padding optimized (py-3.5 sm:py-5) to save vertical screen space on mobile devices
        heroSubtitleEl.className = "max-w-2xl mx-auto text-xs sm:text-sm md:text-base tracking-wide font-bold leading-relaxed mb-8 sm:mb-12 text-center block px-4 py-3.5 sm:px-6 sm:py-5 rounded-2xl border border-[#A855F7]/30 bg-neutral-950/90 backdrop-blur-xl shadow-[0_0_25px_rgba(168,85,247,0.2)]";
        
        // Forced Override styles to ensure vibrant white text with maximum contrast
        heroSubtitleEl.style.setProperty("color", "#FFFFFF", "important");
        heroSubtitleEl.style.setProperty("opacity", "1", "important");
        heroSubtitleEl.style.setProperty("text-shadow", "0 1.5px 3px rgba(0, 0, 0, 0.9)", "important");
        
        heroSubtitleEl.innerText = subtitle;
    }

    // Initialize layout sync loop
    syncHeroWithSheet();
});