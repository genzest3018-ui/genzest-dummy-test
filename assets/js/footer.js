// ==========================================
// BLOCK: ULTRA-FAST INSTANT SYNC FOOTER (V4.5 - ZERO DELAY)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const footerSlot = document.getElementById("footer-component");
    if (!footerSlot) return;

    // PREMIUM DEFAULT DATA - No more "Syncing..." text blocks!
    const defaultEmail = "genzest3018@gmail.com";
    const defaultCopyright = "&copy; 2026 GENZEST Lab. Built with clean sheets & 0% manual database maintenance.";

    // 1. Instant Render: Bina kisi delay ke pehle tumhaara real Gmail screen par dikhao
    footerSlot.innerHTML = `
    <footer class="border-t theme-border pt-12 pb-8 transition-colors duration-200" style="background-color: var(--bg-card);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b theme-border">
                <div>
                    <h4 class="text-xs font-mono uppercase tracking-widest text-[#7C3AED] mb-4">Platform</h4>
                    <ul class="space-y-2 text-xs">
                        <li><a href="index.html" class="theme-text hover:opacity-80 transition">&bull; Business Breakdowns</a></li>
                        <li><a href="about.html" class="theme-text hover:opacity-80 transition">&bull; About Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-mono uppercase tracking-widest text-[#DB2777] mb-4">Legal & Trust</h4>
                    <ul class="space-y-2 text-xs">
                        <li><a href="disclaimer.html" class="theme-text hover:opacity-80 transition">&bull; Disclaimer</a></li>
                        <li><a href="privacy.html" class="theme-text hover:opacity-80 transition">&bull; Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-mono uppercase tracking-widest text-[#10B981] mb-4">Technical</h4>
                    <ul class="space-y-2 text-xs">
                        <li><a href="sitemap.xml" class="theme-text hover:opacity-80 transition">&bull; Sitemap</a></li>
                        <li><a href="robots.txt" class="theme-text hover:opacity-80 transition">&bull; Robots.txt</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-mono uppercase tracking-widest theme-text mb-4">Contact</h4>
                    <p class="text-xs theme-muted leading-relaxed">Sponsorships & Queries:<br>
                        <span id="dyn-contact-email" class="theme-text font-medium text-white">${defaultEmail}</span>
                    </p>
                </div>
            </div>

            <!-- Copyright Bottom Info -->
            <div class="pt-6 flex flex-col sm:flex-row items-center justify-between theme-muted text-[11px] gap-4 text-center sm:text-left">
                <p id="dyn-footer-copyright" class="text-neutral-400">${defaultCopyright}</p>
                <p class="text-[10px] font-mono text-[#7C3AED]">Arbitrage Growth Engine v2.0</p>
            </div>
        </div>
    </footer>
    `;

    // 2. SILENT BACKGROUND CHECK: Piche-piche sheet check karega, screen par user ko pata bhi nahi chalega
    async function silentSheetSync() {
        if (typeof getLiveLayoutConfigs !== "function") {
            setTimeout(silentSheetSync, 500); // Wait smoothly if script is indexing
            return;
        }

        try {
            const layoutConfigs = await getLiveLayoutConfigs();
            if (layoutConfigs && layoutConfigs.length > 0) {
                const emailConfig = layoutConfigs.find(c => c.key === "contact_email" || c.key === "contact-email");
                const copyrightConfig = layoutConfigs.find(c => c.key === "footer_copyright" || c.key === "footer-copyright");
                
                const emailEl = document.getElementById("dyn-contact-email");
                const copyrightEl = document.getElementById("dyn-footer-copyright");

                // Agar sheet mein alag data mile, tabhi bina blink kiye silently text update karo
                if (emailConfig && emailConfig.value && emailEl) {
                    emailEl.innerText = emailConfig.value;
                }
                if (copyrightConfig && copyrightConfig.value && copyrightEl) {
                    copyrightEl.innerHTML = copyrightConfig.value;
                }
            }
        } catch (error) {
            console.log("Silent layout background update skipped, using local data.");
        }
    }

    // Run the sync engine silently
    silentSheetSync();
});
