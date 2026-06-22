// ========================================================
// GENZEST STATIC SITE GENERATOR (generate.js)
// Run: node generate.js
// Purpose: Pre-generates /company/[slug].html with hardcoded
//          SEO meta tags so Googlebot sees correct titles
//          without executing any JavaScript.
// ========================================================

const https = require("https");
const fs = require("fs");
const path = require("path");

// ── Config ──────────────────────────────────────────────
const SHEET_CASES_ID = "1z7NSc9PxPkpNAXNhN-rjU9mq-p_9z7dKj-YI134g5es";
const SITE_BASE_URL  = "https://www.genzest.in";
const OUTPUT_DIR     = path.join(__dirname, "company");
// ────────────────────────────────────────────────────────

// Fetch helper (no npm needed — pure Node https)
function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => resolve(data));
        }).on("error", reject);
    });
}

// Same CSV parser as your sheet-api.js
function parseCsvLine(line) {
    return line
        .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map(cell => cell.replace(/^"|"$/g, "").trim());
}

// Same slug generator as your sheet-api.js
function generateSlug(title) {
    return title
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// Escape HTML special chars for safe meta tag injection
function escHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// Fetch all companies from Google Sheets
async function fetchCompanies() {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_CASES_ID}/gviz/tq?tqx=out:csv`;
    console.log("📡 Fetching data from Google Sheets...");
    const rawText = await fetchUrl(url);
    const lines = rawText.split("\n");
    const companies = [];

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === "") continue;
        const cols = parseCsvLine(lines[i]);
        if (cols.length >= 9 && cols[0].trim() !== "") {
            const title = cols[1] ? cols[1].trim() : "";
            if (!title) continue;
            companies.push({
                id:                cols[0].trim(),
                slug:              generateSlug(title),
                title:             title,
                hook:              cols[2] ? cols[2].trim() : "",
                industry:          cols[3] ? cols[3].trim() : "Startup",
            });
        }
    }
    console.log(`✅ ${companies.length} companies found in sheet.`);
    return companies;
}

// Build the full HTML string for one company
function buildHtml(company) {
    const safeTitle    = escHtml(company.title);
    const safeHook     = escHtml(company.hook);
    const safeIndustry = escHtml(company.industry);
    const pageTitle    = `${safeTitle} Business Model & Revenue | Genzest`;
    const canonicalUrl = `${SITE_BASE_URL}/company/${company.slug}`;

    // ── Only the <head> changes per company.
    // ── The entire <body> is copied verbatim from your company.html
    // ── so user experience stays 100% identical.
    return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-25LP8VZBEV"><\/script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-25LP8VZBEV');
<\/script>

    <!-- ✅ SEO: Hardcoded per-company meta (generated at build time) -->
    <title>${pageTitle}</title>
    <meta name="description" content="${safeHook}">
    <link rel="canonical" href="${canonicalUrl}">

    <!-- Open Graph -->
    <meta property="og:type"        content="article">
    <meta property="og:title"       content="${safeTitle} | Genzest Playbook">
    <meta property="og:description" content="${safeHook}">
    <meta property="og:url"         content="${canonicalUrl}">
    <meta property="og:site_name"   content="GENZEST">

    <!-- Twitter Card -->
    <meta name="twitter:card"        content="summary_large_image">
    <meta name="twitter:title"       content="${safeTitle} | Genzest Playbook">
    <meta name="twitter:description" content="${safeHook}">

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"><\/script>

    <!-- Premium Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&display=swap" rel="stylesheet">

    <script>
        const savedTheme = localStorage.getItem("genzest-theme") ||
                           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute("data-theme", savedTheme);
        tailwind.config = {
            theme: { extend: { colors: { themeBg: 'var(--bg-base)', themeCard: 'var(--card-bg)' } } }
        }
    <\/script>

    <style>
        :root, html[data-theme="dark"] {
            --bg-base: #07020d; --text-primary: #FAFAFA; --text-secondary: #94a3b8;
            --card-bg: #0f0a1e; --border-color: rgba(168,85,247,0.25);
            --navbar-bg: rgba(7,2,13,0.85); --drawer-bg: #0f0a1e;
            --glow-primary: rgba(168,85,247,0.25);
        }
        html[data-theme="light"] {
            --bg-base: #f8fafc; --text-primary: #0f172a; --text-secondary: #334155;
            --card-bg: #ffffff; --border-color: rgba(168,85,247,0.2);
            --navbar-bg: rgba(248,250,252,0.85); --drawer-bg: #ffffff;
            --glow-primary: rgba(168,85,247,0.1);
        }
        body {
            background-color: var(--bg-base); color: var(--text-primary);
            font-family: 'Space Grotesk', sans-serif;
            overflow-x: hidden; transition: background-color 0.3s ease, color 0.3s ease;
        }
        .scrollbar-none::-webkit-scrollbar { display: none !important; }
    </style>
</head>
<body class="min-h-screen flex flex-col selection:bg-[#FF2E93] selection:text-white">

    <header class="sticky top-0 z-40 backdrop-blur-md transition-all border-b bg-[var(--navbar-bg)] border-[var(--border-color)]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/index.html" class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] hover:opacity-85 text-xs font-bold transition text-[var(--text-primary)]">
                &larr; Back to Playbooks
            </a>
            <a href="/index.html" class="flex items-center gap-2 group">
                <span class="font-bold text-lg tracking-wider text-[var(--text-primary)] group-hover:text-[#00FFFF] transition">GENZEST</span>
            </a>
        </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow relative z-10 w-full">

        <div class="hidden w-full aspect-video md:h-96 rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-2xl mb-10 relative">
            <img id="comp-banner-img" src="" alt="Case Study Banner" class="w-full h-full object-cover">
        </div>

        <div class="flex items-center justify-center gap-3 mb-6">
            <span id="comp-industry" class="inline-block px-3 py-1 text-[10px] font-mono tracking-widest text-[#00FFFF] bg-purple-950/40 border border-[#A855F7]/30 rounded-full uppercase">
                ${safeIndustry}
            </span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span class="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider">GROWTH PLAYBOOK</span>
        </div>

        <h1 id="comp-title" class="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 text-center text-[var(--text-primary)] leading-[1.15]">
            ${safeTitle}
        </h1>

        <p id="comp-hook" class="text-base sm:text-lg text-center font-bold text-[#FF2E93] max-w-2xl mx-auto mb-12 leading-relaxed">
            ${safeHook}
        </p>

        <div class="space-y-10">
            <div class="p-6 sm:p-10 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_0_35px_var(--glow-primary)] transition-all duration-300">
                <h2 class="text-xs font-bold tracking-widest text-[#A855F7] uppercase mb-6 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[#A855F7]"></span> 1. Revenue Flow Model & Economics
                </h2>
                <div id="comp-revenue" class="space-y-3 font-medium text-[var(--text-secondary)]"></div>
            </div>
            <div class="p-6 sm:p-10 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_0_35px_var(--glow-primary)] transition-all duration-300">
                <h2 class="text-xs font-bold tracking-widest text-[#00FFFF] uppercase mb-6 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[#00FFFF]"></span> 2. The Defensive Moat Structure
                </h2>
                <div id="comp-moat" class="space-y-3 font-medium text-[var(--text-secondary)]"></div>
            </div>
            <div class="p-6 sm:p-10 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_0_35px_var(--glow-primary)] transition-all duration-300">
                <h2 class="text-xs font-bold tracking-widest text-[#FF2E93] uppercase mb-6 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[#FF2E93]"></span> 3. Marketing & Customer Acquisition
                </h2>
                <div id="comp-marketing" class="space-y-3 font-medium text-[var(--text-secondary)]"></div>
            </div>
            <div class="p-6 sm:p-10 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_0_35px_var(--glow-primary)] transition-all duration-300">
                <h2 class="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-6 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span> 4. Key Takeaway
                </h2>
                <div id="comp-takeaway" class="space-y-3 font-medium text-[var(--text-secondary)]"></div>
            </div>
        </div>
    </main>

    <div id="footer-component"></div>

    <script src="/sheets/sheet-api.js"><\/script>
    <script src="/assets/js/layout-handler.js"><\/script>
    <script src="/assets/js/footer.js"><\/script>
    <script src="/assets/js/ui-enhancer.js"><\/script>
    <script src="/assets/js/company-page.js"><\/script>
</body>
</html>`;
}

// Main runner
async function main() {
    // 1. Ensure /company directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`📁 Created directory: ${OUTPUT_DIR}`);
    }

    // 2. Fetch all companies
    const companies = await fetchCompanies();
    if (companies.length === 0) {
        console.error("❌ No companies fetched. Check Sheet ID or internet access.");
        process.exit(1);
    }

    // 3. Generate one HTML file per company
    let generated = 0;
    for (const company of companies) {
        if (!company.slug) {
            console.warn(`⚠️  Skipping company with empty slug: ${company.title}`);
            continue;
        }
        const filePath = path.join(OUTPUT_DIR, `${company.slug}.html`);
        const html = buildHtml(company);
        fs.writeFileSync(filePath, html, "utf8");
        console.log(`✅ Generated: /company/${company.slug}.html`);
        generated++;
    }

    console.log(`\n🎉 Done! ${generated} pages generated in /company/`);
    console.log(`📌 Next step: commit + push to GitHub → Vercel auto-deploys.`);
}

main().catch(err => {
    console.error("❌ Fatal error:", err);
    process.exit(1);
});
