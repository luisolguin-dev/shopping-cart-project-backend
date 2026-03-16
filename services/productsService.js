const supabase = require('../supabaseClient');

async function fetchAll() {
    const {data, error} = await supabase.from('products').select('*');
    if (error) throw error;
    return data;
}

module.exports = { fetchAll}