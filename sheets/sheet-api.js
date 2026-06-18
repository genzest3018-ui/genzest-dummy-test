// ==========================================
// BULLETPROOF ENGINE: TAB-SEPARATED FETCH (V1.3)
// ==========================================

const MASTER_SHEET_ID = "1z7NSc9PxPkpNAXNhN-rjU9mq-p_9z7dKj-YI134g5es";
// tqx=out:tsv karne se data commas se nahi, Tabs se separate hota hai (No layout break!)
const SHEETS_TSV_URL = `https://docs.google.com/spreadsheets/d/${MASTER_SHEET_ID}/gviz/tq?tqx=out:tsv`;

async function getLiveStartupData() {
    try {
        const response = await fetch(SHEETS_TSV_URL);
        if (!response.ok) throw new Error("Database Fetch Failed");
        
        const rawText = await response.text();
        const lines = rawText.split('\n');
        
        const structuredData = [];
        
        if (lines.length > 1) {
            for (let i = 1; i < lines.length; i++) {
                // Comma ki jagah \t (Tab) se split karenge taaki text ke andar ka comma dikkat na kare
                const columns = lines[i].split('\t').map(cell => cell.replace(/^"|"$/g, '').trim());
                
                if (columns.length >= 8 && columns[0] !== "") {
                    structuredData.push({
                        id: columns[0],               // Column A
                        title: columns[1],            // Column B
                        hook: columns[2],             // Column C
                        industry: columns[3],         // Column D
                        revenueFlow: columns[4],      // Column E
                        moatMatrix: columns[5],       // Column F
                        marketingStrategy: columns[6], // Column G
                        keyTakeaway: columns[7],      // Column H
                        imageUrl: columns[8] || ""    // Column I (Image Link)
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
