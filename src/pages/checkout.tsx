import React, { useEffect, useState } from "react"
import { UseCart } from "../context/cartContext"

import { DisplayProducts } from '../components/display-products/display-products.component';
import { EmptyCart } from '../components/empty-cart/empty-cart.component';
import { CloseOrderModal } from '../components/closeOrder-modal/closeOrder-modal.component';
import Confetti from 'react-confetti';


import styles from '../styles/Checkout.module.scss';
import { sumCartTotal, sumCartValue } from "../context/utils";
import { useWindowSize } from "react-use";

export default function Checkout(){

   const { 
    cartItems, 
    orderSucceed,
    toggleOrderSucceed,
    orderFailed,
    toggleOrderFailed } = UseCart()

    const {height, width} = useWindowSize()

   const [showModal, setShowModal] = useState(false)
   const [cartValue, setCartValue] = useState(sumCartValue(cartItems))
   const [cartTotal, setCartTotal] = useState(sumCartTotal(cartItems))


   useEffect(() => {
        setCartValue(sumCartValue(cartItems))
        setCartTotal(sumCartTotal(cartItems))
   }, [cartItems])

   function endShopping(succeed, failed) {

    if (failed) {
        return (
            <div className={styles.failedContainer} onClick={toggleOrderFailed}>
                <div className={styles.failModal}>
                    <span>Nos desculpe mas não foi possível enviar seu pedido.
                        Tente novamente mais tarde ou entre em contato pelo whatsapp.
                    </span>

                    <div className={styles.buttonsContainer}>
                        <button onClick={toggleOrderFailed}>Fechar</button>
                        <a href="https://api.whatsapp.com/send?phone=5537988311384&text=Oi%2C%20tudo%20bem%3F%20Tive%20um%20problema%20com%20meu%20pedido.">
                            Whatsapp</a>
                    </div>
                </div>
            </div>
        )
    } if (succeed) {
        // const {width, height} = useWindowSize();

        return (
            <div className={styles.succeedContainer} onClick={toggleOrderSucceed}>
                <div className={styles.succeedModal}>
                    <span>Seu pedido foi enviado com sucesso.
                        Em breve nossas vendedoras entrarão em contato.
                        Muito Obrigada!
                    </span>

                    <div className={styles.buttonsContainer}>
                        <button onClick={toggleOrderSucceed}>Fechar</button>
                        <a href="https://api.whatsapp.com/send?phone=5537988311384&text=Ol%C3%A1%2C%20acabei%20de%20fazer%20meu%20pedido!">
                            Whatsapp</a>
                    </div>
                </div>
                <Confetti 
                    width={height}
                    height={width}
                    numberOfPieces={100}
                />
            </div>
        )
    }
}
   
   if (cartItems.length > 0) {
        return (
            <div className={styles.container}>
                <DisplayProducts cartItems={ cartItems }/>

                {showModal ? (
                    <CloseOrderModal cartValue={cartValue} cartTotal={cartTotal} setShowModal={setShowModal}/>
                ) : null}
                
                {/* Close cart Button */}
                <div className={styles.closeButtonContainer}>
                    <button className={styles.closeCartButton} onClick={() => setShowModal(true)}>
                        Fechar Pedido
                    </button>
                </div>

                {endShopping(orderSucceed, orderFailed)}
            </div>
            
        )
   } else {
       return (
           <>
           <EmptyCart />            
           {endShopping(orderSucceed, orderFailed)}
           </>

       )
   }
}
