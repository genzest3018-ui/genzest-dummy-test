// ==========================================
// BLOCK: UPGRADED PREMIUM NAVBAR COMPONENT
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const navbarSlot = document.getElementById("navbar-component");
    if (navbarSlot) {
        navbarSlot.innerHTML = `
        <header class="sticky top-0 z-40 w-full border-b border-[#1A1A24] bg-[#050508]/80 backdrop-blur-md">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <a href="index.html" class="flex items-center space-x-3 group">
                    <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#DB2777] flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <span class="font-extrabold text-base text-white">G</span>
                    </div>
                    <div>
                        <span class="text-sm font-extrabold tracking-tight text-white sm:text-lg">GENZEST</span>
                    </div>
                </a>
                
                <nav class="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm font-medium text-[#8E9AA8]">
                    <a href="index.html" class="hover:text-white transition">Home</a>
                    <a href="about.html" class="hover:text-white transition">About</a>
                </nav>

                <div class="flex items-center">
                    <span class="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium bg-emerald-500/10 text-[#10B981] border border-emerald-500/20">
                        <span class="w-1.5 h-1.5 mr-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                        Live
                    </span>
                </div>
            </div>
        </header>
        `;
    }
});