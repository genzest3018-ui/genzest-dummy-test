// ==========================================
// DYNAMIC TEMPLATE RENDERING LOGIC
// ==========================================

document.addEventListener("DOMContentLoaded", async function() {
    // URL Parameters se specific company ID nikalna (e.g. ?id=zepto)
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');

    if (!companyId) {
        window.location.href = 'index.html'; // Agar ID missing ho toh redirect to home
        return;
    }

    // sheet-api.js se live data lekar aao
    const allData = await getLiveStartupData();
    
    // Pure master list mein se hum match karenge hamari parameter ID
    const targetCompany = allData.find(item => item.id.toLowerCase() === companyId.toLowerCase());

    if (!targetCompany) {
        // Target company sheet mein na mile toh raw text set karna
        document.getElementById('comp-title').innerText = "Case Study Not Found";
        document.getElementById('comp-hook').innerText = "Bhai lagta hai is company ka data sheet mein available nahi hai.";
        return;
    }

    // UI Mapping System (Bina kisi dummy text leakage ke)
    document.getElementById('comp-industry').innerText = targetCompany.industry;
    document.getElementById('comp-title').innerText = targetCompany.title;
    document.getElementById('comp-hook').innerText = targetCompany.hook;
    document.getElementById('comp-revenue').innerText = targetCompany.revenueFlow;
    document.getElementById('comp-moat').innerText = targetCompany.moatMatrix;
    document.getElementById('comp-marketing').innerText = targetCompany.marketingStrategy;
    document.getElementById('comp-takeaway').innerText = targetCompany.keyTakeaway;
});
