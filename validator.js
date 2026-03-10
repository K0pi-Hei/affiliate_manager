const axios = require('axios');

// 1. THIS IS THE MISSING PIECE: The list of links
const linksToCheck = [
    { name: "Google", url: "https://www.google.com" },
    { name: "Fake Page", url: "https://www.google.com/this-is-a-broken-link-123" },
    { name: "GitHub", url: "https://github.com" }
];

// 2. The Doctor logic
async function runDoctor() {
    const BATCH_SIZE = 5; 
    const results = [];

    console.log(`🩺 Doctor is checking links in batches of ${BATCH_SIZE}...`);

    for (let i = 0; i < linksToCheck.length; i += BATCH_SIZE) {
        const batch = linksToCheck.slice(i, i + BATCH_SIZE);
        
        // (Insert your checkLink logic here or make sure it's defined)
        // For now, let's assume you have the checkLink function from before
        const batchResults = await Promise.all(batch.map(link => checkLink(link)));
        
        results.push(...batchResults);
        console.log(`Progress: ${results.length}/${linksToCheck.length} checked.`);
    }

    console.table(results);
}

// 3. The "Trigger" to start the script
runDoctor();

// --- Make sure you also have your checkLink function defined somewhere! ---
async function checkLink(link) {
    try {
        const response = await axios.head(link.url, { timeout: 5000 });
        return { Name: link.name, Status: response.status, Health: "✅ OK" };
    } catch (error) {
        return { 
            Name: link.name, 
            Status: error.response ? error.response.status : "OFFLINE", 
            Health: "❌ BROKEN" 
        };
    }
}