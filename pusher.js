require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function uploadEarnings(data) {
    try {
        console.log(`🚀 Received ${data.length} rows. Syncing with Supabase...`);
        const { error } = await supabase
            .from('earnings')
            .upsert(data, { onConflict: 'source,sales_date' });

        if (error) {
            console.error("❌ Database Error:", error.message);
        } else {
            console.log("✅ Sync Complete! Cloud database is up to date.");
        }
    } catch (err) {
        console.error("💥 Connection Error:", err.message);
    }
}

// Export the function so hardone.js can use it
module.exports = { uploadEarnings };