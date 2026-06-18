// ========================================================
// CORE DETAIL LOADER WITH THEME INTEGRATION (V4.2)
// ========================================================

document.addEventListener("DOMContentLoaded", async function() {
    // Get unique id token from dynamic active URL query
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');

    if (!companyId) {
        window.location.href = "index.html";
        return;
    }

    // Dynamic Sheet pull configurations
    const companyDataList = await getLiveStartupData();
    const currentCompany = companyDataList.find(item => item.id === companyId);

    if (!currentCompany) {
        document.body.innerHTML = `
            <div class="min-h-screen flex items-center justify-center font-mono text-sm theme-text">
                Bhai, record database mein nahi mila! <a href="index.html" class="underline ml-2">Wapas chalo</a>
            </div>
        `;
        return;
    }

    // Inject matching elements to layout structure tags
    const industryEl = document.getElementById("comp-industry");
    const titleEl = document.getElementById("comp-title");
    const hookEl = document.getElementById("comp-hook");
    
    const revenueEl = document.getElementById("comp-revenue");
    const moatEl = document.getElementById("comp-moat");
    const marketingEl = document.getElementById("comp-marketing");
    const takeawayEl = document.getElementById("comp-takeaway");

    // Dynamic injections
    if (industryEl) {
        industryEl.innerText = currentCompany.industry;
    }
    if (titleEl) {
        titleEl.innerText = currentCompany.title;
        titleEl.className = "text-3xl sm:text-5xl font-black mt-4 tracking-tight font-['Space_Grotesk'] theme-text";
    }
    if (hookEl) {
        hookEl.innerText = currentCompany.hook;
    }

    // Processing line breaks and commas format for text sections
    if (revenueEl) revenueEl.innerHTML = formatDetailText(currentCompany.revenueFlow);
    if (moatEl) moatEl.innerHTML = formatDetailText(currentCompany.moatMatrix);
    if (marketingEl) marketingEl.innerHTML = formatDetailText(currentCompany.marketingStrategy);
    if (takeawayEl) takeawayEl.innerHTML = formatDetailText(currentCompany.keyTakeaway);

    // Helpers formatting helper function to make lists look beautiful
    function formatDetailText(text) {
        if (!text) return "Data update ho raha hai, stay tuned...";
        // split by semicolons or periods if present to make small bullets
        return text.split(';').map(point => {
            if(point.trim() === "") return "";
            return `<div class="flex items-start space-x-2.5 mb-2.5">
                <span class="text-purple-500 mt-1 text-xs">&bull;</span>
                <span class="text-xs sm:text-sm theme-muted leading-relaxed">${point.trim()}</span>
            </div>`;
        }).join('');
    }
});