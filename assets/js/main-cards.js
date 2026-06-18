// ========================================================
// GENZEST CARDS & THEME CONTROLLER ENGINE (V1.0 - MULTI-FILE PART 2)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("cases-container");
    const searchInput = document.getElementById("search-input");

    // --- BULLETPROOF THEME SWITCH SYSTEM ---
    const overlay = document.getElementById("drawer-overlay");
    const panel = document.getElementById("drawer-panel");
    const trigger = document.getElementById("menu-trigger");
    const closeBtn = document.getElementById("drawer-close");
    const darkBtn = document.getElementById("theme-btn-dark");
    const lightBtn = document.getElementById("theme-btn-light");

    // Initial state check
    const initialTheme = localStorage.getItem("genzest-theme") || "dark";
    setTheme(initialTheme);

    function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("genzest-theme", theme);
        
        // Dynamic active state toggle inside menu drawer
        if (theme === "dark") {
            darkBtn.className = "px-4 py-2.5 rounded-xl border border-[#A855F7] bg-[#A855F7]/10 text-[#A855F7] font-mono text-xs font-bold transition flex items-center justify-center gap-2";
            lightBtn.className = "px-4 py-2.5 rounded-xl border border-white/10 text-neutral-400 font-mono text-xs font-bold transition flex items-center justify-center gap-2 hover:bg-white/5";
        } else {
            lightBtn.className = "px-4 py-2.5 rounded-xl border border-amber-400 bg-amber-400/10 text-amber-400 font-mono text-xs font-bold transition flex items-center justify-center gap-2";
            darkBtn.className = "px-4 py-2.5 rounded-xl border border-white/10 text-neutral-400 font-mono text-xs font-bold transition flex items-center justify-center gap-2 hover:bg-white/5";
        }
    }

    darkBtn.onclick = () => setTheme("dark");
    lightBtn.onclick = () => setTheme("light");

    // Navigation slide-in actions
    trigger.onclick = () => {
        overlay.classList.remove("hidden");
        setTimeout(() => {
            overlay.classList.remove("opacity-0");
            panel.classList.remove("translate-x-full");
        }, 10);
    };

    const closeDrawer = () => {
        overlay.classList.add("opacity-0");
        panel.classList.add("translate-x-full");
        setTimeout(() => {
            overlay.classList.add("hidden");
        }, 300);
    };

    closeBtn.onclick = closeDrawer;
    overlay.onclick = closeDrawer;


    // --- PLAYBOOK CARDS ENGINE ---
    async function loadAndRenderCards() {
        if (typeof getLiveStartupData !== "function") {
            setTimeout(loadAndRenderCards, 250);
            return;
        }

        try {
            const cases = await getLiveStartupData();
            if (cases && cases.length > 0) {
                container.innerHTML = ""; // Clear dynamic spinner

                cases.forEach(item => {
                    const card = document.createElement("div");
                    
                    // Unified horizontal swiper configurations
                    card.className = "w-[85vw] sm:w-[350px] md:w-auto flex-shrink-0 snap-start bg-[#0f0a1e] rounded-2xl border border-white/5 overflow-hidden flex flex-col cursor-pointer transition-all duration-300 sexy-glowing-card group";
                    
                    const imageUrl = item.imageUrl && item.imageUrl.trim() !== "" ? item.imageUrl : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";

                    // Dynamic badge rendering block
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

                    // Instant company.html redirect routing
                    card.onclick = () => {
                        window.location.href = `company.html?id=${encodeURIComponent(item.id)}`;
                    };

                    container.appendChild(card);
                });

                // Instantly sync UI Enhancer classes
                if (window.enhanceDOMElements) window.enhanceDOMElements();

            } else {
                container.innerHTML = `<div class="col-span-full text-center py-12 text-sm font-mono text-neutral-400 w-full">No breakdowns found in dynamic sheet.</div>`;
            }
        } catch (error) {
            console.error("Error drawing cases board:", error);
            container.innerHTML = `<div class="col-span-full text-center py-12 text-sm font-mono text-red-400 w-full">Connection delay. Refreshing engine...</div>`;
        }
    }

    // Dynamic Client Search Filter Hook
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

    // Run Cards Renderer
    loadAndRenderCards();
});