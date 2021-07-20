import LazyLoad from 'react-lazyload';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import 'react-toastify/dist/ReactToastify.css';

import styles from './cart-product.module.scss';
import { UseCart } from '../../context/cartContext';

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

type CartProductProps = {
    cartItem: cartItem,
}

export function CartProduct({cartItem}: CartProductProps) {

    const {
        addOneFromSize, 
        removeOneFromSize,
    } = UseCart()

    function renderSizeOrder(size:string, quantity:number){
        if (quantity > 0) {
            return (
                <div className={styles.sizeOrder}>
                    <BiUpArrow className={styles.arrow} onClick={() => addOneFromSize(cartItem, size)}/>    
                    <span>{quantity} <b>{size}</b></span>
                    <BiDownArrow className={styles.arrow} onClick={() => removeOneFromSize(cartItem, size)}/>
                </div>
            );
        };
    };
    
    return (
        <>
            <div className={styles.card}>
                <LazyLoad>
                    <div className={styles.image}>
                        <img src={cartItem.image} alt="No image =/"/>
                    </div>
                </LazyLoad>
                <div className={styles.orderDetails}>
                    <span className={styles.title}>{cartItem.description} {cartItem.color}</span>
                    <div className={styles.orderQuantitys}>
                        { renderSizeOrder("P", cartItem.pSizeOrder) }
                        { renderSizeOrder("M", cartItem.mSizeOrder) }
                        { renderSizeOrder("G", cartItem.gSizeOrder) }
                        { renderSizeOrder("GG", cartItem.ggSizeOrder) }
                    </div>
                    <div className={styles.cartTotals}>
                        <span>Peças: <b>{cartItem.totalOrdered}</b></span>
                        <span>Valor Total: <b>R$ {cartItem.totalValueOrdered.toFixed(2)}</b></span>
                    </div>
                </div>
            </div>
        </>
        
    )
}