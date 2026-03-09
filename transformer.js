const fs = require('fs'); // 'fs' is the File System. We need this to "read" the files on your hard drive.

// 1. Pulling the raw data into the script
const amazonRaw = JSON.parse(fs.readFileSync('./mock_data/amazon.json', 'utf8'));
const ebayRaw = JSON.parse(fs.readFileSync('./mock_data/ebay.json', 'utf8'));

// 2. The "Transformation" - Turning different names into ONE standard name
const unifiedData = [
    ...amazonRaw.map(item => ({
        source: 'Amazon',
        revenue: item.payout_amount, // Changing 'payout_amount' to 'revenue'
        date: item.date
    })),
    ...ebayRaw.map(item => ({
        source: 'eBay',
        revenue: parseFloat(item.commission), // 'parseFloat' turns "8.75" (text) into 8.75 (number)
        date: new Date(item.timestamp * 1000).toISOString().split('T')[0] // Turns a timestamp into a date
    }))
];

// 3. Seeing the result
console.table(unifiedData);