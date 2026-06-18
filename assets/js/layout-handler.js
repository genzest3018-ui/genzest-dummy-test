// ========================================================
// RE-ENGINEERED HERO BLOCK & TYPOGRAPHY ENGINE (V7.5 - FULL HANDWRITTEN FREAK STYLE)
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

    // Default Fallbacks (Best SEO values)
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

    // 3. COMPLETE HANDWRITTEN GRAPHICS RENDER ENGINE
    function applyHeroTexts(title, subtitle) {
        // Entire heading is configured to use the 'Caveat' font!
        // Font size scaled up (text-5xl to text-8xl) to make cursive highly readable and massive.
        heroTitleEl.className = "text-5xl sm:text-8xl font-bold tracking-normal mb-8 font-['Caveat'] leading-[1.1] text-center text-[#FAFAFA] block w-full px-2 filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.05)]";
        
        // Target keywords to highlight
        const keywords = ["Business Models", "Growth Moats", "Think Like Builders", "Scale & Win"];
        let highlightedText = title;

        // Custom styling helper for neon highlighted nodes
        const styleHighlight = (word) => {
            return `<span class="inline-block transform -rotate-1 mx-1 bg-gradient-to-r from-[#FF2E93] via-[#A855F7] to-[#00FFFF] bg-clip-text text-transparent filter drop-shadow-[0_2px_12px_rgba(255,46,147,0.4)] transition-all duration-300 hover:rotate-0 hover:scale-105">${word}</span>`;
        };

        let matched = false;
        keywords.forEach(keyword => {
            if (title.toLowerCase().includes(keyword.toLowerCase())) {
                // Case-insensitive replacement to maintain original letters capitalization
                const regex = new RegExp(keyword, "gi");
                highlightedText = highlightedText.replace(regex, styleHighlight(keyword));
                matched = true;
            }
        });

        // Fallback: If no keywords match the custom database configs, style the last 3 words dynamically
        if (!matched) {
            const words = title.split(" ");
            if (words.length > 3) {
                const lastThree = words.slice(-3).join(" ");
                const remaining = words.slice(0, -3).join(" ");
                highlightedText = `${remaining} ${styleHighlight(lastThree)}`;
            } else {
                highlightedText = styleHighlight(title);
            }
        }
        
        heroTitleEl.innerHTML = highlightedText;

        // Clean subtle subtitle rendering
        heroSubtitleEl.className = "max-w-3xl mx-auto text-sm sm:text-base tracking-wide font-normal leading-relaxed mb-10 text-neutral-200/90 text-center block px-4";
        heroSubtitleEl.innerText = subtitle;
    }

    // Initialize layout handler loop
    syncHeroWithSheet();
});