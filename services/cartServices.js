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
    .from("cart_items")
    .select("*")
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .maybeSingle();

    if (findError) throw findError;

    if (existingItem) {
        const { data, error} = await supabase
        .from("cart_items")
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
        .from("cart_items")
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
    .from("cart_items")
    .select(`
        quantity,
        product:products (
        id,
        name,
        price)
    `)
    .eq("cart_id", cartId);

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
    .from('cart_items')
    .delete()
    .eq('id', itemId);

    if (error) throw error;

    return {
        deletedItemId: itemId
    };


}

async function createReceipt(cartId, grossPrice, tax, netPrice) {
    const {data: receipt, error} = await supabase 
    .from("receipts")
    .insert({cart_id: cartId, 
             gross: grossPrice,
             tax: tax,
             net: netPrice
    })
    .select()
    .single();

    if (error) throw error;

    return receipt;

}

async function checkout(cartId) {
    const cart = await getCart(cartId);
    if (!cart.items.length) {
        throw new Error('Cart is empty')
    }

    const grossPrice = cart.items.reduce((total, item) => {
        return total + (item.price * item.quantity )
    }, 0);

    const tax = grossPrice * 0.15;
    const netPrice = grossPrice - tax;
    const receipt = await createReceipt(cartId, grossPrice, tax, netPrice);

    const itemsReceipt = cart.items.map((item) => ({
        receipt_id: receipt.id,
        product_id: item.productId,
        quantity: item.quantity,
        price_at_purchase: item.price

    }))

    const { error: itemsError } = await supabase
    .from("receipt_items")
    .insert(itemsReceipt)
    .select();

    if (itemsError) throw itemsError;

    const {error: deleteCartError} = await supabase 
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId);

    if (deleteCartError) throw deleteCartError;
    
    return ({
        receiptId: receipt.id,
        message: 'Checkout succesful'
    });


}
module.exports = {addItemToCart, getCart, removeItem, checkout};


// async function getReceipt(cartId) {
//     const cart = await getCart(cartId);

//     const gross = cart.items.reduce((total, item) => {
//         return total + (item.price * item.quantity);
//     }, 0);

//     const tax = gross * 0.15;

//     const net = gross - tax;

//     return ( {
//         cartId,
//         items: cart.items, 
//         gross, 
//         tax, 
//         net
//     });
// }
