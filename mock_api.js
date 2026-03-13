// mock_api.js
function getLatestSales() {
    const platforms = ['Amazon', 'eBay'];
    const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
    const uniqueId = Math.random().toString(36).substr(2, 9); // Creates a random ID like 'a1b2c3d4e'

    if (randomPlatform === 'Amazon') {
        return {
            unique: `AMZ-${uniqueId}`, // Added Unique ID
            source: 'Amazon',
            payout_amount: parseFloat((Math.random() * 10).toFixed(2)),
            date: new Date().toISOString().split('T')[0],
            title: "Minimalist Mechanical Keyboard",
            asin: "B08N5N6RSS"
        };
    } else {
        return {
            unique: `EBY-${uniqueId}`, // Added Unique ID
            source: 'eBay',
            commission: (Math.random() * 15).toFixed(2),
            timestamp: Math.floor(Date.now() / 1000),
            item_id: "234567890123"
        };
    }
}
module.exports = { getLatestSales };