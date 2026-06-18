// ========================================================
// RE-ENGINEERED HERO BLOCK & TYPOGRAPHY ENGINE (V6.5 - NO-SPLIT SAFE ENGINE)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    const heroTitleEl = document.getElementById("dyn-hero-title");
    const heroSubtitleEl = document.getElementById("dyn-hero-subtitle");

    if (!heroTitleEl || !heroSubtitleEl) return;

    // 1. Initial Hardcoded Instant Display (Fallback)
    const fallbackTitle = "Understand Businesses. Think Like Builders.";
    const fallbackSubtitle = "Visual breakdowns of business models, marketing strategies, growth engines and competitive moats of successful companies.";
    
    applyHeroTexts(fallbackTitle, fallbackSubtitle);

    // 2. TIMING DELAY & SAFE WORD-COUNT SYNC ENGINE
    async function syncHeroWithSheet() {
        if (typeof getLiveLayoutConfigs !== "function") {
            setTimeout(syncHeroWithSheet, 300);
            return;
        }

        try {
            const layoutConfigs = await getLiveLayoutConfigs();
            
            if (layoutConfigs && layoutConfigs.length > 0) {
                const titleConfig = layoutConfigs.find(c => c.key === "hero_title" || c.key === "hero-title");
                const subtitleConfig = layoutConfigs.find(c => c.key === "hero_subtitle" || c.key === "hero-subtitle");
                
                let targetTitle = fallbackTitle;
                let targetSubtitle = fallbackSubtitle;

                if (titleConfig && titleConfig.value) {
                    // Line breaks aur extra spaces ko clean karenge taaki data single line mein rahe
                    targetTitle = titleConfig.value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
                }
                if (subtitleConfig && subtitleConfig.value) {
                    targetSubtitle = subtitleConfig.value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
                }

                applyHeroTexts(targetTitle, targetSubtitle);
            }
        } catch (error) {
            console.warn("Hero dynamic sync bypassed, safe backup running.");
        }
    }

    // 3. BULLETPROOF TEXT RENDERING ENGINE (No Dot Splitting)
    function applyHeroTexts(title, subtitle) {
        // Base structure clean classes
        heroTitleEl.className = "text-4xl sm:text-7xl font-black tracking-tight mb-6 font-['Space_Grotesk'] leading-[1.2] text-center text-white block w-full";
        
        const words = title.split(" ");
        let highlightedText = title;

        // Agar title mein 3 se zyada words hain, toh aakhri ke 3 words ko ek sath gradient denge bina text tode
        if (words.length > 3) {
            const lastThreeWords = words.slice(-3).join(" "); // "Think Like Builders."
            const remainingWords = words.slice(0, -3).join(" "); // "Understand Businesses."
            
            highlightedText = `${remainingWords} <span class="bg-gradient-to-r from-[#9333EA] via-[#EC4899] to-[#22C55E] bg-clip-text text-transparent inline-block">${lastThreeWords}</span>`;
        } else {
            // Agar chota text hai toh pure ko span mein wrap kar do
            highlightedText = `<span class="bg-gradient-to-r from-[#9333EA] via-[#EC4899] to-[#22C55E] bg-clip-text text-transparent inline-block">${title}</span>`;
        }
        
        heroTitleEl.innerHTML = highlightedText;

        // Subtitle block handling
        heroSubtitleEl.className = "max-w-2xl mx-auto text-sm sm:text-base tracking-wide font-normal leading-relaxed mb-10 text-neutral-200/90 text-center block";
        heroSubtitleEl.innerText = subtitle;
    }

    // Start sync process
    syncHeroWithSheet();
});