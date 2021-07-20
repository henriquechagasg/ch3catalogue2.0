import styles from './cart-icon.module.scss';
import { FiShoppingCart } from "react-icons/fi";
import { UseCart } from '../../../context/cartContext';

export function CartIcon() {

    const {cartTotals} = UseCart()

    return (
        <div className={styles.container}>
            {cartTotals > 0 ? (
                <div className={styles.counter}>
                    <span>{cartTotals}</span>
                </div>
            ) : null}
            <FiShoppingCart className={styles.cartIcon}/>
        </div>
    )
}