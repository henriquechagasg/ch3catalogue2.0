export function sumCartValue(cartItems) {
    if (cartItems.length) {
        const reducer = (acc:number, cur) => acc + (cur.pSizeOrder + cur.mSizeOrder + cur.gSizeOrder + cur.ggSizeOrder)
        const cartValue = cartItems.reduce(reducer, 0);
        return cartValue;
    };
};

export function sumCartTotal(cartItems) {
    if (cartItems.length) {
        const reducer = (acc:number, cur) => acc + (
            (cur.pSizeOrder * (cur.pSizePrice || cur.mSizePrice || cur.gSizePrice || 0)) +
            (cur.mSizeOrder * (cur.pSizePrice || cur.mSizePrice || cur.gSizePrice || 0)) +
            (cur.gSizeOrder * (cur.pSizePrice || cur.mSizePrice || cur.gSizePrice || 0)) +
            (cur.ggSizeOrder * (cur.ggSizePrice || 0))
        )
        const cartTotal = cartItems.reduce(reducer, 0);
        return cartTotal
    }
}