// ========================================================
// CORE DETAIL LOADER WITH THEME INTEGRATION (V5.8 - CLEAN PATH ROUTING)
// ========================================================

document.addEventListener("DOMContentLoaded", async function() {

    // Read slug from clean path: /company/sarvam-ai
    // Fallback to query param: /company.html?id=sarvam-ai (backward compat)
    const pathParts = window.location.pathname.split('/');
    const pathSlug = pathParts[pathParts.length - 1];
    const urlParams = new URLSearchParams(window.location.search);
    const querySlug = urlParams.get('id');

    const slug = (pathSlug && pathSlug !== "company.html" && pathSlug !== "")
        ? pathSlug
        : querySlug;

    if (!slug) {
        window.location.href = "/";
        return;
    }

    let companyDataList = [];
    if (typeof getLiveStartupData === "function") {
        companyDataList = await getLiveStartupData();
    } else {
        console.error("Critical: getLiveStartupData function not found!");
    }

    // Match by slug (title-generated), then fallback to raw id
    const needle = slug.toLowerCase().trim();
    const currentCompany = companyDataList.find(item => {
        if (!item) return false;
        const slugMatch = item.slug && item.slug.toLowerCase() === needle;
        const idMatch = item.id && item.id.toString().toLowerCase() === needle;
        return slugMatch || idMatch;
    });

    if (!currentCompany) {
        const fallbackContainer = document.getElementById("comp-title");
        if (fallbackContainer) fallbackContainer.innerText = "Data Syncing...";
        const hookContainer = document.getElementById("comp-hook");
        if (hookContainer) hookContainer.innerText = "Bhai, sheet se response thoda slow hai ya column matching check karo. Row data automatic parse ho raha hai.";
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

    // Dynamic SEO meta tags
    document.title = startupTitle + " | Genzest Playbook";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", startupHook);

    addSchemaMarkup(startupTitle, startupHook);

    function formatDetailText(text) {
        if (!text || text.trim() === "") {
            return `<p class="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed opacity-60">Data update ho raha hai lala, stay tuned...</p>`;
        }

        const lines = text.split(/\r?\n+/);
        return lines.map(line => {
            const trimmedLine = line.trim();
            if (trimmedLine === "") return "";

            if (trimmedLine.startsWith("-") || trimmedLine.startsWith("*") || trimmedLine.startsWith("•")) {
                const cleanText = trimmedLine.replace(/^[-*•]\s*/, "");
                return `
                    <div class="flex items-start space-x-3 mb-4 leading-relaxed">
                        <span class="text-purple-500 mt-1.5 text-sm flex-shrink-0">&bull;</span>
                        <p class="text-sm sm:text-base text-[var(--text-secondary)] font-medium leading-relaxed">${cleanText}</p>
                    </div>
                `;
            }
            return `<p class="text-sm sm:text-base text-[var(--text-secondary)] font-medium leading-relaxed mb-4 text-justify">${trimmedLine}</p>`;
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
