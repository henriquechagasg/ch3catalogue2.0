import styles from './user-menu.module.scss'
import Link from 'next/link'

import { BiMenu } from 'react-icons/bi'
import { UseUser } from '../../context/userContext'
import { useEffect, useRef, useState } from 'react'

export const UserMenu = () => {

    const {currentUser} = UseUser()

    const [showMenu, setShowMenu] = useState(false)

    /**
 * Hook that alerts clicks outside of the passed ref
 */
    function useOutsideAlerter(ref) {

        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // alert("Clicke outside")
                    setShowMenu(false)
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    /**
     * Component that alerts if you click outside of it
     */
    function OutsideAlerter(props) {
        const wrapperRef = useRef(null);
        useOutsideAlerter(wrapperRef);

        return <div ref={wrapperRef}>{props.children}</div>;
    }

    function toggleShowMenu() {
        setShowMenu(!showMenu)
    }

    return (
        <OutsideAlerter>
            <div 
            className={currentUser ? styles.container : styles.hide} 
            onClick={toggleShowMenu}>
                <BiMenu className={styles.icon}/>

                <div    
                className={showMenu ? styles.menu : styles.hide}
                onClick={(e) => e.stopPropagation()}
                >
                    <Link
                    href={"/orders"}>
                        <span>Pedidos</span>
                    </Link>
                    <Link
                    href={"/estoque"}
                    >
                        <span>Estoque</span>
                    </Link>
                </div>
            </div>
        </OutsideAlerter>

        
    )
}