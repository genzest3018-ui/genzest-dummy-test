// ========================================================
// GENZEST CENTRAL HEADLESS CMS ENGINE (V2.0 - MULTI-SHEET)
// ========================================================

// Teeno sheets ki dynamic active IDs
const SHEET_CASES_ID = "1z7NSc9PxPkpNAXNhN-rjU9mq-p_9z7dKj-YI134g5es";
const SHEET_LEGAL_ID = "1SFNMjl4mbeguci2DiUVtHHbTq_vYt7SG79th0o2GiwQ";
const SHEET_LAYOUT_ID = "1Q-7IJBUGwk8tnZVqvb5r4v67_bWzTgaprjY8pS1-zK4";

// SMART CSV REGEX SPLITTER (Handles internal quotes & commas safely)
function parseCsvLine(line) {
    const columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    return columns.map(cell => cell.replace(/^"|"$/g, '').trim());
}

// 1. ENGINE: FETCH CASE STUDIES (Tab: Case_Studies)
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
                if (cleanColumns.length >= 8 && cleanColumns[0] !== "") {
                    structuredData.push({
                        id: cleanColumns[0],
                        title: cleanColumns[1],
                        hook: cleanColumns[2],
                        industry: cleanColumns[3],
                        revenueFlow: cleanColumns[4],
                        moatMatrix: cleanColumns[5],
                        marketingStrategy: cleanColumns[6],
                        keyTakeaway: cleanColumns[7],
                        imageUrl: cleanColumns[8] || ""
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
async function getLiveLayoutConfig() {
    try {
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_LAYOUT_ID}/gviz/tq?tqx=out:csv`);
        if (!response.ok) throw new Error("Layout Fetch Failed");
        const rawText = await response.text();
        const lines = rawText.split('\n');
        const configMap = {};
        
        if (lines.length > 1) {
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim() === "") continue;
                const cleanColumns = parseCsvLine(lines[i]);
                if (cleanColumns.length >= 2) {
                    configMap[cleanColumns[0]] = cleanColumns[1];
                }
            }
        }
        return configMap;
    } catch (error) {
        console.error("Error fetching layout config:", error);
        return {};
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
