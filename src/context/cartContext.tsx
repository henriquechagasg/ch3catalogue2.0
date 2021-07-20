import {createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { sumCartValue } from './utils';
import { toast } from 'react-toastify'


type cartItem = {
    id: string,
    refer: string,
    description: string,
    color: string,
    groupDescription: string,
    image: string,
    avaiableP: number,
    avaiableM: number,
    avaiableG: number,
    avaiableGG: number,
    pSizePrice: number,
    mSizePrice: number,
    gSizePrice: number,
    ggSizePrice: number, 
    pSizeOrder: number,
    mSizeOrder: number,
    gSizeOrder: number,
    ggSizeOrder: number,
    totalOrdered: number,
    totalValueOrdered: number
}


type CartContextData = {
    cartItems: cartItem[],
    cartTotals: number,
    setCartItems: any,
    addItemToCart: (item: cartItem) => void,
    addOneFromSize: (itemToAdd: cartItem, size:string) => void,
    removeOneFromSize: (itemToAdd:cartItem, size:string) => void,
    generatePhrase: (avaiable: number) => string,
    orderSucceed: boolean,
    toggleOrderSucceed: () => void,
    setOrderSucceed: any,
    orderFailed: boolean,
    toggleOrderFailed: () => void,
    setOrderFailed: any,
}

export const CartContext = createContext({} as CartContextData );

type CartContextProviderProps = {
    children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps){

    const [ cartItems, setCartItems] = useState([]);
    const [ cartTotals, setCartTotals] = useState(0);
    const [orderSucceed, setOrderSucceed] = useState(false)
    const [orderFailed, setOrderFailed] = useState(false)

    useEffect(() => {
        const items = localStorage.getItem("cartItems");
        if (items) {
            setCartItems(JSON.parse(items));
            setCartTotals(sumCartValue(JSON.parse(items)))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        setCartTotals(sumCartValue(cartItems))
        }, [cartItems]);
        
    function generatePhrase(avaiable) {
        if (avaiable == 1){
            return "Temos 1 disponível hoje."
        } else {
            return `Temos ${avaiable} disponíveis hoje.` 
        }
    }

    async function addItemToCart(item){
        if (cartItems.length) {
            const existingCartItem = cartItems.find(cartItem =>
                cartItem.refer === item.refer && cartItem.color === item.color
            )

            if (existingCartItem) {
                const result = cartItems.map(cartItem => {
                    if (cartItem.refer === item.refer && cartItem.color === item.color) {
                        return {...cartItem, 
                            pSizeOrder: cartItem.pSizeOrder + item.pSizeOrder,
                            mSizeOrder: cartItem.mSizeOrder + item.mSizeOrder,
                            gSizeOrder: cartItem.gSizeOrder + item.gSizeOrder,
                            ggSizeOrder: cartItem.ggSizeOrder + item.ggSizeOrder,
                            totalOrdered: cartItem.totalOrdered + item.totalOrdered,
                            totalValueOrdered: cartItem.totalValueOrdered + item.totalValueOrdered
                        }
                    } else {
                        return cartItem
                    }
                })
                setCartItems([...result])
            } else {
                cartItems.push(item)
                setCartItems([...cartItems])
            }
        } else {
            cartItems.push(item)
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            setCartItems([...cartItems])
        }
    }

    function addOneFromSize(itemToAdd, size) {
        const Index =  cartItems.findIndex(cartItem => 
            cartItem.refer == itemToAdd.refer && cartItem.color === itemToAdd.color    
        )
        if (size === "P")  {
            if (cartItems[Index].pSizeOrder === cartItems[Index].avaiableP){
                    toast.warn(generatePhrase(cartItems[Index].avaiableP), {
                        position: "top-right",
                        autoClose: 3500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
            } else if (cartItems[Index].pSizeOrder < cartItems[Index].avaiableP) {
                cartItems[Index] = {
                    ...cartItems[Index],
                    pSizeOrder: cartItems[Index].pSizeOrder + 1,
                    totalOrdered: cartItems[Index].totalOrdered + 1,
                    totalValueOrdered: cartItems[Index].totalValueOrdered + (cartItems[Index].pSizePrice || 
                        cartItems[Index].mSizePrice || cartItems[Index].gSizePrice || 0)
                }
            }
        }
        if (size === "M") {
            if (cartItems[Index].mSizeOrder === cartItems[Index].avaiableM){
                toast.warn(generatePhrase(cartItems[Index].avaiableM), {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            } else if (cartItems[Index].mSizeOrder < cartItems[Index].avaiableM){
                cartItems[Index] = {
                    ...cartItems[Index],
                    mSizeOrder: cartItems[Index].mSizeOrder + 1,
                    totalOrdered: cartItems[Index].totalOrdered + 1,
                    totalValueOrdered: cartItems[Index].totalValueOrdered + (cartItems[Index].pSizePrice || 
                        cartItems[Index].mSizePrice || cartItems[Index].gSizePrice || 0)
                }
            }
        }
        if (size === "G") {
            if (cartItems[Index].gSizeOrder === cartItems[Index].avaiableG){
                toast.warn(generatePhrase(cartItems[Index].avaiableG), {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            } else if (cartItems[Index].gSizeOrder < cartItems[Index].avaiableG) {
                cartItems[Index] = {
                    ...cartItems[Index],
                    gSizeOrder: cartItems[Index].gSizeOrder + 1,
                    totalOrdered: cartItems[Index].totalOrdered + 1,
                    totalValueOrdered: cartItems[Index].totalValueOrdered + (cartItems[Index].pSizePrice || 
                        cartItems[Index].mSizePrice || cartItems[Index].gSizePrice || 0)
                }
            }
        }
        if (size === "GG") {
            if (cartItems[Index].ggSizeOrder === cartItems[Index].avaiableGG){
                toast.warn(generatePhrase(cartItems[Index].avaiableGG), {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            } else if (cartItems[Index].ggSizeOrder < cartItems[Index].avaiableGG) {
                cartItems[Index] = {
                    ...cartItems[Index],
                    ggSizeOrder: cartItems[Index].ggSizeOrder + 1,
                    totalOrdered: cartItems[Index].totalOrdered + 1,
                    totalValueOrdered: cartItems[Index].totalValueOrdered + (cartItems[Index].ggSizePrice || 0)
                }
            }
        }
        setCartItems([...cartItems]);
    }

    function removeOneFromSize(itemToAdd, size) {
        const Index =  cartItems.findIndex(cartItem => 
            cartItem.refer == itemToAdd.refer && cartItem.color === itemToAdd.color    
        )
        // If product Total is going to be zero, take it out from Cart when execute the function
        if ((cartItems[Index].totalOrdered - 1) === 0) {
            cartItems.splice(Index, 1)
        }
        else if (size === "P") {
            cartItems[Index] = {
                ...cartItems[Index],
                pSizeOrder: cartItems[Index].pSizeOrder - 1,
                totalOrdered: cartItems[Index].totalOrdered - 1,
                totalValueOrdered: cartItems[Index].totalValueOrdered - (cartItems[Index].pSizePrice || 
                    cartItems[Index].mSizePrice || cartItems[Index].gSizePrice || 0)
            }
        }
        else if (size === "M") {
            cartItems[Index] = {
                ...cartItems[Index],
                mSizeOrder: cartItems[Index].mSizeOrder - 1,
                totalOrdered: cartItems[Index].totalOrdered - 1,
                totalValueOrdered: cartItems[Index].totalValueOrdered - (cartItems[Index].pSizePrice || 
                    cartItems[Index].mSizePrice || cartItems[Index].gSizePrice || 0)
            }
        }
        else if (size === "G") {
            cartItems[Index] = {
                ...cartItems[Index],
                gSizeOrder: cartItems[Index].gSizeOrder - 1,
                totalOrdered: cartItems[Index].totalOrdered - 1,
                totalValueOrdered: cartItems[Index].totalValueOrdered - (cartItems[Index].pSizePrice || 
                    cartItems[Index].mSizePrice || cartItems[Index].gSizePrice || 0)
            }
        }
        else if (size === "GG") {
            cartItems[Index] = {
                ...cartItems[Index],
                ggSizeOrder: cartItems[Index].ggSizeOrder - 1,
                totalOrdered: cartItems[Index].totalOrdered - 1,
                totalValueOrdered: cartItems[Index].totalValueOrdered - (cartItems[Index].ggSizePrice || 0)
            }
        }

        setCartItems([...cartItems]);

    }

    function toggleOrderSucceed() {
        setOrderSucceed(!orderSucceed)
    }

    function toggleOrderFailed() {
        setOrderFailed(!orderFailed)
    }

    return (
        <CartContext.Provider
        value={{
            cartItems,
            cartTotals,
            setCartItems,
            addItemToCart,
            addOneFromSize,
            removeOneFromSize,
            generatePhrase,
            orderSucceed,
            toggleOrderSucceed,
            setOrderSucceed,
            orderFailed,
            toggleOrderFailed,
            setOrderFailed
        }}
        >
            { children }
        </CartContext.Provider>
    )
}

export const UseCart = () => {
    return useContext(CartContext);
}