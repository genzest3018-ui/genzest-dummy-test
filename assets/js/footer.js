// ==========================================
// BLOCK: SHARED FOOTER COMPONENT
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const footerSlot = document.getElementById("footer-component");
    if (footerSlot) {
        footerSlot.innerHTML = `
        <footer class="border-t border-[#1A1A24] bg-[#030305] py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[#8E9AA8] text-xs">
                <p>&copy; 2026 GENZEST Lab. Built completely without complex backend databases.</p>
                <div class="flex space-x-6 mt-4 sm:mt-0">
                    <a href="sitemap.xml" class="hover:text-white transition">Sitemap</a>
                    <a href="robots.txt" class="hover:text-white transition">Robots</a>
                </div>
            </div>
        </footer>
        `;
    }
});
