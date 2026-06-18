// ==========================================
// CORE LAYOUT GENERATION & INTERACTION
// ==========================================

document.addEventListener("DOMContentLoaded", async function() {
    const grid = document.getElementById('case-studies-grid');
    const loader = document.getElementById('loader-panel');
    const searchInput = document.getElementById('search-bar');
    
    if (!grid) return;

    // Loader activate karo jab tak sheets data fetch ho raha ho
    if (loader) loader.classList.remove('hidden');

    // sheet-api.js se live database data lena
    const activeCaseStudies = await getLiveStartupData();

    if (loader) loader.classList.add('hidden');

    // UI Cards Render karne ka logic (Bina kisi dummy content ke)
    function renderSheetCards(data) {
        grid.innerHTML = "";
        
        if (data.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12 border border-[#1A1A24] rounded-2xl bg-[#0B0B0F]">
                    <p class="text-[#8E9AA8] text-sm">Google Sheet mein koi matching record nahi mila bhai.</p>
                </div>
            `;
            return;
        }

        data.forEach((item) => {
            const card = document.createElement('div');
            card.className = "group relative bg-[#0B0B0F] border border-[#1A1A24] rounded-2xl p-6 hover:border-[#7C3AED]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-purple-500/5 card-transition premium-glow";
            
            // Dynamic routing placeholder link structure
            card.onclick = () => {
                window.location.href = `company.html?id=${item.id}`;
            };

            card.innerHTML = `
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-[10px] font-mono uppercase tracking-widest text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded-md">${item.industry}</span>
                        <span class="text-xs text-[#8E9AA8] group-hover:text-white transition-colors duration-200">View Blueprint &rarr;</span>
                    </div>
                    <h3 class="text-lg font-bold text-white group-hover:text-purple-300 transition-colors duration-200">${item.title}</h3>
                    <p class="text-sm text-[#8E9AA8] mt-3 line-clamp-3 leading-relaxed">${item.hook}</p>
                </div>
                <div class="border-t border-[#1A1A24]/60 mt-6 pt-4 flex items-center justify-between text-xs text-[#8E9AA8]">
                    <span>Read Full Playbook</span>
                    <div class="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Initial Trigger
    renderSheetCards(activeCaseStudies);

    // Live Instant Filtering Input Mechanism
    if (searchInput) {
        searchInput.oninput = function() {
            const query = searchInput.value.toLowerCase().trim();
            const filtered = activeCaseStudies.filter(item => {
                return item.title.toLowerCase().includes(query) || 
                       item.hook.toLowerCase().includes(query) || 
                       item.industry.toLowerCase().includes(query);
            });
            renderSheetCards(filtered);
        };
    }
});
