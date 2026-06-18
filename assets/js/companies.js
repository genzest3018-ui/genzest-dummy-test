// ========================================================
// RE-ENGINEERED ELITE CARDS RENDER ENGINE (V4.5 - BULLETPROOF)
// ========================================================

document.addEventListener("DOMContentLoaded", async function() {
    const grid = document.getElementById('case-studies-grid') || document.getElementById('cases-container');
    const loader = document.getElementById('loader-panel') || document.getElementById('loading-spinner');
    const searchInput = document.getElementById('search-bar') || document.getElementById('search-input');
    
    if (!grid) return;

    // Mobile horizontal flex swipe aur Desktop high-signal dynamic grid layouts
    grid.className = "flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:grid-cols-3 gap-6 pb-6 scroll-smooth scrollbar-none";

    if (loader) loader.classList.remove('hidden');

    // Sheet-api se real-time data collect karenge
    const activeCaseStudies = await getLiveStartupData();

    if (loader) loader.classList.add('hidden');

    function renderSheetCards(data) {
        grid.innerHTML = "";
        
        if (data.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full w-full text-center py-12 border rounded-2xl theme-card theme-border">
                    <p class="theme-muted text-sm font-mono">Bhai, matches nahi mile Sheet database mein!</p>
                </div>
            `;
            return;
        }

        data.forEach((item) => {
            if (!item || !item.id) return;
            const card = document.createElement('div');
            card.className = "min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center clean-border-card cursor-pointer flex flex-col justify-between overflow-hidden group sexy-glowing-card";
            
            // Forces absolute lowercase redirect path to company.html
            const safeId = item.id.trim().toLowerCase();
            card.onclick = () => {
                window.location.href = `company.html?id=${safeId}`;
            };

            // PREMIUM GLASS BANNER WITH GRADIENT AND LARGE IMAGES
            card.innerHTML = `
                <!-- 1. BIG GLOWING BANNER IMAGE SLOT -->
                ${item.imageUrl ? `
                <div class="w-full h-48 bg-[#050508]/40 border-b theme-border overflow-hidden relative">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#07050C] via-transparent to-transparent opacity-60 z-10"></div>
                    <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0" onerror="this.parentElement.style.display='none';">
                </div>
                ` : ''}

                <!-- 2. CARD CONTENT PADDING BOX -->
                <div class="p-6 flex-grow flex flex-col justify-between relative z-10">
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <!-- Premium Cyber Pill Tag -->
                            <span class="text-[9px] font-mono uppercase tracking-widest text-[#A855F7] bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">${item.industry || 'Startup'}</span>
                            <span class="text-xs text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">&rarr;</span>
                        </div>
                        <h3 class="text-xl font-bold tracking-tight mb-2 font-['Space_Grotesk'] theme-text vibrant-card-title">${item.title}</h3>
                        <p class="text-xs sm:text-sm theme-muted mt-2 line-clamp-3 leading-relaxed vibrant-card-desc">${item.hook}</p>
                    </div>
                    
                    <!-- Footer Link Box -->
                    <div class="border-t theme-border mt-6 pt-4 flex items-center justify-between text-xs theme-muted">
                        <span class="text-[10px] font-mono tracking-widest uppercase text-neutral-400 vibrant-card-link">Read Full Playbook</span>
                        <div class="w-2 h-2 rounded-full bg-[#10B981] shadow-lg shadow-emerald-500/50 animate-pulse"></div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        addSwipeIndicator(data.length);
    }

    function addSwipeIndicator(itemsCount) {
        let indicatorContainer = document.getElementById('carousel-indicator');
        if (!indicatorContainer) {
            indicatorContainer = document.createElement('div');
            indicatorContainer.id = 'carousel-indicator';
            indicatorContainer.className = "flex md:hidden items-center justify-center space-x-2 mt-4 text-xs theme-text";
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

    renderSheetCards(activeCaseStudies);

    if (searchInput) {
        searchInput.oninput = function() {
            const query = searchInput.value.toLowerCase().trim();
            const filtered = activeCaseStudies.filter(item => {
                return (item.title && item.title.toLowerCase().includes(query)) || 
                       (item.hook && item.hook.toLowerCase().includes(query)) || 
                       (item.industry && item.industry.toLowerCase().includes(query));
            });
            renderSheetCards(filtered);
        };
    }
});