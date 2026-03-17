const supabase = require("../supabaseClient");

async function addItemToCart(cartId, productId, quantity) {

    if (!cartId) {
        const { data: newCart, error } = await supabase 
        .from("carts")
        .insert({})
        .select()
        .single();

        if (error) throw error;
        cartId = newCart.id;
    }

    const { data: existingItem, error: findError } = await supabase
    .from("cartItems")
    .select("*")
    .eq("cartId", cartId)
    .eq("productId", productId)
    .maybeSingle();

    if (findError) throw findError;

    if (existingItem) {
        const { data, error} = await supabase
        .from("cartItems")
        .update([{
            quantity: existingItem.quantity + quantity
        }])
        .eq("id", existingItem.id)
        .select()
        .single();
        if (error) throw error;
        return { cartId, item: data};
    } else {
        const { data, error } = await supabase
        .from("cartItems")
        .insert([{cartId,
                  productId, 
                  quantity}])
        .select()
        .single();

        if (error) throw error;

        return {cartId, item: data };
    }
   

}

async function getCart(cartId) {
    const { data, error } = await supabase
    .from("cartItems")
    .select(`
        quantity,
        product:products (
        id,
        name,
        price)
    `)
    .eq("cartId", cartId);

    if (error) throw error;
    
    const items = data.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
    }));

    return {
        cartId, 
        items
    };

}

async function removeItem(itemId) {
    const {error} = await supabase 
    .from('cartItems')
    .delete()
    .eq('id', itemId);

    if (error) throw error;

    return {
        deletedItemId: itemId
    };
}

module.exports = {addItemToCart, getCart, removeItem};