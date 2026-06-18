// ========================================================
// CORE SYSTEM: SIDEBAR NAVIGATION & THEME ENGINE (V3.3)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    const navbarSlot = document.getElementById("navbar-component");
    if (!navbarSlot) return;

    // Load and Apply saved theme immediately on render
    const savedTheme = localStorage.getItem("genzest-theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Inject dynamic clean header with no hardcoded Tailwind colors
    navbarSlot.innerHTML = `
    <!-- MAIN HEADER STRIP -->
    <header class="sticky top-0 z-40 w-full border-b transition-colors duration-200" style="background-color: var(--bg-master); border-color: var(--border-master);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            <!-- Logo Section with Thunder ⚡ Icon -->
            <a href="index.html" class="flex items-center space-x-3 group">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#DB2777] flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <span class="text-lg filter drop-shadow">⚡</span>
                </div>
                <div>
                    <span class="text-sm font-extrabold tracking-tight sm:text-lg" style="color: var(--text-main);">GENZEST</span>
                </div>
            </a>
            
            <!-- Dynamic Right Actions -->
            <div class="flex items-center space-x-4">
                <!-- Live Pulse Badge -->
                <span class="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-medium bg-emerald-500/10 text-[#10B981] border border-emerald-500/20">
                    <span class="w-1.5 h-1.5 mr-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                    Live
                </span>

                <!-- Hamburger Open Trigger Menu Button -->
                <button id="drawer-menu-open-btn" class="w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200" style="background-color: var(--bg-card); border-color: var(--border-master); color: var(--text-main);">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
        </div>
    </header>

    <!-- RIGHT SLIDING APP-DRAWER OVERLAY -->
    <div id="app-drawer-overlay" class="fixed inset-0 z-50 bg-black/60 opacity-0 pointer-events-none transition-opacity duration-300 backdrop-blur-sm"></div>
    
    <!-- APP DRAWER PANEL CONTAINER -->
    <div id="app-drawer" class="fixed top-0 right-0 z-50 h-full w-[280px] sm:w-[325px] border-l transform translate-x-full transition-transform duration-300 ease-in-out p-6 flex flex-col justify-between shadow-2xl" style="background-color: var(--bg-card); border-color: var(--border-master);">
        <div>
            <!-- Close Action Strip -->
            <div class="flex items-center justify-between pb-6 border-b" style="border-color: var(--border-master);">
                <div class="flex items-center space-x-2">
                    <span class="text-sm font-mono uppercase tracking-widest font-bold" style="color: var(--text-main);">App Menu</span>
                </div>
                <button id="drawer-menu-close-btn" class="w-8 h-8 flex items-center justify-center rounded-lg transition" style="color: var(--text-muted);">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <!-- Consolidated Platform Navigation Lists -->
            <nav class="mt-8 space-y-4">
                <p class="text-[10px] font-mono tracking-widest uppercase" style="color: var(--text-muted);">Navigation</p>
                <a href="index.html" class="block text-sm font-medium transition" style="color: var(--text-main);">&bull; Business Breakdowns</a>
                <a href="about.html" class="block text-sm font-medium transition" style="color: var(--text-main);">&bull; About Us</a>
                
                <p class="text-[10px] font-mono tracking-widest uppercase pt-4" style="color: var(--text-muted);">Legal Framework</p>
                <a href="disclaimer.html" class="block text-xs font-medium transition" style="color: var(--text-muted);">&bull; Disclaimer Statement</a>
                <a href="privacy.html" class="block text-xs font-medium transition" style="color: var(--text-muted);">&bull; Privacy Policy</a>
            </nav>
        </div>

        <!-- THEME SELECTION PANEL IN ENGINE BASE -->
        <div class="border-t pt-6" style="border-color: var(--border-master);">
            <p class="text-[10px] font-mono tracking-widest uppercase mb-3" style="color: var(--text-muted);">Select System Theme</p>
            <div class="grid grid-cols-3 gap-2">
                <!-- Core Buttons -->
                <button data-set-theme="dark" class="text-[11px] font-bold py-2 px-1 rounded-xl border transition" style="background-color: #050508; border-color: #1A1A24; color: #ffffff;">Dark</button>
                <button data-set-theme="light" class="text-[11px] font-bold py-2 px-1 rounded-xl border transition" style="background-color: #ffffff; border-color: #E5E7EB; color: #111827;">Light</button>
                <button data-set-theme="eyecare" class="text-[11px] font-bold py-2 px-1 rounded-xl border transition" style="background-color: #292524; border-color: #44403C; color: #F5F5F4;">Eye Care</button>
            </div>
            <p class="text-[9px] mt-4 font-mono text-center" style="color: var(--text-muted);">GENZEST Lab Client Profile</p>
        </div>
    </div>
    `;

    // Elements Access Setup pointers
    const openBtn = document.getElementById("drawer-menu-open-btn");
    const closeBtn = document.getElementById("drawer-menu-close-btn");
    const overlay = document.getElementById("app-drawer-overlay");
    const drawer = document.getElementById("app-drawer");

    function openDrawer() {
        if (drawer) drawer.classList.remove("translate-x-full");
        if (overlay) overlay.classList.remove("opacity-0", "pointer-events-none");
    }

    function closeDrawer() {
        if (drawer) drawer.classList.add("translate-x-full");
        if (overlay) overlay.classList.add("opacity-0", "pointer-events-none");
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