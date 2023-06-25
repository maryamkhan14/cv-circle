import { createClient } from "@supabase/supabase-js";
import makeUsersDb from "./users-db.js";
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

const dbClient = createClient(supabaseUrl, supabaseKey);
const usersDb = makeUsersDb({ dbClient });
export { usersDb };
