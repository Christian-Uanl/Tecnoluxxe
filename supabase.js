const SUPABASE_URL = "https://okiszmkikoxykrdgyhfh.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_1lYustY8j3nKL-zeSY_ztw_xd488gYl";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);