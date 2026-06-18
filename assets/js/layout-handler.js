// ========================================================
// RE-ENGINEERED HERO BLOCK & TYPOGRAPHY SYSTEM (V6.1)
// ========================================================

document.addEventListener("DOMContentLoaded", async function() {
    // Dynamic integration slots identifiers
    const heroTitleEl = document.getElementById("dyn-hero-title");
    const heroSubtitleEl = document.getElementById("dyn-hero-subtitle");

    // Fetch baseline configurations metadata using backend hook
    let layoutConfigs = [];
    try {
        layoutConfigs = await getLiveLayoutConfigs(); // sheet-api framework connection
    } catch (e) {
        console.warn("Layout configuration array loading fallback:", e);
    }

    // Baseline static text logic setup with premium aesthetic mapping
    let rawTitle = "We Decode How Startups Win";
    let subText = "Complex startup business models aur unki hidden marketing strategies ka sabse simplified aur high-signal database.";

    // If Google sheet layout config data is available, load it dynamically
    if (layoutConfigs && layoutConfigs.length > 0) {
        const titleConfig = layoutConfigs.find(c => c.key === "hero-title");
        const subtitleConfig = layoutConfigs.find(c => c.key === "hero-subtitle");
        if (titleConfig && titleConfig.value) rawTitle = titleConfig.value;
        if (subtitleConfig && subtitleConfig.value) subText = subtitleConfig.value;
    }

    // PREMIUM RE-STYLING: Break words and inject high-contrast neon gradients
    if (heroTitleEl) {
        heroTitleEl.className = "text-4xl sm:text-7xl font-black tracking-tight mb-6 font-['Space_Grotesk'] leading-[1.1] text-center";
        
        // Turn "Startups Win" or specific words into a sexy color gradient text span
        const highlightedText = rawTitle.replace(
            /(Startups Win|Wins|How Startups Win)/gi, 
            `<span class="bg-gradient-to-r from-[#9333EA] via-[#EC4899] to-[#22C55E] bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(236,72,153,0.15)]">$1</span>`
        );
        
        heroTitleEl.innerHTML = highlightedText;
    }

    if (heroSubtitleEl) {
        heroSubtitleEl.className = "max-w-2xl mx-auto text-xs sm:text-sm tracking-wide font-medium leading-relaxed mb-10 opacity-80 text-center";
        heroSubtitleEl.innerText = subText;
    }
});
