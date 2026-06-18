// ========================================================
// RE-ENGINEERED ELITE HYPEBEAST UI CONSOLE ENGINE (V6.0)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    const navbarSlot = document.getElementById("navbar-component");
    if (!navbarSlot) return;

    const savedTheme = localStorage.getItem("genzest-theme") || "dark";
    applyInstantTheme(savedTheme);

    navbarSlot.innerHTML = `
    <header class="sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-all duration-300" style="background: rgba(7, 5, 12, 0.7); border-color: var(--border-master);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="index.html" class="flex items-center space-x-3 group">
                <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9333EA] to-[#EC4899] flex items-center justify-center shadow-lg shadow-purple-500/20 transform group-hover:rotate-6 transition-all duration-300">
                    <span class="text-xl filter drop-shadow">⚡</span>
                </div>
                <div>
                    <span class="text-base font-black tracking-tight theme-text font-['Space+Grotesk']">GENZEST</span>
                </div>
            </a>
            
            <div class="flex items-center space-x-4">
                <span class="inline-flex items-center px-2.5 py-1 rounded-xl text-[10px] font-bold bg-purple-500/10 text-[#A855F7] border border-purple-500/20 uppercase tracking-widest">
                    <span class="w-1.5 h-1.5 mr-1.5 rounded-full bg-[#A855F7] animate-pulse"></span>
                    Console v2
                </span>
                <button id="drawer-menu-open-btn" class="w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 theme-card theme-border hover:border-purple-500/40">
                    <svg class="w-5 h-5 theme-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
        </div>
    </header>

    <div id="app-drawer-overlay" class="fixed inset-0 z-50 bg-black/70 opacity-0 pointer-events-none transition-opacity duration-300 backdrop-blur-md"></div>
    
    <div id="app-drawer" class="fixed top-0 right-0 z-50 h-full w-[290px] sm:w-[340px] border-l transform translate-x-full transition-transform duration-300 ease-in-out p-6 flex flex-col justify-between shadow-2xl theme-card theme-border">
        <div>
            <div class="flex items-center justify-between pb-6 border-b theme-border">
                <span class="text-xs font-mono uppercase tracking-widest font-bold text-neutral-400">Navigation Terminal</span>
                <button id="drawer-menu-close-btn" class="w-8 h-8 flex items-center justify-center rounded-xl border theme-border theme-text hover:bg-neutral-800/40 transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <nav class="mt-8 space-y-3">
                <a href="index.html" class="flex items-center space-x-2 text-sm font-semibold p-3 rounded-xl hover:bg-purple-500/10 theme-text transition">&bull; <span>Business Breakdowns</span></a>
                <a href="about.html" class="flex items-center space-x-2 text-sm font-semibold p-3 rounded-xl hover:bg-purple-500/10 theme-text transition">&bull; <span>About Console</span></a>
                <p class="text-[10px] font-mono tracking-widest uppercase text-neutral-500 pt-6 px-3">Compliance Framework</p>
                <a href="disclaimer.html" class="block text-xs font-medium p-3 rounded-xl text-neutral-400 hover:text-white transition">&bull; Disclaimer Statement</a>
                <a href="privacy.html" class="block text-xs font-medium p-3 rounded-xl text-neutral-400 hover:text-white transition">&bull; Privacy Core Policy</a>
            </nav>
        </div>

        <div class="border-t pt-6 theme-border">
            <p class="text-[10px] font-mono tracking-widest uppercase mb-3 text-neutral-400 px-1">System Interface Style</p>
            <div class="grid grid-cols-3 gap-2">
                <button data-set-theme="dark" class="text-[11px] font-bold py-2.5 rounded-xl border border-purple-500/20 bg-[#07050C] text-white hover:border-purple-500/60 transition">Dark</button>
                <button data-set-theme="light" class="text-[11px] font-bold py-2.5 rounded-xl border border-neutral-200 bg-white text-black hover:border-neutral-400 transition">Light</button>
                <button data-set-theme="eyecare" class="text-[11px] font-bold py-2.5 rounded-xl border border-amber-900/30 bg-[#14110F] text-[#F4EFEA] hover:border-amber-700 transition">Amber</button>
            </div>
        </div>
    </div>
    `;

    const openBtn = document.getElementById("drawer-menu-open-btn");
    const closeBtn = document.getElementById("drawer-menu-close-btn");
    const overlay = document.getElementById("app-drawer-overlay");
    const drawer = document.getElementById("app-drawer");

    if (openBtn) openBtn.onclick = () => { drawer.classList.remove("translate-x-full"); overlay.classList.remove("opacity-0", "pointer-events-none"); };
    if (closeBtn) closeBtn.onclick = () => { drawer.classList.add("translate-x-full"); overlay.classList.add("opacity-0", "pointer-events-none"); };
    if (overlay) overlay.onclick = () => { drawer.classList.add("translate-x-full"); overlay.classList.add("opacity-0", "pointer-events-none"); };

    const themeButtons = document.querySelectorAll("[data-set-theme]");
    themeButtons.forEach(btn => {
        btn.onclick = function() {
            const chosenTheme = this.getAttribute("data-set-theme");
            applyInstantTheme(chosenTheme);
            localStorage.setItem("genzest-theme", chosenTheme);
        };
    });

    function applyInstantTheme(theme) {
        let bg, card, border, text, muted, headerBg;
        if (theme === "light") {
            bg = "#F8FAFC"; card = "rgba(255, 255, 255, 0.85)"; border = "rgba(148, 163, 184, 0.16)"; text = "#0F172A"; muted = "#64748B"; headerBg = "rgba(248, 250, 252, 0.8)";
        } else if (theme === "eyecare") {
            bg = "#14110F"; card = "rgba(34, 27, 24, 0.85)"; border = "rgba(217, 119, 6, 0.15)"; text = "#F4EFEA"; muted = "#A19181"; headerBg = "rgba(20, 17, 15, 0.8)";
        } else {
            bg = "#07050C"; card = "rgba(20, 15, 38, 0.6)"; border = "rgba(147, 51, 234, 0.15)"; text = "#FFFFFF"; muted = "#94A3B8"; headerBg = "rgba(7, 5, 12, 0.8)";
        }

        document.body.style.backgroundColor = bg;
        document.body.style.color = text;

        const styleId = "dynamic-theme-override-tag";
        let styleTag = document.getElementById(styleId);
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = styleId;
            document.head.appendChild(styleTag);
        }
        styleTag.innerHTML = `
            body, html { background-color: ${bg} !important; color: ${text} !important; }
            h1, h2, h3, h4, h5, h6, .theme-text { color: ${text} !important; }
            p, .theme-muted { color: ${muted} !important; }
            header { background: ${headerBg} !important; border-color: ${border} !important; }
            .theme-bg { background-color: ${bg} !important; }
            .theme-card, .clean-border-card { background: ${card} !important; border-color: ${border} !important; }
            .theme-border { border-color: ${border} !important; }
            footer { background: ${card} !important; border-color: ${border} !important; }
            #search-bar, #newsletter-email { background: ${card} !important; border-color: ${border} !important; color: ${text} !important; }
        `;
    }
});