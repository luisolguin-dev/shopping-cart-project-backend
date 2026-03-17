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
        console.log("EL OBJETO RETORNADO AL ACTUALIZAR ES ESTE", data);
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
        console.log("EL OBJETO RETORNADO AL INSERTAR ES ESTE", data);

        return {cartId, item: data };
    }
   

}

module.exports = {addItemToCart};