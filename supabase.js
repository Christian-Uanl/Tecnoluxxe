const SUPABASE_URL = "https://okiszmkikoxykrdgyhfh.supabase.co";
const SUPABASE_KEY = "sb_publishable_1lYustY8j3nKL-zeSY_ztw_xd488gYl";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
supabaseClient
    .from("productos")
    .select("id_producto, nombre")
    .then(({ data, error }) => {
        if (error) {
            console.error("Error de conexión:", error);
            return;
        }

        console.log("¡Conexión exitosa con Supabase!");
        console.table(data);
    });
