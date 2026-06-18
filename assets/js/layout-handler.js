// ========================================================
// RE-ENGINEERED HERO BLOCK & TYPOGRAPHY ENGINE (V8.0 - NO-CLIP CURSIVE & GLASSBOX)
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

    // 3. COMPLETE HANDWRITTEN GRAPHICS & GLASSBOX RENDER ENGINE
    function applyHeroTexts(title, subtitle) {
        // Overall Heading Configured to prevent vertical and horizontal clipping
        // leading-[1.35] ensures top/bottom loops of 'S' and 'g' don't get cut
        heroTitleEl.className = "text-5xl sm:text-8xl font-bold tracking-normal mb-10 font-['Caveat'] leading-[1.35] text-center text-[#FAFAFA] block w-full px-4 overflow-visible filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.05)]";
        
        // Target keywords to style with neon cursive look
        const keywords = ["Business Models", "Growth Moats", "Think Like Builders", "Scale & Win"];
        let highlightedText = title;

        // Custom styling helper for neon highlighted nodes
        // Added horizontal/vertical padding and overflow-visible to prevent clipping of 'S' and 's'
        const styleHighlight = (word) => {
            return `<span class="inline-block transform -rotate-1 px-4 py-1 overflow-visible bg-gradient-to-r from-[#FF2E93] via-[#A855F7] to-[#00FFFF] bg-clip-text text-transparent filter drop-shadow-[0_2px_12px_rgba(255,46,147,0.4)] transition-all duration-300 hover:rotate-0 hover:scale-105">${word}</span>`;
        };

        let matched = false;
        keywords.forEach(keyword => {
            if (title.toLowerCase().includes(keyword.toLowerCase())) {
                const regex = new RegExp(keyword, "gi");
                highlightedText = highlightedText.replace(regex, styleHighlight(keyword));
                matched = true;
            }
        });

        // Fallback: If no keywords match, style the last 3 words dynamically
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

        // HIGH-CONTRAST GLASSMORPHIC CONTAINER FOR SUBTITLE (Vibrant White & Premium Glass Box)
        heroSubtitleEl.className = "max-w-3xl mx-auto text-sm sm:text-base tracking-wide font-medium leading-relaxed mb-12 text-white/95 text-center block px-6 py-4 rounded-2xl border border-white/5 bg-neutral-950/40 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.6)]";
        heroSubtitleEl.innerText = subtitle;
    }

    // Initialize layout handler loop
    syncHeroWithSheet();
});