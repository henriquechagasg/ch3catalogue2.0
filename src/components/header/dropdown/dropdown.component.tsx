import getConfig from 'next/config'

import React, { useRef, useEffect, useState } from "react";
import { TiArrowSortedDown } from 'react-icons/ti'
import { UseDropdown } from "../../../context/dropdownContext";
import { Spinner } from '../../with-spinner/with-spinner.component';
import { IoMdClose } from 'react-icons/io'


import styles from './dropdown.module.scss';
import { useRouter } from "next/dist/client/router";


/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref) {
    const { setShowDropdown }  = UseDropdown()

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert("Clicke outside")
                setShowDropdown(false)
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
export function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return <div ref={wrapperRef}>{props.children}</div>;
}



export function Dropdown({ }) {
    const [categorys, setCategorys] = useState([]);
    const { publicRuntimeConfig } = getConfig()
    const { backendUrl } = publicRuntimeConfig

    fetch(`${backendUrl}`)
        .then(response => response.json())
        .then(finalProducts => {
            let allcategorys = []
            finalProducts.forEach((product) => {
                if (!allcategorys.includes(product.CADPROGDESCR)) {
                    allcategorys.push(product.CADPROGDESCR)
                }   
            }, [])
            const fixedCategorys = allcategorys.map(category => category[0] + category.slice(1,).toLowerCase())
            fixedCategorys.unshift("Todas")
            setCategorys([...fixedCategorys])
        })
    const {
        showDropdown,
        setShowDropdown, 
        toggleShowDropdown,
        categorySelected,
        setCategorySelected
        } = UseDropdown()
    

    const router = useRouter()

    function handleSelectCategory(category) {
        if (router.pathname !== "/") {
            router.push("/")
        }
        window.scrollTo(0, 0)
        setShowDropdown(false);
        setCategorySelected(category)
    }
        
    

    return (
        <OutsideAlerter>
            <div className={styles.container}>
                <div onClick={toggleShowDropdown}>
                    {categorySelected === "Todas" ? (<span>Categorias</span>) : (<span>{categorySelected}</span>)}
                    <TiArrowSortedDown className={styles.arrowDown}/>
                </div>
                {showDropdown ? (
                            <div className={styles.dropdown}>
                                {categorys.length > 0 ? (
                                    categorys.map(category => {

                                        return (
                                        // <Link href={`/`}>
                                            <div
                                            key={categorys.indexOf(category)} 
                                            className={styles.category} 
                                            onClick={() => handleSelectCategory(category)}>
                                                <span>{category}</span>
                                                <br />
                                            </div>
                                        // </Link>
                                        )  
                                })
                                ) : (
                                    <Spinner />
                                )}
                                <IoMdClose className={styles.closeIcon} onClick={() => setShowDropdown(false)}/>
                            </div>
                ) : null }

            </div>
        </OutsideAlerter>
    )  
}
