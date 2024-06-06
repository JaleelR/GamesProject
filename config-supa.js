/* Configures app to use supabase as database */
const { createClient } = require('@supabase/supabase-js');
require("colors");
require("dotenv").config();
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
console.log("key", supabaseKey)
const supabase = createClient(supabaseUrl, supabaseKey);


console.log("Lotta Games:".green);
console.log("Started on URL:".yellow, supabaseUrl);
console.log("---");
module.exports = {
    supabase
}
