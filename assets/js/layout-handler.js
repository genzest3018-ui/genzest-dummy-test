// ========================================================
// RE-ENGINEERED HERO BLOCK & TYPOGRAPHY ENGINE (V6.4 - DYNAMIC HIGHLIGHT)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    const heroTitleEl = document.getElementById("dyn-hero-title");
    const heroSubtitleEl = document.getElementById("dyn-hero-subtitle");

    if (!heroTitleEl || !heroSubtitleEl) return;

    // Default Fallbacks
    const fallbackTitle = "Understand Businesses. Think Like Builders.";
    const fallbackSubtitle = "Visual breakdowns of business models, marketing strategies, growth engines and competitive moats of successful companies.";
    
    applyHeroTexts(fallbackTitle, fallbackSubtitle);

    // TIMING DELAY & ROBUST TEXT SYNC ENGINE
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
                    // Line breaks (\n ya \r) ko space se replace karenge taaki text toote na
                    targetTitle = titleConfig.value.replace(/[\r\n]+/g, " ").trim();
                }
                if (subtitleConfig && subtitleConfig.value) {
                    targetSubtitle = subtitleConfig.value.replace(/[\r\n]+/g, " ").trim();
                }

                applyHeroTexts(targetTitle, targetSubtitle);
            }
        } catch (error) {
            console.warn("Hero dynamic sync bypassed, safe backup running.");
        }
    }

    // SMART HIGHLIGHT ENGINE: Dynamic gradient injection on the last sentence/phrase
    function applyHeroTexts(title, subtitle) {
        heroTitleEl.className = "text-4xl sm:text-7xl font-black tracking-tight mb-6 font-['Space_Grotesk'] leading-[1.2] text-center text-white";
        
        // Agar text mein dot (.) hai, toh aakhri part ko highlight karo, nahi toh aakhri 2 words ko
        let highlightedText = title;
        if (title.includes(".") && title.lastIndexOf(".") < title.length - 1) {
            const lastDotIndex = title.lastIndexOf(".");
            const firstPart = title.substring(0, lastDotIndex + 1);
            const lastPart = title.substring(lastDotIndex + 1);
            highlightedText = `${firstPart} <span class="bg-gradient-to-r from-[#9333EA] via-[#EC4899] to-[#22C55E] bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(236,72,153,0.15)]">${lastPart}</span>`;
        } else {
            // Fallback: Just highlight the last 2 words dynamically
            const words = title.split(" ");
            if (words.length > 2) {
                const lastTwo = words.splice(-2).join(" ");
                highlightedText = `${words.join(" ")} <span class="bg-gradient-to-r from-[#9333EA] via-[#EC4899] to-[#22C55E] bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(236,72,153,0.15)]">${lastTwo}</span>`;
            }
        }
        
        heroTitleEl.innerHTML = highlightedText;

        // Bright clear subtitle formatting
        heroSubtitleEl.className = "max-w-2xl mx-auto text-sm sm:text-base tracking-wide font-normal leading-relaxed mb-10 text-neutral-200/90 text-center";
        heroSubtitleEl.innerText = subtitle;
    }

    syncHeroWithSheet();
});
