// ========================================================
// GENZEST CENTRAL HEADLESS CMS ENGINE (V2.3 - CLEAN PATH ROUTING)
// ========================================================

const SHEET_CASES_ID = "1z7NSc9PxPkpNAXNhN-rjU9mq-p_9z7dKj-YI134g5es";
const SHEET_LEGAL_ID = "1SFNMjl4mbeguci2DiUVtHHbTq_vYt7SG79th0o2GiwQ";
const SHEET_LAYOUT_ID = "1Q-7IJBUGwk8tnZVqvb5r4v67_bWzTgaprjY8pS1-zK4";

// ROBUST CSV PARSER — handles commas inside quotes, hyphens, text slugs
function parseCsvLine(line) {
    return line
        .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map(cell => cell.replace(/^"|"$/g, '').trim());
}

// Auto-generate SEO slug from title
function generateSlug(title) {
    return title
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')    // remove special chars except hyphens
        .replace(/[\s_]+/g, '-')     // spaces/underscores → hyphen
        .replace(/^-+|-+$/g, '');    // trim leading/trailing hyphens
}

// 1. ENGINE: FETCH CASE STUDIES
async function getLiveStartupData() {
    try {
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_CASES_ID}/gviz/tq?tqx=out:csv`);
        if (!response.ok) throw new Error("Cases Fetch Failed");
        const rawText = await response.text();
        const lines = rawText.split('\n');
        const structuredData = [];

        if (lines.length > 1) {
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim() === "") continue;
                const cleanColumns = parseCsvLine(lines[i]);

                if (cleanColumns.length >= 9 && cleanColumns[0].trim() !== "") {
                    const title = cleanColumns[1] ? cleanColumns[1].trim() : "";
                    const slug = generateSlug(title);

                    structuredData.push({
                        id: cleanColumns[0].trim(),
                        slug: slug,
                        title: title,
                        hook: cleanColumns[2] ? cleanColumns[2].trim() : "",
                        industry: cleanColumns[3] ? cleanColumns[3].trim() : "",
                        revenueFlow: cleanColumns[4] ? cleanColumns[4].trim() : "",
                        moatMatrix: cleanColumns[5] ? cleanColumns[5].trim() : "",
                        marketingStrategy: cleanColumns[6] ? cleanColumns[6].trim() : "",
                        keyTakeaway: cleanColumns[7] ? cleanColumns[7].trim() : "",
                        imageUrl: cleanColumns[8] ? cleanColumns[8].trim() : ""
                    });
                }
            }
        }
        return structuredData;
    } catch (error) {
        console.error("Error fetching cases:", error);
        return [];
    }
}

// 2. ENGINE: FETCH LAYOUT TEXT CONFIGS
async function getLiveLayoutConfigs() {
    try {
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_LAYOUT_ID}/gviz/tq?tqx=out:csv`);
        if (!response.ok) throw new Error("Layout Fetch Failed");
        const rawText = await response.text();
        const lines = rawText.split('\n');
        const configArray = [];

        if (lines.length > 1) {
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim() === "") continue;
                const cleanColumns = parseCsvLine(lines[i]);
                if (cleanColumns.length >= 2) {
                    configArray.push({
                        key: cleanColumns[0].trim(),
                        value: cleanColumns[1].trim()
                    });
                }
            }
        }
        return configArray;
    } catch (error) {
        console.error("Error fetching layout config:", error);
        return [];
    }
}

// 3. ENGINE: FETCH LEGAL & ABOUT SECTIONS
async function getLiveLegalData() {
    try {
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_LEGAL_ID}/gviz/tq?tqx=out:csv`);
        if (!response.ok) throw new Error("Legal Fetch Failed");
        const rawText = await response.text();
        const lines = rawText.split('\n');
        const legalData = [];

        if (lines.length > 1) {
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim() === "") continue;
                const cleanColumns = parseCsvLine(lines[i]);
                if (cleanColumns.length >= 3) {
                    legalData.push({
                        page_id: cleanColumns[0].toLowerCase(),
                        section_title: cleanColumns[1],
                        section_content: cleanColumns[2]
                    });
                }
            }
        }
        return legalData;
    } catch (error) {
        console.error("Error fetching legal data:", error);
        return [];
    }
}
