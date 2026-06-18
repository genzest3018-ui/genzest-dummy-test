// ==========================================
// BULLETPROOF ENGINE: SMART CSV FETCH (V1.4)
// ==========================================

const MASTER_SHEET_ID = "1z7NSc9PxPkpNAXNhN-rjU9mq-p_9z7dKj-YI134g5es";
const SHEETS_CSV_URL = `https://docs.google.com/spreadsheets/d/${MASTER_SHEET_ID}/gviz/tq?tqx=out:csv`;

async function getLiveStartupData() {
    try {
        const response = await fetch(SHEETS_CSV_URL);
        if (!response.ok) throw new Error("Database Fetch Failed");
        
        const rawText = await response.text();
        const lines = rawText.split('\n');
        
        const structuredData = [];
        
        if (lines.length > 1) {
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim() === "") continue;

                // SMART REGEX: Yeh line ke andar ke commas ko ignore karega aur sirf cells waale commas se split karega!
                const columns = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
                const cleanColumns = columns.map(cell => cell.replace(/^"|"$/g, '').trim());
                
                if (cleanColumns.length >= 8 && cleanColumns[0] !== "") {
                    structuredData.push({
                        id: cleanColumns[0],               // Column A
                        title: cleanColumns[1],            // Column B
                        hook: cleanColumns[2],             // Column C
                        industry: cleanColumns[3],         // Column D
                        revenueFlow: cleanColumns[4],      // Column E
                        moatMatrix: cleanColumns[5],       // Column F
                        marketingStrategy: cleanColumns[6], // Column G
                        keyTakeaway: cleanColumns[7],      // Column H
                        imageUrl: cleanColumns[8] || ""    // Column I (Image URL)
                    });
                }
            }
        }
        return structuredData;
        
    } catch (error) {
        console.error("Critical: Google Sheet Connection Error ->", error);
        return [];
    }
}
