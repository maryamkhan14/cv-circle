import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.DB_URL;
const supabaseKey = process.env.DB_KEY;

const dbClient = createClient(supabaseUrl, supabaseKey);
export default dbClient;
