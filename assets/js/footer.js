// ========================================================
// GENZEST DYNAMIC FOOTER COMPONENT (V3.1 - SEO & THEME SAFE)
// ========================================================

document.addEventListener("DOMContentLoaded", function() {
    const footerMountNode = document.getElementById("footer-component");
    if (!footerMountNode) return;

    // 1. PREMIUM SEO DEFAULT FALLBACKS
    let copyrightText = "© 2026 GENZEST | Decoding Startup Business Models";
    let contactEmail = "genzest3018@gmail.com";

    // 2. DYNAMICALLY RENDER FOOTER LAYOUT
    function drawFooter(copyright, email) {
        footerMountNode.innerHTML = `
            <footer class="w-full mt-auto border-t border-[var(--border-color)] bg-[var(--card-bg)] py-12 px-4 transition-all duration-300">
                <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-left">
                    
                    <!-- COLUMN 1: PLATFORM LINKS -->
                    <div>
                        <h4 class="text-xs font-bold tracking-widest text-[#A855F7] uppercase mb-4">PLATFORM</h4>
                        <ul class="space-y-2.5 text-xs font-semibold text-[var(--text-secondary)]">
                            <li><a href="index.html" class="hover:text-[#00FFFF] transition">&bull; Business Breakdowns</a></li>
                            <li><a href="about.html" class="hover:text-[#00FFFF] transition">&bull; About Us</a></li>
                        </ul>
                    </div>

                    <!-- COLUMN 2: LEGAL LINKS -->
                    <div>
                        <h4 class="text-xs font-bold tracking-widest text-[#FF2E93] uppercase mb-4">LEGAL & TRUST</h4>
                        <ul class="space-y-2.5 text-xs font-semibold text-[var(--text-secondary)]">
                            <li><a href="disclaimer.html" class="hover:text-[#FF2E93] transition">&bull; Disclaimer</a></li>
                            <li><a href="privacy.html" class="hover:text-[#FF2E93] transition">&bull; Privacy Policy</a></li>
                        </ul>
                    </div>

                    <!-- COLUMN 3: TECHNICAL LINKS -->
                    <div>
                        <h4 class="text-xs font-bold tracking-widest text-[#00FFFF] uppercase mb-4">TECHNICAL</h4>
                        <ul class="space-y-2.5 text-xs font-semibold text-[var(--text-secondary)]">
                            <li><a href="sitemap.xml" class="hover:text-[#00FFFF] transition">&bull; Sitemap</a></li>
                            <li><a href="robots.txt" class="hover:text-[#00FFFF] transition">&bull; Robots.txt</a></li>
                        </ul>
                    </div>

                    <!-- COLUMN 4: CONTACT INFO -->
                    <div>
                        <h4 class="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-4">CONTACT</h4>
                        <div class="space-y-2 text-xs font-semibold text-[var(--text-secondary)]">
                            <p class="text-[10px] text-neutral-400">Sponsorships & Queries:</p>
                            <!-- Fixed dynamic class target for bulletproof contrast -->
                            <a href="mailto:${email}" class="block footer-email-link transition font-bold truncate">
                                ${email}
                            </a>
                        </div>
                    </div>

                </div>

                <!-- BOTTOM SIGNATURE BLOCK (SEO BOOM) -->
                <div class="max-w-7xl mx-auto pt-8 border-t border-[var(--border-color)]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
                    <span class="text-xs font-medium text-[var(--text-secondary)]">
                        ${copyright}
                    </span>
                    <span class="text-[10px] font-mono tracking-widest text-[#A855F7]/85 uppercase">
                        Startup Case Studies & Marketing Moats
                    </span>
                </div>
            </footer>
        `;
    }

    // Initial draw
    drawFooter(copyrightText, contactEmail);

    // 3. FETCH VALUES FROM GOOGLE SHEET
    async function syncFooterWithSheet() {
        if (typeof getLiveLayoutConfigs !== "function") {
            setTimeout(syncFooterWithSheet, 200);
            return;
        }

        try {
            const layoutConfigs = await getLiveLayoutConfigs();
            if (layoutConfigs && layoutConfigs.length > 0) {
                const copyrightConfig = layoutConfigs.find(c => c.key === "footer_copyright" || c.key === "footer-copyright");
                const emailConfig = layoutConfigs.find(c => c.key === "contact_email" || c.key === "contact-email");

                if (copyrightConfig && copyrightConfig.value) {
                    copyrightText = copyrightConfig.value.trim();
                }
                if (emailConfig && emailConfig.value) {
                    contactEmail = emailConfig.value.trim();
                }

                drawFooter(copyrightText, contactEmail);
            }
        } catch (error) {
            console.warn("Footer API sync bypassed, running safe backup values.");
        }
    }

    syncFooterWithSheet();
});