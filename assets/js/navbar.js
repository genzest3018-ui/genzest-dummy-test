// ========================================================
// CORE THEME ENGINE & SIDEBAR CONSOLE (V5.1 - WITH FOOTER FIX)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    const navbarSlot = document.getElementById("navbar-component");
    if (!navbarSlot) return;

    const savedTheme = localStorage.getItem("genzest-theme") || "dark";
    applyInstantTheme(savedTheme);

    navbarSlot.innerHTML = `
    <!-- MAIN NAVBAR TRACK -->
    <header class="sticky top-0 z-40 w-full border-b transition-colors duration-200 theme-bg theme-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="index.html" class="flex items-center space-x-3 group">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#DB2777] flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <span class="text-lg filter drop-shadow">⚡</span>
                </div>
                <div>
                    <span class="text-sm font-extrabold tracking-tight sm:text-lg theme-text">GENZEST</span>
                </div>
            </a>
            
            <div class="flex items-center space-x-4">
                <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-medium bg-emerald-500/10 text-[#10B981] border border-emerald-500/20">
                    <span class="w-1.5 h-1.5 mr-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                    Live
                </span>
                <button id="drawer-menu-open-btn" class="w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 theme-card theme-border">
                    <svg class="w-5 h-5 theme-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
        </div>
    </header>

    <!-- DRAWER OVERLAY -->
    <div id="app-drawer-overlay" class="fixed inset-0 z-50 bg-black/60 opacity-0 pointer-events-none transition-opacity duration-300 backdrop-blur-sm"></div>
    
    <!-- DRAWER SHEET CONTAINER -->
    <div id="app-drawer" class="fixed top-0 right-0 z-50 h-full w-[280px] sm:w-[325px] border-l transform translate-x-full transition-transform duration-300 ease-in-out p-6 flex flex-col justify-between shadow-2xl theme-card theme-border">
        <div>
            <div class="flex items-center justify-between pb-6 border-b theme-border">
                <span class="text-sm font-mono uppercase tracking-widest font-bold theme-text">App Menu</span>
                <button id="drawer-menu-close-btn" class="w-8 h-8 flex items-center justify-center rounded-lg transition text-neutral-400 hover:bg-neutral-800">
                    <svg class="w-4 h-4 theme-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <nav class="mt-8 space-y-4">
                <p class="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Navigation</p>
                <a href="index.html" class="block text-sm font-medium theme-text hover:text-purple-400 transition">&bull; Business Breakdowns</a>
                <a href="about.html" class="block text-sm font-medium theme-text hover:text-purple-400 transition">&bull; About Us</a>
                <p class="text-[10px] font-mono tracking-widest uppercase text-neutral-400 pt-4">Legal Framework</p>
                <a href="disclaimer.html" class="block text-xs font-medium theme-text hover:text-pink-400 transition">&bull; Disclaimer Statement</a>
                <a href="privacy.html" class="block text-xs font-medium theme-text hover:text-pink-400 transition">&bull; Privacy Policy</a>
            </nav>
        </div>

        <div class="border-t pt-6 theme-border">
            <p class="text-[10px] font-mono tracking-widest uppercase mb-3 text-neutral-400">Select System Theme</p>
            <div class="grid grid-cols-3 gap-2">
                <button data-set-theme="dark" class="text-[11px] font-bold py-2 px-1 rounded-xl border border-neutral-800 bg-[#050508] text-white">Dark</button>
                <button data-set-theme="light" class="text-[11px] font-bold py-2 px-1 rounded-xl border border-neutral-200 bg-white text-black">Light</button>
                <button data-set-theme="eyecare" class="text-[11px] font-bold py-2 px-1 rounded-xl border border-amber-900/40 bg-[#1C1814] text-[#E6D7C3]">Eye Care</button>
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
        let bg, card, border, text, muted;
        if (theme === "light") {
            bg = "#F3F4F6"; card = "#FFFFFF"; border = "#E5E7EB"; text = "#111827"; muted = "#4B5563";
        } else if (theme === "eyecare") {
            bg = "#12100E"; card = "#1C1814"; border = "#2C241E"; text = "#E6D7C3"; muted = "#968574";
        } else {
            bg = "#050508"; card = "#0B0B0F"; border = "#1A1A24"; text = "#ffffff"; muted = "#8E9AA8";
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
            h1, h2, h3, h4, h5, h6, .theme-text, a, span { color: ${text} !important; }
            p, .theme-muted { color: ${muted} !important; }
            .theme-bg { background-color: ${bg} !important; }
            .theme-card, .clean-border-card { background-color: ${card} !important; }
            .theme-border, .clean-border-card { border-color: ${border} !important; }
            footer { background-color: ${card} !important; border-color: ${border} !important; }
            #search-bar, #newsletter-email { background-color: ${bg} !important; border-color: ${border} !important; color: ${text} !important; }
        `;
    }
});
