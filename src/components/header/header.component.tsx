import Link from 'next/link';
import { useRouter } from "next/dist/client/router";


import { Dropdown } from './dropdown/dropdown.component'
import { CartIcon } from './carti-icon/cart-icon.component';
import styles from './header.module.scss';
import { UseDropdown } from '../../context/dropdownContext';


export function Header() {

    const { setCategorySelected } = UseDropdown()

    const router = useRouter();

    function handleHomeClick() {
        if (router.pathname !== '/') {
            router.push('/')
        };
        window.scrollTo(0, 0);
        setCategorySelected("Todas")
    };


    return (
        <nav className={styles.container}>
            <ul className={styles.options}>
                <li className={styles.option} onClick={() => handleHomeClick()}>
                    Início
                </li>
                <li className={styles.option}>
                    <Dropdown />
                </li>
                <Link href="/checkout">
                    <li className={styles.option} onClick={() => setCategorySelected("Todas")}>
                        Carrinho
                        <CartIcon />
                    </li>
                </Link>
            </ul>
        </nav>
    )
}