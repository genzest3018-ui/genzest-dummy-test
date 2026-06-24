// ========================================================
// CORE DETAIL LOADER WITH THEME INTEGRATION (V5.9 - RELATED PLAYBOOKS)
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

    // ===== RELATED PLAYBOOKS SECTION =====
    renderRelatedPlaybooks(currentCompany, companyDataList);

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

    function renderRelatedPlaybooks(current, allCompanies) {
        const relatedContainer = document.getElementById("related-cards-container");
        if (!relatedContainer) return;

        const currentSlug = (current.slug || current.id || "").toString().toLowerCase();
        const currentIndustry = (current.industry || "").toLowerCase().trim();

        // Prefer same industry, exclude current company
        let related = allCompanies.filter(item => {
            if (!item) return false;
            const itemSlug = (item.slug || item.id || "").toString().toLowerCase();
            if (itemSlug === currentSlug) return false;
            return (item.industry || "").toLowerCase().trim() === currentIndustry;
        });

        // Fallback: if not enough same-industry matches, fill with any other companies
        if (related.length < 3) {
            const others = allCompanies.filter(item => {
                if (!item) return false;
                const itemSlug = (item.slug || item.id || "").toString().toLowerCase();
                return itemSlug !== currentSlug && !related.includes(item);
            });
            related = related.concat(others).slice(0, 3);
        } else {
            related = related.slice(0, 3);
        }

        if (related.length === 0) {
            relatedContainer.innerHTML = "";
            const sectionWrapper = document.getElementById("related-playbooks-section");
            if (sectionWrapper) sectionWrapper.classList.add("hidden");
            return;
        }

        relatedContainer.innerHTML = "";

        related.forEach(item => {
            const slugOrId = (item.slug || item.id || "").toString().toLowerCase();
            if (!slugOrId) return;

            const card = document.createElement("div");
            card.className = "bg-[#0f0a1e] rounded-2xl border border-white/5 overflow-hidden flex flex-col cursor-pointer transition-all duration-300 sexy-glowing-card group";

            const imageUrl = (item.imageUrl || item.imageurl || "").trim() !== ""
                ? (item.imageUrl || item.imageurl)
                : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";

            const industryBadge = item.industry && item.industry.trim() !== ""
                ? `<span class="inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded bg-purple-950/50 text-[#00FFFF] border border-purple-500/20">${item.industry.trim()}</span>`
                : '';

            card.innerHTML = `
                <div class="relative w-full aspect-video overflow-hidden bg-neutral-900 rounded-t-2xl">
                    <img src="${imageUrl}" alt="${item.title || ''}" class="w-full h-full object-cover transition duration-500 group-hover:scale-105" onerror="this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'">
                </div>
                <div class="p-5 flex flex-col flex-grow">
                    <div class="flex items-center justify-between mb-3">
                        ${industryBadge}
                        <svg class="w-4 h-4 text-white/40 group-hover:text-cyan-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                    <h3 class="vibrant-card-title mb-2">${item.title || 'Untitled'}</h3>
                    <p class="vibrant-card-desc mb-6 flex-grow">${item.hook || ''}</p>
                    <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <span class="vibrant-card-link text-[11px] font-mono tracking-widest uppercase">READ FULL PLAYBOOK</span>
                        <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                    </div>
                </div>
            `;

            card.onclick = function() {
                window.location.href = "/company/" + slugOrId;
            };

            relatedContainer.appendChild(card);
        });

        if (window.enhanceDOMElements) window.enhanceDOMElements();
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