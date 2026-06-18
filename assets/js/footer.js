// ==========================================
// BLOCK: FIXED PROFESSIONAL FOOTER
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const footerSlot = document.getElementById("footer-component");
    if (footerSlot) {
        footerSlot.innerHTML = `
        <footer class="border-t border-[#1A1A24] bg-[#030305] pt-12 pb-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-[#1A1A24]/60">
                    <div>
                        <h4 class="text-xs font-mono uppercase tracking-widest text-[#7C3AED] mb-4">Platform</h4>
                        <ul class="space-y-2 text-xs text-[#8E9AA8]">
                            <li><a href="index.html" class="hover:text-white transition">Business Breakdowns</a></li>
                            <li><a href="about.html" class="hover:text-white transition">About Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-xs font-mono uppercase tracking-widest text-[#DB2777] mb-4">Legal & Trust</h4>
                        <ul class="space-y-2 text-xs text-[#8E9AA8]">
                            <li><a href="disclaimer.html" class="hover:text-white transition">Disclaimer</a></li>
                            <li><a href="privacy.html" class="hover:text-white transition">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-xs font-mono uppercase tracking-widest text-[#10B981] mb-4">Technical</h4>
                        <ul class="space-y-2 text-xs text-[#8E9AA8]">
                            <li><a href="sitemap.xml" class="hover:text-white transition">Sitemap</a></li>
                            <li><a href="robots.txt" class="hover:text-white transition">Robots.txt</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-xs font-mono uppercase tracking-widest text-white mb-4">Contact</h4>
                        <p class="text-xs text-[#8E9AA8] leading-relaxed">Sponsorships & Queries:<br><span class="text-white font-medium">hey@genzest.com</span></p>
                    </div>
                </div>

                <div class="pt-6 flex flex-col sm:flex-row items-center justify-between text-[#8E9AA8] text-[11px] gap-4 text-center sm:text-left">
                    <p>&copy; 2026 GENZEST Lab. Built with clean sheets & 0% manual database maintenance.</p>
                    <p class="text-[10px] font-mono text-[#7C3AED]">Arbitrage Growth Engine v1.1</p>
                </div>
            </div>
        </footer>
        `;
    }
});