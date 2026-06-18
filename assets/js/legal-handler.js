// ========================================================
// CORE LEGAL ENGINE: AUTO-INJECT TEXT FROM GOOGLE SHEETS
// ========================================================

document.addEventListener("DOMContentLoaded", async function() {
    const dynamicContainer = document.getElementById("dynamic-legal-stack");
    if (!dynamicContainer) return;

    // Determine current page ID dynamically based on window URL pathname
    const path = window.location.pathname;
    let pageId = "about"; // default fallback
    
    if (path.includes("disclaimer.html")) pageId = "disclaimer";
    if (path.includes("privacy.html")) pageId = "privacy";

    // Fetch fresh database row records array from sheet-api.js
    const legalRows = await getLiveLegalData();

    // Filter matching blocks belonging to current active tab context
    const targetedSections = legalRows.filter(row => row.page_id === pageId);

    if (targetedSections.length === 0) {
        dynamicContainer.innerHTML = `
            <div class="text-center py-6 text-brandTextMuted text-xs font-mono">
                Bhai Sheet mein abhi is page ka koi data content save nahi mila.
            </div>
        `;
        return;
    }

    // Flush skeleton loading text holder out
    dynamicContainer.innerHTML = "";

    // Iterate data blocks mapping clean responsive elements
    targetedSections.forEach((section, index) => {
        const sectionBlock = document.createElement("div");
        
        // Highlight logic layout for last block or special takeaways gradients
        if (pageId === "about" && index === targetedSections.length - 1) {
            sectionBlock.className = "p-6 sm:p-8 bg-gradient-to-tr from-accentViolet/10 to-transparent border border-purple-500/20 rounded-2xl";
        } else {
            sectionBlock.className = "p-6 sm:p-8 bg-brandCard border border-brandBorder rounded-2xl";
        }

        sectionBlock.innerHTML = `
            <h2 class="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight">${section.section_title}</h2>
            <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">${section.section_content}</p>
        `;
        
        dynamicContainer.appendChild(sectionBlock);
    });
});
