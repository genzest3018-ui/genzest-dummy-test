// ========================================================
// CORE DETAIL LOADER WITH THEME INTEGRATION (V5.2 - SAFELINK FIXED)
// ========================================================

document.addEventListener("DOMContentLoaded", async function() {
    // Get unique id token from dynamic active URL query
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');

    if (!companyId) {
        window.location.href = "index.html"; // Fixed redirect to index.html
        return;
    }

    // Pull dynamic sheet configurations
    const companyDataList = await getLiveStartupData();
    const currentCompany = companyDataList.find(item => item.id.toLowerCase() === companyId.toLowerCase());

    if (!currentCompany) {
        document.body.innerHTML = `
            <div class="min-h-screen flex items-center justify-center font-mono text-sm text-[var(--text-primary)]" style="background-color: var(--bg-base);">
                Bhai, record database mein nahi mila! <a href="index.html" class="underline ml-2 text-purple-400">Wapas chalo</a>
            </div>
        `;
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

    // Dynamic banner image injection
    if (bannerImg && currentCompany.imageUrl) {
        bannerImg.src = currentCompany.imageUrl;
        bannerImg.parentElement.classList.remove("hidden");
    }

    // Dynamic category and metadata setup
    if (industryEl) {
        industryEl.innerText = currentCompany.industry || "Startup Breakdown";
    }
    if (titleEl) {
        titleEl.innerText = currentCompany.title;
    }
    if (hookEl) {
        hookEl.innerText = currentCompany.hook;
    }

    // Bulletproof high-contrast parsing for paragraphs & lists
    if (revenueEl) revenueEl.innerHTML = formatDetailText(currentCompany.revenueFlow);
    if (moatEl) moatEl.innerHTML = formatDetailText(currentCompany.moatMatrix);
    if (marketingEl) marketingEl.innerHTML = formatDetailText(currentCompany.marketingStrategy);
    if (takeawayEl) takeawayEl.innerHTML = formatDetailText(currentCompany.keyTakeaway);

    // Dynamic Smart Text Formatter (No split by dot or comma - only by newlines!)
    function formatDetailText(text) {
        if (!text) return `<p class="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">Data update ho raha hai lala, stay tuned...</p>`;
        
        // Split strictly by line breaks from Google Sheet inputs
        const lines = text.split(/\n+/);
        
        return lines.map(line => {
            const trimmedLine = line.trim();
            if (trimmedLine === "") return "";
            
            // Check if paragraph is intended as a bullet point list item
            if (trimmedLine.startsWith("-") || trimmedLine.startsWith("*") || trimmedLine.startsWith("•")) {
                const cleanText = trimmedLine.replace(/^[-*•]\s*/, "");
                return `
                    <div class="flex items-start space-x-3 mb-4 leading-relaxed">
                        <span class="text-purple-500 mt-1.5 text-sm flex-shrink-0">&bull;</span>
                        <p class="text-sm sm:text-base text-[var(--text-secondary)] font-medium leading-relaxed">${cleanText}</p>
                    </div>
                `;
            }

            // Standard elegant paragraph layout with forced premium typography colors
            return `<p class="text-sm sm:text-base text-[var(--text-secondary)] font-medium leading-relaxed mb-4 text-justify">${trimmedLine}</p>`;
        }).join('');
    }
});