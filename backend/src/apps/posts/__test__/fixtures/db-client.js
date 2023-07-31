import { createClient } from "@supabase/supabase-js";
import mockTestDbClient from "./mock-db-client";
const supabaseUrl = process.env.DB_TEST_URL;
const supabaseKey = process.env.DB_TEST_KEY;
const realTestDbClient = createClient(supabaseUrl, supabaseKey);

export default realTestDbClient;
export { mockTestDbClient };
