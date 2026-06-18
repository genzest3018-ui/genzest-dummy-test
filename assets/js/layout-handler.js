// ========================================================
// UPGRADED HERO BLOCK & TYPOGRAPHY SYSTEM (V6.2)
// ========================================================

document.addEventListener("DOMContentLoaded", async function() {
    const heroTitleEl = document.getElementById("dyn-hero-title");
    const heroSubtitleEl = document.getElementById("dyn-hero-subtitle");

    let layoutConfigs = [];
    try {
        layoutConfigs = await getLiveLayoutConfigs();
    } catch (e) {
        console.warn("Layout configuration fallback triggered:", e);
    }

    let rawTitle = "We Decode How Startups Win";
    let subText = "Complex startup business models aur unki hidden marketing strategies ka sabse simplified aur high-signal database.";

    if (layoutConfigs && layoutConfigs.length > 0) {
        const titleConfig = layoutConfigs.find(c => c.key === "hero-title");
        const subtitleConfig = layoutConfigs.find(c => c.key === "hero-subtitle");
        if (titleConfig && titleConfig.value) rawTitle = titleConfig.value;
        if (subtitleConfig && subtitleConfig.value) subText = subtitleConfig.value;
    }

    if (heroTitleEl) {
        heroTitleEl.className = "text-4xl sm:text-7xl font-black tracking-tight mb-6 font-['Space_Grotesk'] leading-[1.1] text-center text-white";
        
        const highlightedText = rawTitle.replace(
            /(Startups Win|Wins|How Startups Win)/gi, 
            `<span class="bg-gradient-to-r from-[#9333EA] via-[#EC4899] to-[#22C55E] bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(236,72,153,0.15)]">$1</span>`
        );
        
        heroTitleEl.innerHTML = highlightedText;
    }

    if (heroSubtitleEl) {
        // FIXED: Changed opacity and class to make it pop beautifully in crisp light-white
        heroSubtitleEl.className = "max-w-2xl mx-auto text-sm sm:text-base tracking-wide font-normal leading-relaxed mb-10 text-neutral-200/90 text-center";
        heroSubtitleEl.innerText = subText;
    }
});
