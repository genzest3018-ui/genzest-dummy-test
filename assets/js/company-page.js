document.addEventListener("DOMContentLoaded", async function() {
    // 1. URL Parameters aur Path dono fetch karo
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');
    
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const slug = pathSegments[pathSegments.length - 1]; 

    // 2. Redirect sirf tabhi karo jab id bhi na ho aur slug bhi na ho (ya sirf 'company' path ho)
    if (!companyId && (!slug || slug === "company")) {
        window.location.href = "index.html"; 
        return;
    }

    // Safely pull dynamic sheet data array
    let companyDataList = [];
    if (typeof getLiveStartupData === "function") {
        companyDataList = await getLiveStartupData();
    } else {
        console.error("Critical: getLiveStartupData function not found!");
    }
    
    // 3. Hybrid Find: ID ya Slug dono mein se jisse match mil jaye
    const currentCompany = companyDataList.find(item => {
        if (!item) return false;
        const matchId = companyId && item.id && item.id.toLowerCase() === companyId.toLowerCase();
        const matchSlug = slug && item.slug && item.slug.toLowerCase() === slug.toLowerCase();
        return matchId || matchSlug;
    });

    if (!currentCompany) {
        const fallbackContainer = document.getElementById("comp-title");
        if (fallbackContainer) {
            fallbackContainer.innerText = "Data Syncing...";
        }
        const hookContainer = document.getElementById("comp-hook");
        if (hookContainer) {
            hookContainer.innerText = "Bhai, sheet se response thoda slow hai ya column matching check karo.";
        }
        return;
    }

    // Elements mapping (Same as before)
    const industryEl = document.getElementById("comp-industry");
    const titleEl = document.getElementById("comp-title");
    const hookEl = document.getElementById("comp-hook");
    
    const revenueEl = document.getElementById("comp-revenue");
    const moatEl = document.getElementById("comp-moat");
    const marketingEl = document.getElementById("comp-marketing");
    const takeawayEl = document.getElementById("comp-takeaway");
    const bannerImg = document.getElementById("comp-banner-img");

    if (bannerImg && (currentCompany.imageUrl || currentCompany.imageurl)) {
        bannerImg.src = currentCompany.imageUrl || currentCompany.imageurl;
        bannerImg.parentElement.classList.remove("hidden");
    }

    const startupTitle = currentCompany.title || "Untitled Case Study";
    const startupHook = currentCompany.hook || "No summary provided.";

    if (industryEl) industryEl.innerText = currentCompany.industry || "Startup Breakdown";
    if (titleEl) titleEl.innerText = startupTitle;
    if (hookEl) hookEl.innerText = startupHook;

    const revenueData = currentCompany.revenueFlow || currentCompany.revenue_flow || "";
    const moatData = currentCompany.moatMatrix || currentCompany.moat_matrix || "";
    const marketingData = currentCompany.marketingStrategy || currentCompany.marketing_strategy || "";
    const takeawayData = currentCompany.keyTakeaway || currentCompany.key_takeaway || "";

    if (revenueEl) revenueEl.innerHTML = formatDetailText(revenueData);
    if (moatEl) moatEl.innerHTML = formatDetailText(moatData);
    if (marketingEl) marketingEl.innerHTML = formatDetailText(marketingData);
    if (takeawayEl) takeawayEl.innerHTML = formatDetailText(takeawayData);

    addSchemaMarkup(startupTitle, startupHook);

    function formatDetailText(text) {
        if (!text || text.trim() === "") return `<p class="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed opacity-60">Data update ho raha hai lala, stay tuned...</p>`;
        const lines = text.split(/\r?\n+/);
        return lines.map(line => {
            const trimmedLine = line.trim();
            if (trimmedLine === "") return "";
            if (trimmedLine.startsWith("-") || trimmedLine.startsWith("*") || trimmedLine.startsWith("•")) {
                const cleanText = trimmedLine.replace(/^[-*•]\s*/, "");
                return `<div class="flex items-start space-x-3 mb-4"><span class="text-purple-500 mt-1.5 text-sm flex-shrink-0">&bull;</span><p class="text-sm sm:text-base text-[var(--text-secondary)] font-medium leading-relaxed">${cleanText}</p></div>`;
            }
            return `<p class="text-sm sm:text-base text-[var(--text-secondary)] font-medium leading-relaxed mb-4 text-justify">${trimmedLine}</p>`;
        }).join('');
    }
});
