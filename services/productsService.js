const supabase = require('../supabaseClient');

async function createProduct(name, price){
    const {data, error} = await supabase
        .from('products')
        .insert([{name, price}])
        .select()
        .single();
    
    if (error) throw error;

    return data;

}

async function fetchAll() {
    const {data, error} = await supabase.from('products').select('*');
    if (error) throw error;
    return data;
}

async function fetchAllById(id) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) throw error;

    return data;

}
module.exports = { fetchAll, fetchAllById, createProduct };