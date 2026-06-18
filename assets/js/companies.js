// ========================================================
// CAROUSEL CARDS GENERATION & MOBILE LEFT-RIGHT SNAP ENGINE
// ========================================================

document.addEventListener("DOMContentLoaded", async function() {
    const grid = document.getElementById('case-studies-grid');
    const loader = document.getElementById('loader-panel');
    const searchInput = document.getElementById('search-bar');
    
    if (!grid) return;

    // Mobile par automatic horizontal flex swipe aur desktop par auto responsive Grid!
    grid.className = "flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:grid-cols-3 gap-6 pb-6 scroll-smooth scrollbar-none";

    // Dynamic database loader activate
    if (loader) loader.classList.remove('hidden');

    // Get live data from sheet-api.js core
    const activeCaseStudies = await getLiveStartupData();

    if (loader) loader.classList.add('hidden');

    // Master Render function
    function renderSheetCards(data) {
        grid.innerHTML = "";
        
        if (data.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full w-full text-center py-12 border border-[#1A1A24] rounded-2xl bg-[#0B0B0F]">
                    <p class="text-[#8E9AA8] text-sm">Google Sheet mein koi matching record nahi mila bhai.</p>
                </div>
            `;
            return;
        }

        data.forEach((item) => {
            const card = document.createElement('div');
            // 'snap-center' se element swipe hoke screen ke center mein lock ho jata hai
            card.className = "min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center bg-[#0B0B0F] rounded-2xl p-6 cursor-pointer flex flex-col justify-between hover:shadow-xl clean-border-card";
            
            card.onclick = () => {
                window.location.href = `company.html?id=${item.id}`;
            };

            card.innerHTML = `
                <div>
                    <div class="flex items-center justify-between mb-5">
                        <span class="text-[10px] font-mono uppercase tracking-widest text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded-md">${item.industry}</span>
                        <span class="text-xs text-[#8E9AA8] hover:text-white transition-colors duration-200">&rarr;</span>
                    </div>
                    
                    <!-- Logo rendering only if Image URL is provided in Sheet (Column I) -->
                    ${item.imageUrl ? `
                    <div class="w-14 h-14 rounded-2xl bg-[#050508] border border-[#1A1A24] mb-5 overflow-hidden flex items-center justify-center p-3">
                        <img src="${item.imageUrl}" alt="${item.title}" class="max-w-full max-h-full object-contain">
                    </div>
                    ` : ''}

                    <h3 class="text-lg font-bold text-white">${item.title}</h3>
                    <p class="text-xs sm:text-sm text-[#8E9AA8] mt-3 line-clamp-3 leading-relaxed">${item.hook}</p>
                </div>
                
                <div class="border-t border-[#1A1A24]/60 mt-6 pt-4 flex items-center justify-between text-xs text-[#8E9AA8]">
                    <span class="text-[10px] sm:text-xs">Read Full Playbook</span>
                    <div class="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                </div>
            `;
            grid.appendChild(card);
        });

        // Setup the swiper layout guidelines below cards
        addSwipeIndicator(data.length);
    }

    // Dynamic mobile hints builder
    function addSwipeIndicator(itemsCount) {
        let indicatorContainer = document.getElementById('carousel-indicator');
        if (!indicatorContainer) {
            indicatorContainer = document.createElement('div');
            indicatorContainer.id = 'carousel-indicator';
            indicatorContainer.className = "flex md:hidden items-center justify-center space-x-2 mt-4 text-xs text-[#8E9AA8]";
            grid.parentNode.insertBefore(indicatorContainer, grid.nextSibling);
        }

        if (itemsCount <= 1) {
            indicatorContainer.innerHTML = "";
            return;
        }

        indicatorContainer.innerHTML = `
            <span class="swipe-pulse text-[10px] font-mono tracking-widest uppercase text-purple-400">Swipe Left-Right &larr; &rarr;</span>
        `;
    }

    // Initialize display rendering
    renderSheetCards(activeCaseStudies);

    // Search action binding
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