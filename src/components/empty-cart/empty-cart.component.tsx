import Link from 'next/link';
import styles from './empty-cart.module.scss';

export function EmptyCart() {

    return (
        <div className={styles.container}>
            <span>Seu carrinho está vazio.</span>
            <Link href={'/'}>
                <button>Adicionar produtos</button>
            </Link>
        </div>
    )
}