// ==========================================
// BLOCK: FULLY DYNAMIC FOOTER COMPONENT (V4.3 - FIXED SHEET SYNC)
// ==========================================
document.addEventListener("DOMContentLoaded", async function() {
    const footerSlot = document.getElementById("footer-component");
    if (!footerSlot) return;

    // First render with default beautiful placeholders
    footerSlot.innerHTML = `
    <footer class="border-t theme-border pt-12 pb-8 transition-colors duration-200" style="background-color: var(--bg-card);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Main Grid Layout -->
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
                        <span id="dyn-contact-email" class="theme-text font-medium text-white">Loading email...</span>
                    </p>
                </div>
            </div>

            <!-- Copyright Bottom Info -->
            <div class="pt-6 flex flex-col sm:flex-row items-center justify-between theme-muted text-[11px] gap-4 text-center sm:text-left">
                <p id="dyn-footer-copyright" class="text-neutral-400">Loading copyright information...</p>
                <p class="text-[10px] font-mono text-[#7C3AED]">Arbitrage Growth Engine v2.0</p>
            </div>
        </div>
    </footer>
    `;

    // DYNAMIC SHEET FETCHING INJECTION LOOP
    let layoutConfigs = [];
    try {
        layoutConfigs = await getLiveLayoutConfigs(); // Connects to sheet-api
    } catch (e) {
        console.warn("Footer sheet config fallback triggered:", e);
    }

    // Default values if sheet fails
    let finalEmail = "hey@genzest.com";
    let finalCopyright = "&copy; 2026 GENZEST Lab. Built with clean sheets & 0% manual database maintenance.";

    // Match exact keys from your Google Sheet screenshot ("contact_email" & "footer_copyright")
    if (layoutConfigs && layoutConfigs.length > 0) {
        const emailConfig = layoutConfigs.find(c => c.key === "contact_email");
        const copyrightConfig = layoutConfigs.find(c => c.key === "footer_copyright");
        
        if (emailConfig && emailConfig.value) finalEmail = emailConfig.value;
        if (copyrightConfig && copyrightConfig.value) finalCopyright = copyrightConfig.value;
    }

    // Push values directly into the DOM
    const emailEl = document.getElementById("dyn-contact-email");
    const copyrightEl = document.getElementById("dyn-footer-copyright");

    if (emailEl) emailEl.innerText = finalEmail;
    if (copyrightEl) copyrightEl.innerHTML = finalCopyright;
});
