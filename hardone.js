const fs = require('fs');

/**
 * Helper function to safely read and parse JSON files.
 * Returns an empty array if the file is missing, empty, or invalid.
 */
function safeLoadJSON(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️ Warning: File not found at ${filePath}. Skipping.`);
            return [];
        }

        const content = fs.readFileSync(filePath, 'utf8').trim();
        
        if (!content) {
            console.warn(`⚠️ Warning: File at ${filePath} is empty. Skipping.`);
            return [];
        }

        const data = JSON.parse(content);
        
        // Ensure the data is actually a list (array)
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(`❌ Error parsing ${filePath}:`, error.message);
        return [];
    }
}

// 1. Load data with safety nets
const amazonRaw = safeLoadJSON('./mock_data/amazon.json');
const ebayRaw = safeLoadJSON('./mock_data/ebay.json');

// 2. Standardize with "Null Checks" 
// We use optional chaining (?.) and logical OR (||) to prevent crashes on missing properties
const unifiedData = [
    ...amazonRaw.map(item => ({
        source: 'Amazon',
        revenue: Number(item?.payout_amount) || 0, 
        date: item?.date || 'N/A'
    })),
    ...ebayRaw.map(item => {
        const rawRevenue = parseFloat(item?.commission);
        const timestamp = item?.timestamp;
        
        return {
            source: 'eBay',
            revenue: isNaN(rawRevenue) ? 0 : rawRevenue,
            // Only format the date if the timestamp exists
            date: timestamp 
                ? new Date(timestamp * 1000).toISOString().split('T')[0] 
                : 'Invalid Date'
        };
    })
];

// 3. Final Output
if (unifiedData.length > 0) {
    console.table(unifiedData);
} else {
    console.log("No data available to display.");
}