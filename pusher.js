require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// UPDATE STARTS HERE
async function uploadEarnings(inputData) { 
    try {
        // We use inputData to refer to the sales coming from hardone.js
        console.log(`🚀 Received ${inputData.length} rows. Syncing with Supabase...`);
        
        const { data, error } = await supabase
            .from('earnings')
            .upsert(inputData, { onConflict: 'unique' }); // Uses the 'unique' column you added

        if (error) {
            console.error("❌ Database Error:", error.message);
        } else {
            console.log("✅ Sync Complete! Cloud database is up to date.");
        }
    } catch (err) {
        console.error("💥 Connection Error:", err.message);
    }
}
// UPDATE ENDS HERE

module.exports = { uploadEarnings };