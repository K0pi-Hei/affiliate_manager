const { uploadEarnings } = require('./pusher'); 
const { getLatestSales } = require('./mock_api'); // Import the realistic generator

// 1. GENERATE RAW DATA
// We'll generate 10 random "raw" sales from the Mock API
const rawSales = [];
for (let i = 0; i < 10; i++) {
    rawSales.push(getLatestSales());
}

// 2. TRANSFORM: Mapping Raw Mock Data to Database Keys
const allFinalData = rawSales.map(item => {
    if (item.source === 'Amazon') {
        return {
            unique: item.unique,        // 1. Map the new unique ID
            source: 'Amazon',
            amount: item.payout_amount, 
            sales_date: item.date,      
            product_title: item.title,  
            asin: item.asin             
        };
    } else {
        return {
            unique: item.unique,        // 2. Map the new unique ID here too
            source: 'eBay',
            amount: parseFloat(item.commission), 
            sales_date: new Date(item.timestamp * 1000).toISOString().split('T')[0],
            product_title: `eBay Item: ${item.item_id}`, 
            asin: null 
        };
    }
});

// 3. OUTPUT & SHIP
console.log("🩺 Processing Realistic Mock Data:");
console.table(allFinalData);

uploadEarnings(allFinalData);