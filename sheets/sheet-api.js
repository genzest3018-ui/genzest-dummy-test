// ========================================================
// GENZEST CENTRAL HEADLESS CMS ENGINE (V2.2 - ROBUST CSV SYNC)
// ========================================================

// Teeno sheets ki dynamic active IDs
const SHEET_CASES_ID = "1z7NSc9PxPkpNAXNhN-rjU9mq-p_9z7dKj-YI134g5es";
const SHEET_LEGAL_ID = "1SFNMjl4mbeguci2DiUVtHHbTq_vYt7SG79th0o2GiwQ";
const SHEET_LAYOUT_ID = "1Q-7IJBUGwk8tnZVqvb5r4v67_bWzTgaprjY8pS1-zK4";

// ROBUST CSV PARSER: Splits CSV correctly even if text contains commas
function parseCsvLine(text) {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let char of text) {
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
        } else {
            cur += char;
        }
    }
    result.push(cur.trim());
    return result.map(c => c.replace(/^"|"$/g, ''));
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
                if (!lines[i].trim()) continue;
                const cols = parseCsvLine(lines[i]);
                // Check if ID (col 0) exists
                if (cols[0]) {
                    structuredData.push({
                        id: cols[0].toString().trim(),
                        title: cols[1] || "Untitled",
                        hook: cols[2] || "No summary",
                        industry: cols[3] || "Startup",
                        revenueFlow: cols[4] || "",
                        moatMatrix: cols[5] || "",
                        marketingStrategy: cols[6] || "",
                        keyTakeaway: cols[7] || "",
                        imageUrl: cols[8] || ""
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
        
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const cols = parseCsvLine(lines[i]);
            if (cols[0]) {
                configArray.push({
                    key: cols[0].trim(),
                    value: cols[1] ? cols[1].trim() : ""
                });
            }
        }
        return configArray;
    } catch (error) {
        console.error("Error fetching layout config:", error);
        return [];
    }
}

// 3. ENGINE: FETCH LEGAL & ABOUT SECTIONS DATA
async function getLiveLegalData() {
    try {
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_LEGAL_ID}/gviz/tq?tqx=out:csv`);
        if (!response.ok) throw new Error("Legal Fetch Failed");
        const rawText = await response.text();
        const lines = rawText.split('\n');
        const legalData = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const cols = parseCsvLine(lines[i]);
            if (cols[0]) {
                legalData.push({
                    page_id: cols[0].toString().toLowerCase().trim(),
                    section_title: cols[1] || "",
                    section_content: cols[2] || ""
                });
            }
        }
        return legalData;
    } catch (error) {
        console.error("Error fetching legal data:", error);
        return [];
    }
}
