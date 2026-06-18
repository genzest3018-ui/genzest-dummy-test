// ========================================================
// UPGRADED PLAYBOOK ENGINE WITH IMAGE RENDERING (V4.3)
// ========================================================

document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');

    if (!companyId) {
        window.location.href = "index.html";
        return;
    }

    const companyDataList = await getLiveStartupData();
    const currentCompany = companyDataList.find(item => item.id === companyId);

    if (!currentCompany) {
        document.body.innerHTML = `
            <div class="min-h-screen flex items-center justify-center font-mono text-sm theme-text">
                Bhai, record database mein nahi mila! <a href="index.html" class="underline ml-2 text-purple-400">Wapas chalo &rarr;</a>
            </div>
        `;
        return;
    }

    // Elements Setup pointers
    const industryEl = document.getElementById("comp-industry");
    const titleEl = document.getElementById("comp-title");
    const hookEl = document.getElementById("comp-hook");
    const imageContainer = document.getElementById("comp-image-container");
    const heroImg = document.getElementById("comp-hero-img");
    
    const revenueEl = document.getElementById("comp-revenue");
    const moatEl = document.getElementById("comp-moat");
    const marketingEl = document.getElementById("comp-marketing");
    const takeawayEl = document.getElementById("comp-takeaway");

    // Dynamic Image Engine Injection
    if (currentCompany.imageUrl && currentCompany.imageUrl.trim() !== "") {
        if (heroImg && imageContainer) {
            heroImg.src = currentCompany.imageUrl.trim();
            imageContainer.classList.remove("hidden");
        }
    }

    if (industryEl) industryEl.innerText = currentCompany.industry;
    if (titleEl) titleEl.innerText = currentCompany.title;
    if (hookEl) hookEl.innerText = currentCompany.hook;

    // Formatting Text blocks with clean bullet nodes split layout
    if (revenueEl) revenueEl.innerHTML = formatDetailText(currentCompany.revenueFlow);
    if (moatEl) moatEl.innerHTML = formatDetailText(currentCompany.moatMatrix);
    if (marketingEl) marketingEl.innerHTML = formatDetailText(currentCompany.marketingStrategy);
    if (takeawayEl) takeawayEl.innerHTML = formatDetailText(currentCompany.keyTakeaway);

    function formatDetailText(text) {
        if (!text || text.trim() === "" || text.includes("Data update ho raha hai")) {
            return `<p class="text-xs sm:text-sm theme-muted italic">Data update ho raha hai, stay tuned...</p>`;
        }
        
        // Handle semicolon or dot based line splits cleanly
        const points = text.split(/[;.]+/);
        let htmlContent = "";
        
        points.forEach(point => {
            if (point.trim() === "") return;
            htmlContent += `
                <div class="flex items-start space-x-3 mb-3">
                    <span class="text-[#9333EA] mt-1 text-xs select-none">&bull;</span>
                    <span class="text-xs sm:text-sm theme-muted leading-relaxed">${point.trim()}.</span>
                </div>
            `;
        });
        return htmlContent;
    }
});
