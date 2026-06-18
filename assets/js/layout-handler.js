// ========================================================
// GLOBAL TEXT INJECTION ROUTER
// ========================================================

document.addEventListener("DOMContentLoaded", async function() {
    // Layout configuration fetch karega sheet se
    const config = await getLiveLayoutConfig();
    
    // 1. Landing Page Headers Injection
    const heroTitle = document.getElementById("dyn-hero-title");
    const heroSubtitle = document.getElementById("dyn-hero-subtitle");
    if (heroTitle && config["hero_title"]) heroTitle.innerText = config["hero_title"];
    if (heroSubtitle && config["hero_subtitle"]) heroSubtitle.innerText = config["hero_subtitle"];

    // Delay handling execution taaki dynamically loaded components footer bhi map ho sake
    setTimeout(() => {
        const footerCopyright = document.getElementById("dyn-footer-copyright");
        const contactEmail = document.getElementById("dyn-contact-email");
        if (footerCopyright && config["footer_copyright"]) footerCopyright.innerText = config["footer_copyright"];
        if (contactEmail && config["contact_email"]) contactEmail.innerText = config["contact_email"];
    }, 800);
});
