// ==========================================
// AUTOMATED NEWSLETTER ENGINE (FORM HANDLER)
// ==========================================

document.addEventListener("DOMContentLoaded", function() {
    const newsletterForm = document.getElementById('newsletter-form');
    const formFeedback = document.getElementById('form-feedback');
    const newsletterEmail = document.getElementById('newsletter-email');
    const newsletterBtn = document.getElementById('newsletter-btn');

    if (!newsletterForm) return;

    // Google Apps Script Web App URL (21 June ko deploy kiya gaya)
    const appsScriptWebhookUrl = "https://script.google.com/macros/s/AKfycbxfUNj_FvzgMizaSFI93-Rz7MYJq8ShSn4X0QF1V2NKW4pF_AD0VZ8tOCJXIt1Bs-cD8Q/exec";

    newsletterForm.onsubmit = async (e) => {
        e.preventDefault();
        
        if (newsletterBtn) {
            newsletterBtn.innerText = "Connecting...";
            newsletterBtn.disabled = true;
        }

        try {
            const emailVal = newsletterEmail.value.trim();
            
            // silent AJAX request bina page update / redirection ke
            await fetch(appsScriptWebhookUrl, {
                method: 'POST',
                mode: 'no-cors', // Google Apps Script requirements override cross-origin block
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `email=${encodeURIComponent(emailVal)}&action=newsletter`
            });

            // Form refresh aur response success state rendering
            newsletterEmail.value = "";
            if (formFeedback) {
                formFeedback.innerText = "✓ Subscribed! Check your inbox for weekly breakdowns .";
                formFeedback.className = "text-xs mt-3 text-emerald-400 font-medium";
                formFeedback.classList.remove('hidden');
            }
        } catch (err) {
            if (formFeedback) {
                formFeedback.innerText = "Error connecting to backend database logs.";
                formFeedback.className = "text-xs mt-3 text-rose-400 font-medium";
                formFeedback.classList.remove('hidden');
            }
            console.error("Newsletter submission script breakdown error:", err);
        } finally {
            if (newsletterBtn) {
                newsletterBtn.innerText = "Subscribe Now";
                newsletterBtn.disabled = false;
            }
        }
    };
});
