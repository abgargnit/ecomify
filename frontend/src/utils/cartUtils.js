export const addDecimals = (num) =>{
    return (Math.round(num*100)/100).toFixed(2);
};

export const updateCart = (state)=>{
    // calculate items price 
    state.itemsPrice = addDecimals(state.cartItems.reduce((accumulater,item)=> accumulater + item.price * item.qty, 0));
    // calculate shipping price (if order is over 99 dollars then free else it is 9 dollars policy..)
    state.shippingPrice = addDecimals(state.itemsPrice > 99 ? 0 : 9);

    // calculate tax price  (15 percent tax)
    state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));
    // calculate total price
    state.totalPrice = addDecimals((Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2));
    localStorage.setItem('cart',JSON.stringify(state));


    return state;
}
