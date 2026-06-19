// ========================================================
// CORE DETAIL LOADER (V5.7 - SLUG BASED SEO PRO)
// ========================================================

document.addEventListener("DOMContentLoaded", async function() {
    // 1. URL se slug nikalne ka logic
    // Agar URL genzest.in/sarvam-ai hai, toh 'sarvam-ai' nikal lega
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const slug = pathSegments[pathSegments.length - 1]; 

    // Agar slug nahi mila, toh index par bhej do
    if (!slug || slug === "company") {
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
    
    // 2. ID ke jagah SLUG se match karo
    const currentCompany = companyDataList.find(item => item && item.slug && item.slug.toLowerCase() === slug.toLowerCase());

    if (!currentCompany) {
        const fallbackContainer = document.getElementById("comp-title");
        if (fallbackContainer) fallbackContainer.innerText = "Startup not found...";
        return;
    }

    // Elements mapping
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
        if (!text || text.trim() === "") return `<p class="text-sm sm:text-base text-[var(--text-secondary)] opacity-60">Data sync in progress...</p>`;
        const lines = text.split(/\r?\n+/);
        return lines.map(line => {
            const trimmedLine = line.trim();
            if (trimmedLine === "") return "";
            if (trimmedLine.startsWith("-") || trimmedLine.startsWith("*") || trimmedLine.startsWith("•")) {
                const cleanText = trimmedLine.replace(/^[-*•]\s*/, "");
                return `<div class="flex items-start space-x-3 mb-4"><span class="text-purple-500 mt-1.5">&bull;</span><p class="text-sm sm:text-base text-[var(--text-secondary)]">${cleanText}</p></div>`;
            }
            return `<p class="text-sm sm:text-base text-[var(--text-secondary)] mb-4 text-justify">${trimmedLine}</p>`;
        }).join('');
    }
});

function addSchemaMarkup(title, desc) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": desc,
        "author": {"@type": "Organization", "name": "GENZEST"}
    });
    document.head.appendChild(script);
}
