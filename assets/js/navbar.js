// ========================================================
// UPGRADED APP-STYLE MENU NAV ENGINE WITH 3 THEMES (V3.1)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    const navbarSlot = document.getElementById("navbar-component");
    if (!navbarSlot) return;

    // Check saved theme local cache selection or set dark default
    const savedTheme = localStorage.getItem("genzest-theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);

    navbarSlot.innerHTML = `
    <!-- MAIN COMPACT HEADER TRACK -->
    <header class="sticky top-0 z-40 w-full border-b border-[#1A1A24] bg-[#050508]/80 backdrop-blur-md transition-colors duration-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            <!-- Logo Section with Thunder ⚡ Icon -->
            <a href="index.html" class="flex items-center space-x-3 group">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#DB2777] flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <span class="text-lg filter drop-shadow">⚡</span>
                </div>
                <div>
                    <span class="text-sm font-extrabold tracking-tight sm:text-lg">GENZEST</span>
                </div>
            </a>
            
            <!-- Dynamic Right Side Controllers Trigger -->
            <div class="flex items-center space-x-4">
                <!-- Live Pulse Indicator Badge -->
                <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-medium bg-emerald-500/10 text-[#10B981] border border-emerald-500/20">
                    <span class="w-1.5 h-1.5 mr-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                    Live
                </span>

                <!-- Hamburger Application Trigger Box Menu Button -->
                <button id="drawer-menu-open-btn" class="w-9 h-9 flex items-center justify-center rounded-xl bg-[#0B0B0F] border border-[#1A1A24] hover:border-purple-500 transition-all duration-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
        </div>
    </header>

    <!-- RIGHT SLIDING APP-DRAWER OVERLAY WRAPPER -->
    <div id="app-drawer-overlay" class="fixed inset-0 z-50 bg-black/60 opacity-0 pointer-events-none transition-opacity duration-300 backdrop-blur-sm"></div>
    
    <div id="app-drawer" class="fixed top-0 right-0 z-50 h-full w-[280px] sm:w-[325px] bg-[#0B0B0F] border-l border-[#1A1A24] transform translate-x-full transition-transform duration-300 ease-in-out p-6 flex flex-col justify-between shadow-2xl">
        <div>
            <!-- Close Layout Action Box Header -->
            <div class="flex items-center justify-between pb-6 border-b border-[#1A1A24]">
                <div class="flex items-center space-x-2">
                    <span class="text-sm font-mono uppercase tracking-widest text-purple-400 font-bold">App Menu</span>
                </div>
                <button id="drawer-menu-close-btn" class="w-8 h-8 flex items-center justify-center rounded-lg text-[#8E9AA8] hover:bg-[#1A1A24] transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <!-- Consolidated Platform Navigation Lists -->
            <nav class="mt-8 space-y-4">
                <p class="text-[10px] font-mono tracking-widest uppercase text-[#8E9AA8]">Navigation</p>
                <a href="index.html" class="block text-sm font-medium hover:text-purple-400 transition">&bull; Business Breakdowns</a>
                <a href="about.html" class="block text-sm font-medium hover:text-purple-400 transition">&bull; About Us</a>
                
                <p class="text-[10px] font-mono tracking-widest uppercase text-[#8E9AA8] pt-4">Legal Framework</p>
                <a href="disclaimer.html" class="block text-xs font-medium hover:text-pink-400 transition">&bull; Disclaimer Statement</a>
                <a href="privacy.html" class="block text-xs font-medium hover:text-pink-400 transition">&bull; Privacy Policy</a>
            </nav>
        </div>

        <!-- THEME SELECTION PANEL IN ENGINE BASE -->
        <div class="border-t border-[#1A1A24] pt-6">
            <p class="text-[10px] font-mono tracking-widest uppercase text-[#8E9AA8] mb-3">Select System Theme</p>
            <div class="grid grid-cols-3 gap-2">
                <!-- Theme Buttons -->
                <button data-set-theme="dark" class="text-[11px] font-bold py-2 px-1 rounded-xl border border-[#1A1A24] bg-[#050508] text-white transition">Dark</button>
                <button data-set-theme="light" class="text-[11px] font-bold py-2 px-1 rounded-xl border border-gray-300 bg-white text-gray-900 transition">Light</button>
                <button data-set-theme="eyecare" class="text-[11px] font-bold py-2 px-1 rounded-xl border border-[#2C241E] bg-[#292524] text-[#F5F5F4] transition">Eye Care</button>
            </div>
            <p class="text-[9px] text-[#8E9AA8] mt-4 font-mono text-center">GENZEST Lab Client Profile</p>
        </div>
    </div>
    `;

    // Dynamic Elements Access Setup pointers
    const openBtn = document.getElementById("drawer-menu-open-btn");
    const closeBtn = document.getElementById("drawer-menu-close-btn");
    const overlay = document.getElementById("app-drawer-overlay");
    const drawer = document.getElementById("app-drawer");

    function openDrawer() {
        drawer.classList.remove("translate-x-full");
        overlay.classList.remove("opacity-0", "pointer-events-none");
    }

    function closeDrawer() {
        drawer.classList.add("translate-x-full");
        overlay.classList.add("opacity-0", "pointer-events-none");
    }

    if (openBtn) openBtn.onclick = openDrawer;
    if (closeBtn) closeBtn.onclick = closeDrawer;
    if (overlay) overlay.onclick = closeDrawer;

    // Theme Switch Binding Loop Events
    const themeButtons = document.querySelectorAll("[data-set-theme]");
    themeButtons.forEach(btn => {
        btn.onclick = function() {
            const chosenTheme = this.getAttribute("data-set-theme");
            document.documentElement.setAttribute("data-theme", chosenTheme);
            localStorage.setItem("genzest-theme", chosenTheme);
        };
    });
});
