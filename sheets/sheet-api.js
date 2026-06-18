// ==========================================
// CORE ENGINE: GOOGLE SHEET DATA FETCH
// ==========================================

// Tumhaari active spreadsheet ID aur live database link
const MASTER_SHEET_ID = "1z7NSc9PxPkpNAXNhN-rjU9mq-p_9z7dKj-YI134g5es";
const SHEETS_CSV_URL = `https://docs.google.com/spreadsheets/d/${MASTER_SHEET_ID}/gviz/tq?tqx=out:csv`;

async function getLiveStartupData() {
    try {
        const response = await fetch(SHEETS_CSV_URL);
        if (!response.ok) throw new Error("Database Fetch Failed");
        
        const rawText = await response.text();
        const lines = rawText.split('\n');
        
        const structuredData = [];
        
        // Agar sheet mein data milta hai (Row 1 headers chor kar Row 2 se read karega)
        if (lines.length > 1) {
            for (let i = 1; i < lines.length; i++) {
                // Quotes hatakar cells ko properly array mein convert karna
                const columns = lines[i].split(',').map(cell => cell.replace(/^"|"$/g, '').trim());
                
                // Hum safe validation check laga rahe hain taaki koi blank row render na ho
                if (columns.length >= 8 && columns[0] !== "") {
                    structuredData.push({
                        id: columns[0],               // Column A: unique-id (e.g. zepto)
                        title: columns[1],            // Column B: Title (e.g. Zepto 10-Min Delivery)
                        hook: columns[2],             // Column C: Short Hook/Subheading
                        industry: columns[3],         // Column D: Industry (e.g. Quick Commerce)
                        revenueFlow: columns[4],      // Column E: Revenue Model Text
                        moatMatrix: columns[5],       // Column F: Moat Analysis Text
                        marketingStrategy: columns[6], // Column G: Marketing Playbook Text
                        keyTakeaway: columns[7]       // Column H: Key Takeaway Text
                    });
                }
            }
        }
        return structuredData;
        
    } catch (error) {
        console.error("Critical: Google Sheet Engine Connection Error ->", error);
        return []; // Glitch free crash fallback (khali array dega agar net issue hua)
    }
}
