import { createClient } from "@supabase/supabase-js";
import mockTestDbClient from "./mock-db-client";
const supabaseUrl = process.env.VITE_SUPABASE_TEST_URL;
const supabaseKey = process.env.VITE_SUPABASE_TEST_KEY;
const realTestDbClient = createClient(supabaseUrl, supabaseKey);

export default realTestDbClient;
export { mockTestDbClient };
