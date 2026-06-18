// ========================================================
// RE-ENGINEERED HERO BLOCK & TYPOGRAPHY ENGINE (V9.9 - CLASS-BASED HYBRID)
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

    // Default Fallbacks
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

    // 3. UNIFIED CLASS-BASED TYPOGRAPHY AND MOUNT
    function applyHeroTexts(title, subtitle) {
        // Base title setup
        heroTitleEl.className = "text-5xl sm:text-8xl font-bold tracking-normal mb-8 font-['Caveat'] leading-[1.3] text-center text-[var(--text-primary)] block w-full px-2 overflow-visible";
        
        let highlightedText = title;

        // Custom styling helper utilizing the .cursive-highlight CSS rules
        const styleNeonHighlight = (word) => {
            return `<span class="cursive-highlight">${word}</span>`;
        };

        const keywords = ["Startup", "Business Models", "Growth Moats", "Think Like Builders", "Scale & Win"];

        keywords.forEach(keyword => {
            if (title.toLowerCase().includes(keyword.toLowerCase())) {
                const regex = new RegExp(keyword, "gi");
                highlightedText = highlightedText.replace(regex, styleNeonHighlight(keyword));
            }
        });

        heroTitleEl.innerHTML = highlightedText;

        // Subtitle rendering using dynamic text-color
        heroSubtitleEl.className = "max-w-3xl mx-auto text-sm sm:text-base tracking-wide font-bold leading-relaxed mb-12 text-center block px-6 py-5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-[0_0_25px_var(--glow-primary)] text-[var(--text-primary)] transition-all duration-300";
        heroSubtitleEl.innerText = subtitle;
    }

    // Initialize layout sync loop
    syncHeroWithSheet();
});