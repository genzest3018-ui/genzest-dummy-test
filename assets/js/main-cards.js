document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("cases-container");
    if (!container) return;

    async function loadAndRenderCards() {
        if (typeof getLiveStartupData !== "function") { setTimeout(loadAndRenderCards, 250); return; }
        const cases = await getLiveStartupData();
        container.innerHTML = "";
        
        cases.forEach(item => {
            if (!item.id) return;
            const card = document.createElement("div");
            card.className = "min-w-[85vw] md:min-w-0 snap-center p-6 rounded-2xl border border-white/5 bg-[#0f0a1e] cursor-pointer";
            card.innerHTML = `<h3 class="font-bold">${item.title}</h3><p class="text-xs mt-2">${item.hook}</p>`;
            
            // REDIRECT KO ABSOLUTE PATH DIYA HAI
            card.onclick = () => {
                window.location.href = `/company.html?id=${encodeURIComponent(item.id.toLowerCase())}`;
            };
            container.appendChild(card);
        });
    }
    loadAndRenderCards();
});
