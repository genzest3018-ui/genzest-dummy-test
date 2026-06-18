// ========================================================
// RE-ENGINEERED HERO BLOCK & TYPOGRAPHY ENGINE (V7.0 - HANDWRITTEN FREAK STYLE)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    const heroTitleEl = document.getElementById("dyn-hero-title");
    const heroSubtitleEl = document.getElementById("dyn-hero-subtitle");

    if (!heroTitleEl || !heroSubtitleEl) return;

    // 1. DYNAMICALLY LOAD THE CRAZY HANDWRITTEN & SANS-SERIF GOOGLE FONTS
    if (!document.getElementById("genzest-aesthetic-fonts")) {
        const fontLink = document.createElement("link");
        fontLink.id = "genzest-aesthetic-fonts";
        fontLink.rel = "stylesheet";
        fontLink.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Space+Grotesk:wght@900&display=swap";
        document.head.appendChild(fontLink);
    }

    // Default Fallbacks
    const fallbackTitle = "We Decode Startup Business Models & Growth Moats";
    const fallbackSubtitle = "Complex startup marketing strategies, unit economics, and hidden growth engines simplified into a high-signal database.";
    
    applyHeroTexts(fallbackTitle, fallbackSubtitle);

    // 2. TIMING DELAY & SAFETY OVERRIDE ENGINE
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

    // 3. HANDWRITTEN FREAK GRAPHICS RENDER ENGINE
    function applyHeroTexts(title, subtitle) {
        // Base title setup with responsive styling & Space Grotesk Font
        heroTitleEl.className = "text-4xl sm:text-7xl font-black tracking-tight mb-8 font-['Space_Grotesk'] leading-[1.25] text-center text-white block w-full px-2";
        
        // Exact premium SEO keywords to automatically highlight with crazy handwritten fonts
        const keyword1 = "Business Models";
        const keyword2 = "Growth Moats";

        let highlightedText = title;

        // Custom styling blocks for the handwritten keywords
        const styleKeyword = (word) => {
            return `<span class="inline-block transform -rotate-2 mx-1 px-2 font-['Caveat'] text-5xl sm:text-8xl font-bold tracking-normal bg-gradient-to-r from-[#FF007F] via-[#9D4EDD] to-[#00F5FF] bg-clip-text text-transparent filter drop-shadow-[0_2px_15px_rgba(255,0,127,0.35)] transition-all duration-300 hover:rotate-0 hover:scale-105">${word}</span>`;
        };

        // Dynamically replace keywords with the handwritten styled blocks safely
        if (title.includes(keyword1) || title.includes(keyword2)) {
            if (title.includes(keyword1)) {
                highlightedText = highlightedText.replace(keyword1, styleKeyword(keyword1));
            }
            if (title.includes(keyword2)) {
                highlightedText = highlightedText.replace(keyword2, styleKeyword(keyword2));
            }
        } else {
            // Fallback: If keywords aren't in sheet, style the last 2 words as cursive freak
            const words = title.split(" ");
            if (words.length > 2) {
                const lastTwo = words.slice(-2).join(" ");
                const remaining = words.slice(0, -2).join(" ");
                highlightedText = `${remaining} ${styleKeyword(lastTwo)}`;
            }
        }
        
        heroTitleEl.innerHTML = highlightedText;

        // Subtitle rendering with clean contrast
        heroSubtitleEl.className = "max-w-3xl mx-auto text-sm sm:text-base tracking-wide font-normal leading-relaxed mb-10 text-neutral-200/90 text-center block px-4";
        heroSubtitleEl.innerText = subtitle;
    }

    syncHeroWithSheet();
});