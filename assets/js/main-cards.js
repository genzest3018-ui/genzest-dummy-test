// ========================================================
// GENZEST PLAYBOOK CARDS ENGINE (V2.6 - BULLETPROOF ROUTING FIXED)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("cases-container");
    const searchInput = document.getElementById("search-input");

    if (!container) return;

    // --- PLAYBOOK CARDS RENDERING ---
    async function loadAndRenderCards() {
        if (typeof getLiveStartupData !== "function") {
            setTimeout(loadAndRenderCards, 250);
            return;
        }

        try {
            const cases = await getLiveStartupData();
            if (cases && cases.length > 0) {
                container.innerHTML = ""; // Clear loader spinner

                cases.forEach(item => {
                    const card = document.createElement("div");
                    
                    // Unified Instagram swiper layout configurations
                    card.className = "w-[85vw] sm:w-[350px] md:w-auto flex-shrink-0 snap-start bg-[#0f0a1e] rounded-2xl border border-white/5 overflow-hidden flex flex-col cursor-pointer transition-all duration-300 sexy-glowing-card group";
                    
                    const imageUrl = item.imageUrl && item.imageUrl.trim() !== "" ? item.imageUrl : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";

                    // Dynamic industry tag mapping
                    const industryBadge = item.industry && item.industry.trim() !== "" 
                        ? `<span class="inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded bg-purple-950/50 text-[#00FFFF] border border-purple-500/20">${item.industry.trim()}</span>` 
                        : '';

                    card.innerHTML = `
                        <div class="relative w-full aspect-video overflow-hidden bg-neutral-900 rounded-t-2xl">
                            <img src="${imageUrl}" alt="${item.title}" class="w-full h-full object-cover transition duration-500 group-hover:scale-105" onerror="this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'">
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <div class="flex items-center justify-between mb-3">
                                ${industryBadge}
                                <svg class="w-4 h-4 text-white/40 group-hover:text-cyan-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </div>
                            <h3 class="vibrant-card-title mb-2">${item.title}</h3>
                            <p class="vibrant-card-desc mb-6 flex-grow">${item.hook}</p>
                            <div class="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <span class="vibrant-card-link text-[11px] font-mono tracking-widest uppercase">READ FULL PLAYBOOK</span>
                                <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                            </div>
                        </div>
                    `;

                    // FIXED: Reverted back to company.html to stop 404 errors on Vercel deployment!
                    card.onclick = () => {
                        window.location.href = `company.html?id=${encodeURIComponent(item.id)}`;
                    };

                    container.appendChild(card);
                });

                // Trigger DOM styles sweep
                if (window.enhanceDOMElements) window.enhanceDOMElements();

            } else {
                container.innerHTML = `<div class="col-span-full text-center py-12 text-sm font-mono text-neutral-400 w-full">No breakdowns found in dynamic sheet.</div>`;
            }
        } catch (error) {
            console.error("Error drawing cases board:", error);
            container.innerHTML = `<div class="col-span-full text-center py-12 text-sm font-mono text-red-400 w-full">Connection delay. Refreshing engine...</div>`;
        }
    }

    // Client search filter hook
    if (searchInput) {
        searchInput.addEventListener("input", function(e) {
            const query = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll(".sexy-glowing-card");
            
            cards.forEach(card => {
                const title = card.querySelector(".vibrant-card-title")?.textContent.toLowerCase() || "";
                const desc = card.querySelector(".vibrant-card-desc")?.textContent.toLowerCase() || "";
                
                if (title.includes(query) || desc.includes(query)) {
                    const displayMode = window.innerWidth < 768 ? "block" : "flex";
                    card.style.setProperty("display", displayMode, "important");
                } else {
                    card.style.setProperty("display", "none", "important");
                }
            });
        });
    }

    // Run cards board renderer
    loadAndRenderCards();
});