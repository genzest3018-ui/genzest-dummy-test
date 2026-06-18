// ========================================================
// CORE DETAIL LOADER WITH THEME INTEGRATION (V5.5 - STRICT FALLBACK ENGINE)
// ========================================================

document.addEventListener("DOMContentLoaded", async function() {
    // Get unique id token from dynamic active URL query
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');

    if (!companyId) {
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
    
    const currentCompany = companyDataList.find(item => item && item.id && item.id.toLowerCase() === companyId.toLowerCase());

    if (!currentCompany) {
        // Safe document element render to prevent hard code routing crashes
        const fallbackContainer = document.getElementById("comp-title");
        if (fallbackContainer) {
            fallbackContainer.innerText = "Data Syncing...";
        }
        const hookContainer = document.getElementById("comp-hook");
        if (hookContainer) {
            hookContainer.innerText = "Bhai, sheet se response thoda slow hai ya column matching check karo. Row data automatic parse ho raha hai.";
        }
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

    // Dynamic banner image injection safely
    if (bannerImg && (currentCompany.imageUrl || currentCompany.imageurl)) {
        bannerImg.src = currentCompany.imageUrl || currentCompany.imageurl;
        bannerImg.parentElement.classList.remove("hidden");
    }

    // Dynamic category and title mapping with secondary safety keys
    if (industryEl) {
        industryEl.innerText = currentCompany.industry || "Startup Breakdown";
    }
    if (titleEl) {
        titleEl.innerText = currentCompany.title || "Untitled Case Study";
    }
    if (hookEl) {
        hookEl.innerText = currentCompany.hook || "No summary provided.";
    }

    // Cross-checking exact keys with underscores as well to stop parsing crashes!
    const revenueData = currentCompany.revenueFlow || currentCompany.revenue_flow || "";
    const moatData = currentCompany.moatMatrix || currentCompany.moat_matrix || "";
    const marketingData = currentCompany.marketingStrategy || currentCompany.marketing_strategy || "";
    const takeawayData = currentCompany.keyTakeaway || currentCompany.key_takeaway || "";

    if (revenueEl) revenueEl.innerHTML = formatDetailText(revenueData);
    if (moatEl) moatEl.innerHTML = formatDetailText(moatData);
    if (marketingEl) marketingEl.innerHTML = formatDetailText(marketingData);
    if (takeawayEl) takeawayEl.innerHTML = formatDetailText(takeawayData);

    // Dynamic Smart Text Formatter (No split by dot or comma - only by newlines!)
    function formatDetailText(text) {
        if (!text || text.trim() === "") {
            return `<p class="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed opacity-60">Data update ho raha hai lala, stay tuned...</p>`;
        }
        
        const lines = text.split(/\r?\n+/);
        
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

            return `<p class="text-sm sm:text-base text-[var(--text-secondary)] font-medium leading-relaxed mb-4 text-justify">${trimmedLine}</p>`;
        }).join('');
    }
});